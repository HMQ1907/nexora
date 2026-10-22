<template>
  <section id="top" ref="root" class="hero">
    <div class="grid-bg"></div>
    <HeroScene :ready="ready" />
    <div class="glow"></div>

    <div class="hero__content container">
      <p class="eyebrow hero__eyebrow"><span ref="eyebrow">DIGITAL EXPERIENCE STUDIO — GIẢI PHÁP A → Z</span></p>
      <h1 class="hero__title">
        <span class="line"><span class="li">Kiến tạo</span></span>
        <span class="line"><span class="li">trải nghiệm <em>số.</em></span></span>
      </h1>
      <p class="lead hero__lead">
        Giải pháp website trọn gói từ chiến lược, thiết kế đến công nghệ — giúp doanh nghiệp nâng tầm thương hiệu và bứt
        phá tăng trưởng.
      </p>
      <div class="hero__ctas">
        <a href="#contact" class="btn btn--solid" v-magnetic @click.prevent="go('#contact')">
          Bắt đầu dự án
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a href="#work" class="btn" v-magnetic @click.prevent="go('#work')">Xem dự án</a>
      </div>
    </div>

    <div class="hud container">
      <div class="hud__item"><span class="k">LAT/LNG</span><span>10.90°N · 106.77°E</span></div>
      <div class="hud__item hud__scroll">
        <span class="mouse"><span></span></span>
        <span>CUỘN ĐỂ KHÁM PHÁ</span>
      </div>
      <div class="hud__item hud__right"><span class="k">SGN</span><span>{{ time }}</span></div>
    </div>

    <span class="bracket b1"></span><span class="bracket b2"></span>
    <span class="bracket b3"></span><span class="bracket b4"></span>
  </section>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import gsap from 'gsap'
import HeroScene from './HeroScene.vue'
import { scramble } from '../utils/scramble'

const props = defineProps({ ready: Boolean })
const lenis = inject('lenis')
const root = ref(null)
const eyebrow = ref(null)
const time = ref('')
let timer
let ctx

const go = (h) => lenis.value ? lenis.value.scrollTo(h, { duration: 1.6 }) : document.querySelector(h)?.scrollIntoView()

const updateTime = () => {
  time.value = new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false })
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  ctx = gsap.context(() => {
    gsap.set('.hero__title .li', { yPercent: 115, rotate: 4 })
    gsap.set('.hero__lead, .hero__ctas, .hud, .bracket, .hero__eyebrow', { opacity: 0 })

    // cuộn: chữ trôi lên và mờ
    gsap.to('.hero__content', {
      yPercent: -18,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom 30%', scrub: true }
    })
  }, root.value)
})

watch(
  () => props.ready,
  (v) => {
    if (!v) return
    ctx.add(() => {
      const tl = gsap.timeline({ delay: 0.35 })
      tl.to('.hero__eyebrow', { opacity: 1, duration: 0.4 })
        .add(() => scramble(eyebrow.value, undefined, 1100), '<')
        .to('.hero__title .li', { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.12, ease: 'expo.out' }, 0.1)
        .fromTo('.hero__lead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 0.9)
        .fromTo('.hero__ctas', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 1.05)
        .to('.hud', { opacity: 1, duration: 1 }, 1.3)
        .fromTo('.bracket', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.06, ease: 'back.out(2)' }, 1.2)
    })
  }
)

onBeforeUnmount(() => {
  clearInterval(timer)
  ctx?.revert()
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.glow {
  position: absolute;
  width: 60vw;
  height: 60vw;
  right: -15vw;
  top: 50%;
  transform: translateY(-50%);
  background: radial-gradient(circle, rgba(91, 140, 255, 0.16), transparent 60%);
  pointer-events: none;
}
.hero__content {
  position: relative;
  z-index: 2;
  padding-top: 120px;
  padding-bottom: 120px;
  pointer-events: none;
}
.hero__content a { pointer-events: auto; }
.hero__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(40px, 7.4vw, 120px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  margin: 28px 0 32px;
  max-width: 11.5em;
}
.line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}
.li {
  display: inline-block;
  transform-origin: left bottom;
}
.hero__title em {
  font-style: normal;
  white-space: nowrap;
  color: var(--accent);
  text-shadow: 0 0 40px rgba(200, 255, 46, 0.35);
}
.az-arrow {
  font-style: normal;
  color: var(--accent-2);
}
.hero__lead {
  margin-bottom: 40px;
}
.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.hud {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 28px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--muted);
  margin: 0 auto;
}
.hud__item { display: flex; gap: 10px; align-items: center; }
.k { color: var(--accent); }
.mouse {
  width: 18px;
  height: 28px;
  border: 1px solid var(--line-2);
  border-radius: 10px;
  position: relative;
}
.mouse span {
  position: absolute;
  left: 50%;
  top: 6px;
  width: 2px;
  height: 6px;
  margin-left: -1px;
  background: var(--accent);
  border-radius: 2px;
  animation: wheel 1.8s var(--ease) infinite;
}
@keyframes wheel {
  0% { transform: translateY(0); opacity: 1; }
  80% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}
.bracket {
  position: absolute;
  width: 26px;
  height: 26px;
  border: 0 solid var(--accent);
  z-index: 2;
}
.b1 { top: 100px; left: var(--pad); border-top-width: 1px; border-left-width: 1px; }
.b2 { top: 100px; right: var(--pad); border-top-width: 1px; border-right-width: 1px; }
.b3 { bottom: 76px; left: var(--pad); border-bottom-width: 1px; border-left-width: 1px; }
.b4 { bottom: 76px; right: var(--pad); border-bottom-width: 1px; border-right-width: 1px; }

@media (max-width: 900px) {
  .hero { justify-content: flex-end; }
  .hero__content { padding-bottom: 110px; padding-top: 46vh; }
  .hud__item:first-child, .hud__right { display: none; }
  .hud { justify-content: center; }
  .bracket { display: none; }
}
</style>
