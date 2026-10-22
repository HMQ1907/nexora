<template>
  <section id="services" ref="root" class="section services">
    <div class="container">
      <div class="head">
        <div>
          <p class="eyebrow" data-reveal>Dịch vụ</p>
          <h2 class="h-display" data-reveal>Mọi thứ website của bạn cần, <em>dưới một mái nhà.</em></h2>
        </div>
        <p class="lead" data-reveal>
          Một đầu mối duy nhất cho toàn bộ dự án — từ chiến lược, thiết kế, lập trình đến vận hành. Bạn tập trung kinh
          doanh, phần công nghệ để Nexora lo.
        </p>
      </div>

      <div class="grid">
        <article
          v-for="(s, i) in services"
          :key="s.code"
          class="card"
          data-reveal
          @pointermove="spot"
          @pointerleave="reset"
        >
          <div class="card__inner">
            <div class="card__top">
              <span class="code">{{ s.code }}</span>
              <span class="icon" v-html="icons[i]"></span>
            </div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <ul class="tags">
              <li v-for="t in s.tags" :key="t">{{ t }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { services } from '../data'

const icons = [
  '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="5"/><path d="M16 1v6M16 25v6M1 16h6M25 16h6"/></svg>',
  '<svg viewBox="0 0 32 32"><rect x="3" y="5" width="26" height="22" rx="2"/><path d="M3 11h26M9 17h8M9 21h14"/></svg>',
  '<svg viewBox="0 0 32 32"><path d="M11 9l-7 7 7 7M21 9l7 7-7 7M18 6l-4 20"/></svg>',
  '<svg viewBox="0 0 32 32"><path d="M16 3l12 7v12l-12 7-12-7V10z"/><path d="M4 10l12 7 12-7M16 17v12"/></svg>',
  '<svg viewBox="0 0 32 32"><path d="M4 6h4l3 15h15l3-11H10"/><circle cx="13" cy="26" r="2"/><circle cx="24" cy="26" r="2"/></svg>',
  '<svg viewBox="0 0 32 32"><path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7z"/><path d="M11 16l4 4 7-8"/></svg>'
]

const spot = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  if (e.pointerType === 'mouse') {
    gsap.to(el.firstElementChild, {
      rotateY: ((x / r.width) - 0.5) * 8,
      rotateX: -((y / r.height) - 0.5) * 8,
      duration: 0.6,
      ease: 'power3.out'
    })
  }
}
const reset = (e) => gsap.to(e.currentTarget.firstElementChild, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1,0.5)' })
</script>

<style scoped>
.head {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: end;
  margin-bottom: clamp(48px, 7vw, 88px);
}
.head .h-display { margin-top: 20px; font-size: clamp(32px, 4.6vw, 68px); }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.card {
  --mx: 50%;
  --my: 50%;
  position: relative;
  border-radius: 20px;
  padding: 1px;
  background: var(--line);
  perspective: 900px;
  isolation: isolate;
}
/* viền sáng theo con trỏ */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(360px circle at var(--mx) var(--my), rgba(200, 255, 46, 0.7), transparent 45%);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: -1;
}
.card:hover::before { opacity: 1; }
.card__inner {
  position: relative;
  height: 100%;
  border-radius: 19px;
  padding: 32px 28px 28px;
  background: var(--surface);
  overflow: hidden;
  transform-style: preserve-3d;
}
.card__inner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(420px circle at var(--mx) var(--my), rgba(200, 255, 46, 0.07), transparent 50%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.card:hover .card__inner::after { opacity: 1; }
.card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 56px;
}
.code { font-family: var(--font-mono); font-size: 12px; color: var(--muted); letter-spacing: 0.1em; }
.icon :deep(svg) {
  width: 44px;
  height: 44px;
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.7s var(--ease);
}
.card:hover .icon :deep(svg) { transform: rotate(-12deg) scale(1.1); }
h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  line-height: 1.25;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
}
.card p { color: var(--muted); font-size: 15px; font-weight: 300; }
.tags { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
.tags li {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 6px 10px;
  border: 1px solid var(--line-2);
  border-radius: 999px;
  color: var(--muted);
}
@media (max-width: 1080px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .head { grid-template-columns: 1fr; }
  .grid { grid-template-columns: 1fr; }
  .card__top { margin-bottom: 36px; }
}
</style>
