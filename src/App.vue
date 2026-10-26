<template>
  <Loader @done="ready = true" />
  <a class="skip" href="#main">{{ t.ui.skip }}</a>
  <div class="progress" aria-hidden="true"><span ref="bar"></span></div>
  <NavBar />
  <main id="main" :key="lang">
    <Hero />
    <Intro />
    <Services />
    <Industries />
    <Projects />
    <Founder />
    <Process />
    <Contact />
  </main>
  <SiteFooter :key="'f' + lang" />
  <ZaloFab :key="'z' + lang" />
  <div ref="wipe" class="wipe" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount, provide, ref, shallowRef } from 'vue'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduced } from './utils/gsap'
import { lang, t, setLang, applyLang } from './i18n'
import Loader from './components/Loader.vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import Intro from './components/Intro.vue'
import Industries from './components/Industries.vue'
import Services from './components/Services.vue'
import Process from './components/Process.vue'
import Projects from './components/Projects.vue'
import Founder from './components/Founder.vue'
import Contact from './components/Contact.vue'
import SiteFooter from './components/SiteFooter.vue'
import ZaloFab from './components/ZaloFab.vue'

const lenis = shallowRef(null)
const ready = ref(false)
const bar = ref(null)
const wipe = ref(null)
provide('lenis', lenis)
provide('ready', ready)

const scrollTo = (href) => {
  const target = href === '#top' ? 0 : href
  if (lenis.value) lenis.value.scrollTo(target, { duration: 1.6 })
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
provide('scrollTo', scrollTo)

// Đổi ngôn ngữ: tấm màn quét qua, nội dung được dựng lại, giữ nguyên vị trí đang xem
const switchLang = async (l) => {
  if (l === lang.value) return
  const y = window.scrollY
  const jump = (to) => (lenis.value ? lenis.value.scrollTo(to, { immediate: true, force: true }) : window.scrollTo(0, to))
  // Dựng lại nội dung ở đầu trang (sau tấm màn) để mọi hiệu ứng cuộn được tính đúng,
  // rồi đưa người xem về vị trí cũ
  const swap = async () => {
    jump(0)
    setLang(l)
    await nextTick()
    ScrollTrigger.refresh()
    jump(y)
    ScrollTrigger.update()
  }
  if (reduced()) return swap()
  // Chuyển mờ nhanh, không hiện chữ
  await gsap.to(wipe.value, { opacity: 1, duration: 0.25, ease: 'power2.out' })
  await swap()
  await gsap.to(wipe.value, { opacity: 0, duration: 0.4, delay: 0.1, ease: 'power2.out' })
}
provide('switchLang', switchLang)

let raf
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

onMounted(() => {
  window.scrollTo(0, 0)
  applyLang()
  if (!reduced()) {
    const l = new Lenis({ duration: 1.2, smoothWheel: true })
    l.on('scroll', ScrollTrigger.update)
    raf = (time) => l.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.value = l
  }
  // Thanh tiến trình cuộn ở mép trên
  gsap.to(bar.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
  })
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
})

onBeforeUnmount(() => {
  if (raf) gsap.ticker.remove(raf)
  lenis.value?.destroy()
})
</script>

<style>
.skip {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 300;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--brass);
  color: var(--night);
  font-weight: 500;
  transform: translateY(-200%);
}
.skip:focus {
  transform: none;
}
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 120;
  height: 2px;
  pointer-events: none;
}
.progress span {
  display: block;
  height: 100%;
  background: var(--brass);
  transform: scaleX(0);
  transform-origin: left;
}
.wipe {
  position: fixed;
  inset: 0;
  z-index: 350;
  display: grid;
  place-items: center;
  background: var(--night);
  opacity: 0;
  pointer-events: none;
}
</style>
