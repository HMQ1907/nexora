<template>
  <!-- Dự án: lưới thẻ, bấm vào cả thẻ để mở website thật -->
  <section id="work" ref="root" class="section work">
    <div class="container">
      <SectionMark :n="4" :text="t.marks[4]" />
      <div class="head">
        <h2 class="h2">{{ t.projects.title }}</h2>
        <p class="lead">{{ t.projects.note }}</p>
      </div>

      <ul class="grid">
        <li v-for="(p, i) in projects" :key="p.slug" class="item" :style="{ '--hue': p.hue }">
          <a :href="p.url" target="_blank" rel="noopener" class="card" :aria-label="t.projects.open + ': ' + p.name">
            <span class="frame">
              <span class="bar" aria-hidden="true">
                <span class="dots"><i></i><i></i><i></i></span>
                <span class="url">{{ p.domain }}</span>
              </span>
              <span class="view">
                <span class="fallback" aria-hidden="true">{{ p.name }}</span>
                <img
                  v-show="shotState[p.slug] !== 'failed'"
                  :src="shotSrc(p)"
                  :alt="p.name"
                  loading="lazy"
                  @error="onShotError(p)"
                  @load="onShotLoad($event, p)"
                />
                <span class="hint" aria-hidden="true">{{ t.projects.open }}</span>
              </span>
            </span>

            <span class="info">
              <span class="meta">
                <span class="no">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="industry">{{ p.industry }}</span>
              </span>
              <span class="name">{{ p.name }}</span>
              <span class="desc">{{ p.desc }}</span>
              <span class="visit">
                {{ t.projects.open }}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { t, projects } from '../i18n'
import { shotState, shotSrc, onShotError, onShotLoad } from '../utils/shots'
import SectionMark from './SectionMark.vue'

const root = ref(null)
let ctx

onMounted(() => {
  if (reduced()) return
  ctx = gsap.context(() => {
    gsap.utils.toArray('.item').forEach((item, i) => {
      gsap
        .timeline({ scrollTrigger: { trigger: item, start: 'top 85%', once: true } })
        .from(item.querySelector('.frame'), { clipPath: 'inset(12% 10% 12% 10% round 16px)', scale: 0.94, duration: 1.3, ease: 'expo.out', delay: (i % 2) * 0.12 })
        .from(item.querySelector('img'), { scale: 1.2, duration: 1.6, ease: 'expo.out' }, '<')
        .from(item.querySelectorAll('.info > *'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, '<0.3')
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.work.section {
  padding: clamp(88px, 8vw, 120px) 0 clamp(64px, 7vw, 110px);
}
.work :deep(.mark) {
  margin-bottom: 20px;
}
.head {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 40px;
  align-items: end;
  margin-bottom: clamp(28px, 3.5vw, 48px);
}
.head .h2 {
  font-size: clamp(34px, 3.8vw, 60px);
}
.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(20px, 2.4vw, 36px);
}
.card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}
.frame {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.8);
  transition: border-color 0.4s, box-shadow 0.5s;
}
.card:hover .frame,
.card:focus-visible .frame {
  border-color: rgba(196, 164, 107, 0.7);
  box-shadow: 0 40px 80px -40px hsl(var(--hue) 50% 40% / 0.6);
}
.bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
}
.dots {
  display: flex;
  gap: 6px;
}
.dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(236, 229, 214, 0.18);
}
.url {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: var(--stone);
  background: rgba(0, 0, 0, 0.25);
  border-radius: 999px;
  padding: 3px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.view {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background:
    radial-gradient(circle at 70% 25%, hsl(var(--hue) 35% 32% / 0.6), transparent 60%),
    var(--night-2);
}
.fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(30px, 3.4vw, 52px);
  color: rgba(236, 229, 214, 0.45);
}
.view img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;
  transition: object-position 5s cubic-bezier(0.45, 0, 0.55, 1);
}
/* Rê chuột: ảnh tự cuộn xem toàn trang */
.card:hover .view img {
  object-position: 50% 100%;
}
.hint {
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--brass);
  color: var(--night);
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s, transform 0.5s var(--ease);
}
.card:hover .hint,
.card:focus-visible .hint {
  opacity: 1;
  transform: none;
}
.info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.meta {
  display: flex;
  gap: 12px;
  font-size: var(--t-sm);
}
.no {
  color: var(--ivory);
  font-variant-numeric: lining-nums;
}
.industry {
  color: var(--brass);
}
.name {
  margin-top: 8px;
  font-family: var(--serif);
  font-size: clamp(30px, 2.8vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.01em;
  transition: color 0.3s;
}
.card:hover .name {
  color: var(--brass);
}
.desc {
  margin-top: 10px;
  color: var(--stone);
  font-size: 15px;
  max-width: 52ch;
}
.visit {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  margin-top: 18px;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid var(--line-2);
  font-size: 14px;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.visit svg {
  width: 16px;
  height: 16px;
  transition: transform 0.4s var(--ease);
}
.card:hover .visit {
  background: var(--ivory);
  color: var(--night);
  border-color: var(--ivory);
}
.card:hover .visit svg {
  transform: translate(2px, -2px);
}
@media (max-width: 900px) {
  .head {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  .hint {
    display: none;
  }
}
</style>
