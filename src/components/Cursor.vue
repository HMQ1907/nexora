<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <div ref="ring" class="ring" :class="{ hover: hovering, label: !!label }">
      <span class="lbl">{{ label }}</span>
    </div>
    <div ref="dot" class="dot"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import gsap from 'gsap'

const enabled = ref(false)
const ring = ref(null)
const dot = ref(null)
const hovering = ref(false)
const label = ref('')
let off = () => {}

onMounted(async () => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  enabled.value = true
  document.body.classList.add('has-cursor')
  await nextTick()
  const rx = gsap.quickTo(ring.value, 'x', { duration: 0.5, ease: 'power3.out' })
  const ry = gsap.quickTo(ring.value, 'y', { duration: 0.5, ease: 'power3.out' })
  const dx = gsap.quickTo(dot.value, 'x', { duration: 0.08 })
  const dy = gsap.quickTo(dot.value, 'y', { duration: 0.08 })
  gsap.set([ring.value, dot.value], { opacity: 0 })
  let first = true
  const move = (e) => {
    if (first) {
      first = false
      gsap.set([ring.value, dot.value], { x: e.clientX, y: e.clientY })
      gsap.to([ring.value, dot.value], { opacity: 1, duration: 0.3 })
    }
    rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY)
  }
  const over = (e) => {
    const t = e.target.closest('[data-cursor], a, button, input, textarea, select, label')
    hovering.value = !!t
    label.value = t?.dataset?.cursor || ''
  }
  const leave = () => gsap.to([ring.value, dot.value], { opacity: 0, duration: 0.3 })
  const enter = () => gsap.to([ring.value, dot.value], { opacity: 1, duration: 0.3 })
  window.addEventListener('pointermove', move)
  document.addEventListener('pointerover', over)
  document.documentElement.addEventListener('mouseleave', leave)
  document.documentElement.addEventListener('mouseenter', enter)
  off = () => {
    window.removeEventListener('pointermove', move)
    document.removeEventListener('pointerover', over)
    document.documentElement.removeEventListener('mouseleave', leave)
    document.documentElement.removeEventListener('mouseenter', enter)
  }
})
onBeforeUnmount(() => off())
</script>

<style scoped>
.cursor { position: fixed; inset: 0; pointer-events: none; z-index: 300; }
.ring,
.dot {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
}
.ring {
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: grid;
  place-items: center;
  transition: width 0.45s var(--ease), height 0.45s var(--ease), margin 0.45s var(--ease),
    background 0.45s var(--ease), border-color 0.45s var(--ease);
  mix-blend-mode: difference;
}
.ring.hover {
  width: 64px;
  height: 64px;
  margin: -32px 0 0 -32px;
  border-color: var(--accent);
  background: rgba(200, 255, 46, 0.08);
}
.ring.label {
  width: 104px;
  height: 104px;
  margin: -52px 0 0 -52px;
  background: var(--accent);
  border-color: var(--accent);
  mix-blend-mode: normal;
}
.lbl {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--accent-ink);
  opacity: 0;
  transition: opacity 0.3s;
  text-align: center;
  line-height: 1.3;
  padding: 0 10px;
}
.ring.label .lbl { opacity: 1; }
.dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: var(--accent);
}
</style>
