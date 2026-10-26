<template>
  <!-- Lĩnh vực: cả 8 ngành trong một màn hình, mỗi ô sáng lên theo màu riêng -->
  <section id="industries" ref="root" class="section industries">
    <div class="container">
      <SectionMark :n="3" :text="t.marks[1]" />
      <div class="head">
        <h2 class="h2">{{ t.industries.title }}</h2>
        <p class="lead">{{ t.industries.lead }}</p>
      </div>

      <ul class="grid">
        <li
          v-for="it in t.industries.items"
          :key="it.icon"
          class="tile"
          :style="{ '--hue': HUES[it.icon] }"
          @pointermove="spot"
        >
          <svg class="icon" viewBox="0 0 32 32" aria-hidden="true"><path :d="ICONS[it.icon]" /></svg>
          <h3>{{ it.name }}</h3>
          <p>{{ it.desc }}</p>
        </li>
      </ul>

      <p class="more">
        {{ t.industries.more }}
        <a href="#contact" @click.prevent="scrollTo('#contact')">{{ t.industries.moreCta }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { t } from '../i18n'
import SectionMark from './SectionMark.vue'

const ICONS = {
  building: 'M6 28V8l10-4v24M16 12h10v16M10 12h2M10 17h2M10 22h2M20 17h2M20 22h2M3 28h26',
  chip: 'M9 9h14v14H9zM13 13h6v6h-6zM12 4v5M16 4v5M20 4v5M12 23v5M16 23v5M20 23v5M4 12h5M4 16h5M4 20h5M23 12h5M23 16h5M23 20h5',
  cup: 'M6 12h16v6a8 8 0 0 1-16 0zM22 13h3a3 3 0 0 1 0 6h-3M10 4c0 2 2 2 2 4M15 4c0 2 2 2 2 4M4 28h20',
  lotus: 'M16 26c-6 0-11-4-12-9 5 0 9 2 12 6 3-4 7-6 12-6-1 5-6 9-12 9zM16 23c-3-4-3-10 0-16 3 6 3 12 0 16z',
  bed: 'M4 8v18M28 26v-7a4 4 0 0 0-4-4H14v4M4 19h24M10 15a2 2 0 1 1-.01 0',
  cap: 'M2 13l14-7 14 7-14 7zM8 16v6c3 3 13 3 16 0v-6M28 14v7',
  factory: 'M4 28V14l7 4v-4l7 4v-4l7 4V6h3v22zM9 23h3M15 23h3M21 23h3',
  bag: 'M7 10h18l-1 18H8zM12 10V8a4 4 0 0 1 8 0v2'
}
const HUES = { building: 38, chip: 210, cup: 22, lotus: 335, bed: 175, cap: 262, factory: 12, bag: 140 }

const scrollTo = inject('scrollTo')
const root = ref(null)
let ctx

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

onMounted(() => {
  if (reduced()) return
  ctx = gsap.context(() => {
    gsap
      .timeline({ scrollTrigger: { trigger: '.grid', start: 'top 82%', once: true } })
      .from('.tile', { y: 50, opacity: 0, duration: 1, stagger: { each: 0.07, grid: 'auto' }, ease: 'expo.out' })
      .from('.icon path', { drawSVG: 0, duration: 1.3, stagger: 0.07, ease: 'power2.inOut' }, 0.2)
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.industries.section {
  padding: clamp(88px, 8vw, 120px) 0 clamp(64px, 7vw, 110px);
}
.industries :deep(.mark) {
  margin-bottom: 20px;
}
.head {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 40px;
  align-items: end;
  margin-bottom: clamp(28px, 3.5vw, 44px);
}
.head .h2 {
  font-size: clamp(34px, 3.8vw, 60px);
}
.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.tile {
  --mx: 50%;
  --my: 0%;
  position: relative;
  padding: 24px 22px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background:
    radial-gradient(260px circle at var(--mx) var(--my), hsl(var(--hue) 55% 55% / 0.16), transparent 65%),
    var(--night-2);
  transition: border-color 0.4s;
}
.tile:hover {
  border-color: hsl(var(--hue) 50% 60% / 0.6);
}
.icon {
  width: 36px;
  height: 36px;
  fill: none;
  stroke: var(--brass);
  stroke-width: 1.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.tile h3 {
  margin-top: 20px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: var(--t-lg);
  line-height: 1.15;
}
.tile p {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--stone);
}
.more {
  margin-top: 28px;
  color: var(--stone);
  font-size: var(--t-sm);
}
.more a {
  margin-left: 8px;
  color: var(--ivory);
  border-bottom: 1px solid var(--line-2);
  transition: color 0.3s, border-color 0.3s;
}
.more a:hover {
  color: var(--brass);
  border-color: var(--brass);
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .head {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
@media (max-width: 560px) {
  .tile {
    padding: 18px 16px;
  }
  .tile h3 {
    margin-top: 12px;
    font-size: 21px;
  }
  .tile p {
    display: none;
  }
}
</style>
