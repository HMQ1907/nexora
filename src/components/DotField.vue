<template>
  <canvas ref="cv" class="dots" aria-hidden="true"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { reduced } from '../utils/gsap'

// Lưới điểm sáng: gợn sóng nhẹ, bừng sáng và dạt ra quanh con trỏ
const cv = ref(null)
let stop = () => {}

onMounted(() => {
  const canvas = cv.value
  const ctx = canvas.getContext('2d')
  const still = reduced()
  const GAP = 30
  const R = 170
  let w, h, dpr, pts, raf
  let visible = true
  const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

  const build = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = canvas.clientWidth
    h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    pts = []
    for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) pts.push({ x, y })
  }

  const draw = (time) => {
    ctx.clearRect(0, 0, w, h)
    m.x += (m.tx - m.x) * 0.12
    m.y += (m.ty - m.y) * 0.12
    const t = time * 0.0006
    for (const p of pts) {
      const dx = p.x - m.x
      const dy = p.y - m.y
      const d = Math.sqrt(dx * dx + dy * dy)
      const near = d < R ? 1 - d / R : 0
      const wave = still ? 0 : (Math.sin(p.x * 0.012 + t) + Math.cos(p.y * 0.016 - t * 1.3)) * 0.5
      const push = near * near * 14
      const x = p.x + (d ? (dx / d) * push : 0)
      const y = p.y + (d ? (dy / d) * push : 0)
      const a = 0.08 + Math.max(wave, 0) * 0.08 + near * 0.75
      ctx.fillStyle = near > 0.05 ? `rgba(196,164,107,${a})` : `rgba(236,229,214,${a})`
      ctx.beginPath()
      ctx.arc(x, y, 0.9 + near * 1.4, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const loop = (time) => {
    raf = requestAnimationFrame(loop)
    if (visible) draw(time)
  }

  const onMove = (e) => {
    const r = canvas.getBoundingClientRect()
    m.tx = e.clientX - r.left
    m.ty = e.clientY - r.top
    if (m.x < -1000) {
      m.x = m.tx
      m.y = m.ty
    }
  }
  const onLeave = () => {
    m.tx = m.ty = -9999
  }
  const onResize = () => {
    build()
    if (still) draw(0)
  }

  build()
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(canvas)
  window.addEventListener('resize', onResize)
  if (still) draw(0)
  else {
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
  }

  stop = () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('mouseleave', onLeave)
  }
})
onBeforeUnmount(() => stop())
</script>

<style scoped>
.dots {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 85% 75% at 60% 45%, #000 40%, transparent 100%);
}
</style>
