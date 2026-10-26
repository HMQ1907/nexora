<template>
  <!-- Dải lợi ích: chạy ngang, tăng tốc và nghiêng theo vận tốc cuộn -->
  <div ref="root" class="marquee" aria-hidden="true">
    <div v-for="(row, r) in rows" :key="r" class="row" :class="{ rev: r === 1 }">
      <div class="track">
        <span v-for="n in 2" :key="n" class="group">
          <span v-for="w in row" :key="w" class="item">{{ w }}<i class="sep">✦</i></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger, reduced } from '../utils/gsap'
import { t } from '../i18n'

const list = t.value.benefits
const half = Math.ceil(list.length / 2)
const rows = [list.slice(0, half), list.slice(half)]
const root = ref(null)
let tweens = []
let st
let idle

onMounted(() => {
  if (reduced()) return
  const tracks = root.value.querySelectorAll('.track')
  tweens = [...tracks].map((tr, i) =>
    gsap.fromTo(tr, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 38, ease: 'none', repeat: -1 })
  )
  const skew = [...tracks].map((tr) => gsap.quickTo(tr, 'skewX', { duration: 0.5, ease: 'power3.out' }))
  st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const v = self.getVelocity()
      const boost = 1 + Math.min(Math.abs(v) / 300, 6)
      tweens.forEach((tw) => gsap.to(tw, { timeScale: boost * self.direction, duration: 0.2, overwrite: true }))
      skew.forEach((s) => s(gsap.utils.clamp(-10, 10, v / -250)))
      clearTimeout(idle)
      idle = setTimeout(() => {
        tweens.forEach((tw) => gsap.to(tw, { timeScale: self.direction, duration: 0.8, overwrite: true }))
        skew.forEach((s) => s(0))
      }, 120)
    }
  })
})
onBeforeUnmount(() => {
  clearTimeout(idle)
  tweens.forEach((tw) => tw.kill())
  st?.kill()
})
</script>

<style scoped>
.marquee {
  padding: clamp(40px, 6vw, 80px) 0;
  overflow: hidden;
  border-top: 1px solid var(--line);
}
.row + .row {
  margin-top: 8px;
}
.track {
  display: flex;
  width: max-content;
  will-change: transform;
}
.group {
  display: flex;
}
.item {
  display: inline-flex;
  align-items: center;
  font-family: var(--serif);
  font-size: clamp(44px, 7vw, 110px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.row:not(.rev) .item {
  font-style: italic;
}
.row.rev .item {
  color: transparent;
  -webkit-text-stroke: 1px rgba(236, 229, 214, 0.4);
}
.sep {
  font-style: normal;
  font-size: 0.32em;
  margin: 0 0.9em;
  color: var(--brass);
  -webkit-text-stroke: 0;
}
</style>
