<template>
  <section id="work" ref="root" class="section work">
    <div class="container">
      <div class="head">
        <p class="eyebrow" data-reveal>Dự án & Khách hàng</p>
        <h2 class="h-display" data-reveal>Những thương hiệu đã <em>tin chọn</em> Nexora.</h2>
      </div>

      <div class="logos" data-reveal>
        <a v-for="p in projects" :key="p.slug" :href="p.url" target="_blank" rel="noopener" class="logo">
          <span class="dot" :style="{ background: `hsl(${p.hue} 90% 60%)` }"></span>{{ p.name }}
        </a>
      </div>

      <div class="stack">
        <article
          v-for="(p, i) in projects"
          :key="p.slug"
          class="card"
          :style="{ '--hue': p.hue, top: `calc(12vh + ${i * 18}px)` }"
        >
          <div class="card__inner">
            <div class="info">
              <div class="meta">
                <span class="num">0{{ i + 1 }}</span>
                <span>{{ p.industry }}</span>
              </div>
              <h3>{{ p.name }}</h3>
              <p>{{ p.desc }}</p>
              <ul class="scope">
                <li>UI/UX</li><li>Front-end</li><li>Responsive</li><li>SEO</li>
              </ul>
              <a :href="p.url" target="_blank" rel="noopener" class="btn" v-magnetic>
                Xem website
                <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </a>
            </div>

            <a :href="p.url" target="_blank" rel="noopener" class="browser" data-cursor="MỞ WEB" :aria-label="'Mở ' + p.name">
              <div class="browser__bar">
                <span class="dots"><i></i><i></i><i></i></span>
                <span class="url">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                  {{ p.domain }}
                </span>
              </div>
              <div class="browser__view">
                <div class="fallback">
                  <span class="fb-name">{{ p.name }}</span>
                  <span class="fb-domain">{{ p.domain }}</span>
                </div>
                <img
                  v-show="imgState[p.slug] !== 'failed'"
                  :src="srcFor(p)"
                  :alt="'Giao diện website ' + p.name"
                  loading="lazy"
                  @error="onErr(p)"
                  @load="onLoad($event, p)"
                />
                <span class="scan"></span>
              </div>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import gsap from 'gsap'
import { projects } from '../data'

const root = ref(null)
// local -> remote -> failed
const imgState = reactive(Object.fromEntries(projects.map((p) => [p.slug, 'local'])))
const shot = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600&h=1000`
const srcFor = (p) => (imgState[p.slug] === 'local' ? `/projects/${p.slug}.jpg` : shot(p.url))
const onErr = (p) => {
  imgState[p.slug] = imgState[p.slug] === 'local' ? 'remote' : 'failed'
}
const onLoad = (e, p) => {
  // mshots trả về ảnh chờ nhỏ khi đang tạo; thử lại sau vài giây
  const img = e.target
  const tries = +(img.dataset.tries || 0)
  if (imgState[p.slug] === 'remote' && img.naturalWidth < 500 && tries < 4) {
    img.dataset.tries = tries + 1
    setTimeout(() => (img.src = shot(p.url) + '&r=' + Date.now()), 4000)
  }
}

let ctx
onMounted(() => {
  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.card')
    cards.forEach((card, i) => {
      // ảnh trượt nhẹ trong khung (parallax)
      gsap.fromTo(card.querySelector('img'), { yPercent: -6 }, {
        yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'top top', scrub: true }
      })
      gsap.from(card.querySelector('.card__inner'), {
        clipPath: 'inset(12% 8% 12% 8% round 28px)',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true }
      })
      // thẻ trước bị đẩy lùi khi thẻ sau phủ lên
      if (i < cards.length - 1) {
        gsap.to(card.querySelector('.card__inner'), {
          scale: 0.92 + i * 0.015,
          filter: 'brightness(0.55)',
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 15%', scrub: true }
        })
      }
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.head { margin-bottom: 40px; }
.head .h-display { margin-top: 20px; font-size: clamp(32px, 4.6vw, 68px); max-width: 14em; }
.logos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: clamp(48px, 7vw, 88px);
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border: 1px solid var(--line-2);
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 14px;
  transition: border-color 0.3s, background 0.3s;
}
.logo:hover { border-color: var(--accent); background: rgba(200, 255, 46, 0.06); }
.dot { width: 8px; height: 8px; border-radius: 50%; }

.stack { display: flex; flex-direction: column; gap: 6vh; }
.card {
  position: sticky;
  height: min(76vh, 720px);
}
.card__inner {
  height: 100%;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(24px, 4vw, 64px);
  align-items: center;
  padding: clamp(20px, 3.4vw, 48px);
  border-radius: 28px;
  border: 1px solid var(--line-2);
  background:
    radial-gradient(800px circle at 100% 0%, hsl(var(--hue) 90% 55% / 0.14), transparent 55%),
    linear-gradient(180deg, #11141b, #0b0d12);
  transform-origin: center top;
  overflow: hidden;
  will-change: transform;
}
.meta {
  display: flex;
  gap: 16px;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.num {
  color: var(--accent-ink);
  background: var(--accent);
  padding: 4px 8px;
  border-radius: 6px;
}
.info h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(30px, 3.6vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 22px 0 16px;
}
.info p { color: var(--muted); font-weight: 300; max-width: 40ch; }
.scope { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 32px; }
.scope li {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--line-2);
  color: var(--muted);
}

.browser {
  display: block;
  height: 100%;
  max-height: 560px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--line-2);
  background: #0a0b0f;
  box-shadow: 0 40px 80px -30px hsl(var(--hue) 90% 50% / 0.35);
  display: flex;
  flex-direction: column;
}
.browser__bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  background: #12151c;
  flex: none;
}
.dots { display: flex; gap: 6px; }
.dots i { width: 10px; height: 10px; border-radius: 50%; background: #2a2e38; }
.url {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  background: #0a0b0f;
  border-radius: 8px;
  padding: 6px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.browser__view {
  position: relative;
  flex: 1;
  overflow: hidden;
}
.browser__view img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 112%;
  object-fit: cover;
  object-position: top;
  transition: transform 1.2s var(--ease);
}
.browser:hover img { transform: scale(1.04); }
.fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  background:
    radial-gradient(circle at 30% 30%, hsl(var(--hue) 90% 55% / 0.5), transparent 50%),
    radial-gradient(circle at 80% 70%, hsl(calc(var(--hue) + 60) 90% 55% / 0.35), transparent 50%),
    repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 28px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 28px),
    #0b0d12;
}
.fb-name { font-family: var(--font-display); font-weight: 800; font-size: clamp(28px, 4vw, 56px); line-height: 1; }
.fb-domain { font-family: var(--font-mono); font-size: 12px; color: var(--muted); margin-top: 10px; }
.scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, hsl(var(--hue) 90% 60% / 0.18) 50%, transparent);
  height: 30%;
  transform: translateY(-100%);
  pointer-events: none;
  opacity: 0;
}
.browser:hover .scan { animation: scan 1.6s var(--ease) infinite; opacity: 1; }
@keyframes scan { to { transform: translateY(400%); } }

@media (max-width: 900px) {
  .card { height: auto; }
  .card__inner { grid-template-columns: 1fr; align-items: stretch; }
  .browser { height: 56vw; min-height: 220px; order: -1; }
  .scope { margin: 18px 0 24px; }
}
</style>
