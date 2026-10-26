<template>
  <!-- Dịch vụ: 6 thẻ trong một màn hình, viền đồng sáng theo con trỏ -->
  <section id="services" ref="root" class="section services">
    <div class="container">
      <SectionMark :n="2" :text="t.marks[2]" />
      <div class="head">
        <h2 class="h2">{{ t.services.title }}</h2>
        <p class="lead">{{ t.services.lead }}</p>
      </div>

      <ul class="grid">
        <li v-for="(s, i) in t.services.items" :key="s.title" class="card" @pointermove="spot">
          <span class="no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3><span class="t">{{ s.title }}</span></h3>
          <p>{{ s.desc }}</p>
          <ul class="tags">
            <li v-for="tag in s.tags" :key="tag">{{ tag }}</li>
          </ul>
        </li>
      </ul>

      <div class="cta">
        <a href="#contact" class="btn btn--brass" @click.prevent="scrollTo('#contact')">
          {{ t.ui.quote }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { scramble } from '../utils/fx'
import { t } from '../i18n'
import SectionMark from './SectionMark.vue'

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
      .from('.card', { y: 60, opacity: 0, rotateX: -12, duration: 1.1, stagger: { each: 0.08, grid: 'auto' }, ease: 'expo.out' })
      .add(() => gsap.utils.toArray('.card .t').forEach((el, i) => setTimeout(() => scramble(el, undefined, 700), i * 80)), 0.2)
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.services.section {
  padding: clamp(88px, 8vw, 120px) 0 clamp(64px, 7vw, 110px);
}
.services :deep(.mark) {
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
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  perspective: 1200px;
}
.card {
  --mx: 50%;
  --my: 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 26px 24px;
  border-radius: 18px;
  background:
    radial-gradient(320px circle at var(--mx) var(--my), rgba(196, 164, 107, 0.1), transparent 65%),
    var(--night-2);
  border: 1px solid var(--line);
  isolation: isolate;
}
/* Viền đồng sáng quanh con trỏ */
.card::before {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(260px circle at var(--mx) var(--my), rgba(196, 164, 107, 0.9), transparent 60%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s;
}
.card:hover::before {
  opacity: 1;
}
.no {
  font-size: var(--t-sm);
  color: var(--brass);
  font-variant-numeric: lining-nums tabular-nums;
}
.card h3 {
  margin: 14px 0 10px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(24px, 2vw, 30px);
  line-height: 1.15;
}
.card p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--stone);
}
.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 18px;
}
.tags li {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid var(--line-2);
  color: var(--stone);
}
.cta {
  margin-top: 28px;
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
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .card {
    padding: 20px;
  }
}
</style>
