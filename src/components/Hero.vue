<template>
  <!-- Cảnh 1: chữ Nexora khổng lồ, cuộn xuống thì tách đôi để lộ slogan -->
  <section id="top" ref="root" class="hero" :class="{ static: still }">
    <div ref="pin" class="pin">
      <DotField />
      <div class="glow" aria-hidden="true"></div>

      <p ref="word" class="word" aria-hidden="true">
        <span v-for="(c, i) in 'Nexora'" :key="i" class="ch"><span class="ci">{{ c }}</span></span>
      </p>

      <div ref="reveal" class="reveal container">
        <h1 class="title">{{ t.hero.title }}</h1>
        <p class="lead">{{ t.hero.lead }}</p>
        <div class="ctas">
          <a href="#contact" class="btn btn--brass" @click.prevent="scrollTo('#contact')">
            {{ t.ui.quote }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a href="#work" class="btn" @click.prevent="scrollTo('#work')">{{ t.ui.work }}</a>
        </div>
      </div>

      <div class="foot container">
        <span ref="cue" class="cue"><span class="cue__line"></span>{{ t.hero.scroll }}</span>
        <p ref="clients" class="clients">
          {{ t.hero.clients }}
          <template v-for="(p, i) in projects" :key="p.slug">
            <a :href="p.url" target="_blank" rel="noopener">{{ p.name }}</a><span v-if="i < projects.length - 1">, </span>
          </template>
          {{ t.hero.others }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { t, projects } from '../i18n'
import DotField from './DotField.vue'

const scrollTo = inject('scrollTo')
const ready = inject('ready')
const still = reduced()
const root = ref(null)
const pin = ref(null)
const word = ref(null)
const reveal = ref(null)
const cue = ref(null)
const clients = ref(null)
let ctx
let stopReady = () => {}

onMounted(() => {
  if (still) return
  ctx = gsap.context(() => {
    const chars = gsap.utils.toArray('.ci')
    const n = chars.length

    // Mở màn: từng ký tự trồi lên, lưới điểm sáng dần
    const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    intro
      .from(chars, { yPercent: 115, duration: 1.6, stagger: 0.07 })
      .from('.dots', { opacity: 0, duration: 2 }, 0.2)
      .from(cue.value, { opacity: 0, y: 16, duration: 1 }, 0.9)
    stopReady = watch(ready, (v) => v && intro.play(), { immediate: true })

    // Cuộn: chữ tách sang hai bên, phóng to rồi tan, slogan hiện ra ở giữa
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root.value, start: 'top top', end: '+=45%', pin: pin.value, scrub: 1 }
    })
    gsap.utils.toArray('.ch').forEach((c, i) => {
      const side = i - (n - 1) / 2
      tl.to(c, { xPercent: side * 120, yPercent: Math.abs(side) * -18, rotate: side * 6, duration: 1 }, 0)
    })
    tl.to(word.value, { scale: 1.5, opacity: 0, filter: 'blur(14px)', duration: 1 }, 0)
      .to(cue.value, { opacity: 0, duration: 0.2 }, 0)
      .fromTo(reveal.value, { opacity: 0, scale: 0.9, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.45)
      .fromTo(clients.value, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.8)
      .fromTo('.glow', { scale: 0.6, opacity: 0.4 }, { scale: 1.2, opacity: 1, duration: 1 }, 0)
  }, root.value)
})

onBeforeUnmount(() => {
  stopReady()
  ctx?.revert()
})
</script>

<style scoped>
.hero {
  position: relative;
}
.pin {
  position: relative;
  height: 100vh;
  height: 100svh;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.glow {
  position: absolute;
  width: 80vmax;
  height: 80vmax;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  background: radial-gradient(circle, rgba(196, 164, 107, 0.14), transparent 60%);
  pointer-events: none;
}
.word {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(110px, 24vw, 420px);
  line-height: 1;
  letter-spacing: -0.04em;
  pointer-events: none;
  white-space: nowrap;
}
.ch {
  display: inline-block;
  overflow: hidden;
  padding: 0.05em 0.01em 0.12em;
}
.ci {
  display: inline-block;
  background: linear-gradient(180deg, var(--ivory) 35%, rgba(236, 229, 214, 0.35));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.ch:nth-child(3) .ci {
  background-image: linear-gradient(180deg, var(--brass) 35%, rgba(196, 164, 107, 0.35));
}
.reveal {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(48px, 6.6vw, 112px);
  line-height: 1;
  letter-spacing: -0.03em;
  max-width: 11em;
  text-wrap: balance;
}
.lead {
  margin: 32px auto 44px;
  max-width: 48ch;
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
}
.foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px 40px;
  flex-wrap: wrap;
  padding-top: 24px;
  padding-bottom: 30px;
  font-size: var(--t-sm);
  color: var(--stone);
  z-index: 2;
}
.cue {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}
.cue__line {
  position: relative;
  width: 56px;
  height: 1px;
  background: var(--line-2);
  overflow: hidden;
}
.cue__line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--brass);
  animation: sweep 2.4s var(--ease) infinite;
}
@keyframes sweep {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
.clients {
  margin-left: auto;
  text-align: right;
}
.clients a {
  color: var(--ivory);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}
.clients a:hover {
  border-color: var(--brass);
}

/* Không có chuyển động: hiển thị tĩnh, không ghim */
.hero.static .word,
.hero.static .cue {
  display: none;
}
.hero.static .pin {
  height: auto;
  min-height: 100svh;
  padding: 140px 0 160px;
}

@media (max-width: 900px) {
  .word {
    font-size: 30vw;
  }
  .clients {
    margin-left: 0;
    text-align: left;
  }
  .cue {
    display: none;
  }
}
</style>
