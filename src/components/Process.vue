<template>
  <!-- Cảnh 5: quy trình 14 ngày dạng mặt đồng hồ quay theo nhịp cuộn -->
  <section id="process" ref="root" class="process" :class="{ static: still }">
    <div ref="pin" class="pin container">
      <div class="copy">
        <SectionMark :n="5" :text="t.marks[3]" />
        <h2 class="h2">{{ t.process.title }}</h2>
        <p class="lead">{{ t.process.lead }}</p>

        <ol class="steps">
          <li v-for="(p, i) in steps" :key="p.step" class="step" :class="{ on: i === active }">
            <p class="step__time">{{ p.time }}</p>
            <h3><span class="step__letter">{{ p.step }}.</span> {{ p.title }}</h3>
            <p class="step__desc">{{ p.desc }}</p>
          </li>
        </ol>
      </div>

      <div class="clock" aria-hidden="true">
        <svg viewBox="0 0 500 500">
          <circle class="face" cx="250" cy="250" r="236" />
          <circle class="track" cx="250" cy="250" r="200" />
          <circle ref="arc" class="arc" cx="250" cy="250" r="200" transform="rotate(-90 250 250)" />
          <g v-for="d in TOTAL" :key="d" :transform="`rotate(${((d - 1) / TOTAL) * 360} 250 250)`">
            <line class="tick" :class="{ hit: d <= day, start: isStart(d) }" x1="250" y1="22" x2="250" :y2="isStart(d) ? 44 : 36" />
          </g>
          <g v-for="d in TOTAL" :key="'n' + d">
            <text class="dnum" :class="{ hit: d <= day }" :x="pos(d).x" :y="pos(d).y">{{ d }}</text>
          </g>
          <g ref="hand" class="hand">
            <line x1="250" y1="250" x2="250" y2="64" />
            <circle cx="250" cy="64" r="6" />
          </g>
          <circle class="hub" cx="250" cy="250" r="4" />
        </svg>
        <div class="center">
          <span class="center__k">{{ t.process.day }}</span>
          <span class="center__n">{{ String(day).padStart(2, '0') }}</span>
          <span class="center__step">{{ steps[active].step }}. {{ steps[active].title }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { t } from '../i18n'
import SectionMark from './SectionMark.vue'

const TOTAL = 14
const still = reduced()
const steps = t.value.process.steps
const root = ref(null)
const pin = ref(null)
const arc = ref(null)
const hand = ref(null)
const day = ref(still ? TOTAL : 1)
const active = ref(still ? steps.length - 1 : 0)
let mm

const isStart = (d) => steps.some((s) => s.start === d)
// Vị trí số ngày quanh mặt đồng hồ
const pos = (d) => {
  const a = ((d - 1) / TOTAL) * Math.PI * 2 - Math.PI / 2
  return { x: 250 + Math.cos(a) * 168, y: 250 + Math.sin(a) * 168 }
}
const stepFor = (d) => {
  let idx = 0
  steps.forEach((s, i) => {
    if (d >= s.start) idx = i
  })
  return idx
}

onMounted(() => {
  if (still) return
  mm = gsap.matchMedia()
  const build = (pinIt) => {
    const st = {
      trigger: root.value,
      start: pinIt ? 'top top' : 'top 70%',
      end: pinIt ? '+=70%' : 'bottom 60%',
      scrub: 0.6,
      onUpdate: (self) => {
        const d = Math.max(1, Math.min(TOTAL, Math.floor(1 + self.progress * TOTAL)))
        day.value = d
        active.value = stepFor(d)
      }
    }
    if (pinIt) st.pin = pin.value
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: st })
      .fromTo(arc.value, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1 }, 0)
      .fromTo(hand.value, { rotation: 0, svgOrigin: '250 250' }, { rotation: ((TOTAL - 1) / TOTAL) * 360, svgOrigin: '250 250', duration: 1 }, 0)
  }
  mm.add('all', () => build(true))
})
onBeforeUnmount(() => mm?.revert())
</script>

<style scoped>
.process {
  background: var(--night-2);
}
.pin {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 100px);
  align-items: center;
  padding-top: 100px;
  padding-bottom: 60px;
}
.copy .lead {
  margin-top: 22px;
}
.steps {
  list-style: none;
  position: relative;
  display: grid;
  margin-top: clamp(28px, 5vh, 56px);
}
.step {
  grid-area: 1 / 1;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s var(--ease), transform 0.6s var(--ease);
  pointer-events: none;
}
.step.on {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.step__time {
  font-size: var(--t-sm);
  color: var(--brass);
}
.step h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: var(--t-xl);
  line-height: 1.1;
  margin: 6px 0 10px;
}
.step__letter {
  font-style: italic;
  color: var(--brass);
}
.step__desc {
  color: var(--stone);
  max-width: 42ch;
}

.clock {
  position: relative;
  width: 100%;
  max-width: 560px;
  justify-self: center;
  aspect-ratio: 1;
}
.clock svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.face {
  fill: none;
  stroke: var(--line);
}
.track {
  fill: none;
  stroke: var(--line-2);
  stroke-width: 1;
}
.arc {
  fill: none;
  stroke: var(--brass);
  stroke-width: 3;
  stroke-linecap: round;
  filter: drop-shadow(0 0 6px rgba(196, 164, 107, 0.6));
}
.tick {
  stroke: var(--line-2);
  stroke-width: 1;
  transition: stroke 0.4s;
}
.tick.start {
  stroke-width: 2;
}
.tick.hit {
  stroke: var(--brass);
}
.dnum {
  font-family: var(--sans);
  font-size: 15px;
  fill: var(--stone);
  text-anchor: middle;
  dominant-baseline: central;
  font-variant-numeric: lining-nums;
  transition: fill 0.4s;
}
.dnum.hit {
  fill: var(--ivory);
}
.hand line {
  stroke: var(--ivory);
  stroke-width: 1;
}
.hand circle {
  fill: var(--brass);
}
.hub {
  fill: var(--ivory);
}
.center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.center__k {
  font-size: var(--t-sm);
  color: var(--stone);
}
.center__n {
  font-family: var(--serif);
  font-size: clamp(72px, 9vw, 130px);
  line-height: 1;
  color: var(--brass);
  font-variant-numeric: lining-nums tabular-nums;
}
.center__step {
  margin-top: 4px;
  font-size: var(--t-sm);
  color: var(--ivory);
}

/* Không có chuyển động: hiện toàn bộ các bước */
.process.static .steps {
  gap: 32px;
}
.process.static .step {
  grid-area: auto;
  opacity: 1;
  transform: none;
}

@media (max-width: 900px) {
  .pin {
    grid-template-columns: 1fr;
    align-content: center;
    gap: 20px;
    padding-top: 84px;
    padding-bottom: 24px;
  }
  .clock {
    order: -1;
    max-width: min(300px, 40svh);
  }
  .copy .lead {
    display: none;
  }
  .copy .h2 {
    font-size: clamp(30px, 8vw, 44px);
  }
  .steps {
    margin-top: 18px;
  }
  .process.static .pin {
    padding-top: 96px;
    padding-bottom: 96px;
  }
  .process.static .copy .lead {
    display: block;
  }
}
</style>
