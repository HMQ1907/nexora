<template>
  <div ref="root" class="marquee" :class="{ alt }" aria-hidden="true">
    <div ref="track" class="track">
      <div v-for="n in 2" :key="n" class="group">
        <span v-for="(w, i) in items" :key="i" class="item">
          {{ w }}<svg class="star" viewBox="0 0 24 24"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  items: { type: Array, required: true },
  alt: Boolean,
  speed: { type: Number, default: 40 },
  reverse: Boolean
})
const root = ref(null)
const track = ref(null)
let tween, st

onMounted(() => {
  tween = gsap.fromTo(
    track.value,
    { xPercent: props.reverse ? -50 : 0 },
    { xPercent: props.reverse ? 0 : -50, duration: props.speed, ease: 'none', repeat: -1 }
  )
  // tốc độ & độ nghiêng phản ứng theo vận tốc cuộn
  const skew = gsap.quickTo(track.value, 'skewX', { duration: 0.6, ease: 'power3.out' })
  let idle
  st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const v = self.getVelocity()
      const d = self.direction
      gsap.to(tween, { timeScale: d * (1 + Math.min(Math.abs(v) / 400, 5)), duration: 0.25, overwrite: true })
      skew(gsap.utils.clamp(-8, 8, v / -300))
      clearTimeout(idle)
      idle = setTimeout(() => {
        gsap.to(tween, { timeScale: d, duration: 0.8, overwrite: true })
        skew(0)
      }, 140)
    }
  })
})
onBeforeUnmount(() => {
  tween?.kill()
  st?.kill()
})
</script>

<style scoped>
.marquee {
  position: relative;
  overflow: hidden;
  padding: 28px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}
.marquee.alt {
  background: var(--accent);
  color: var(--accent-ink);
  border: 0;
  transform: rotate(-2deg) scale(1.04);
  margin: 40px 0;
}
.track {
  display: flex;
  width: max-content;
  will-change: transform;
}
.group { display: flex; }
.item {
  display: inline-flex;
  align-items: center;
  gap: clamp(20px, 3vw, 44px);
  padding-right: clamp(20px, 3vw, 44px);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(28px, 5vw, 72px);
  letter-spacing: -0.02em;
  white-space: nowrap;
  line-height: 1.1;
}
.marquee:not(.alt) .item:nth-child(even) {
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.45);
}
.star {
  width: 0.5em;
  height: 0.5em;
  fill: var(--accent);
  flex: none;
}
.alt .star { fill: var(--accent-ink); }
</style>
