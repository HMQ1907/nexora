<template>
  <Preloader @done="onLoaded" />
  <Cursor />
  <NavBar :ready="ready" />
  <main>
    <Hero :ready="ready" />
    <Marquee alt :items="['Chiến lược', 'Thiết kế UI/UX', 'Lập trình', '3D & Motion', 'Ra mắt', 'Đồng hành']" :speed="30" />
    <About />
    <Services />
    <Process />
    <Projects />
    <Marquee :items="tech" :speed="45" reverse />
    <Contact />
  </main>
  <SiteFooter />
  <div class="grain" aria-hidden="true"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, provide, shallowRef, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader.vue'
import Cursor from './components/Cursor.vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import Marquee from './components/Marquee.vue'
import About from './components/About.vue'
import Services from './components/Services.vue'
import Process from './components/Process.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import SiteFooter from './components/SiteFooter.vue'
import { tech } from './data'

gsap.registerPlugin(ScrollTrigger)

const lenis = shallowRef(null)
provide('lenis', lenis)
const ready = ref(false)
let raf

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const onLoaded = () => {
  ready.value = true
  document.body.classList.remove('is-loading')
  lenis.value?.start()
  ScrollTrigger.refresh()
}

onMounted(() => {
  window.scrollTo(0, 0)
  document.body.classList.add('is-loading')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reduce) {
    const l = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    l.stop()
    l.on('scroll', ScrollTrigger.update)
    raf = (t) => l.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.value = l
  }

  // Hiệu ứng xuất hiện chung cho mọi [data-reveal]
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1.2, stagger: 0.09, ease: 'expo.out', overwrite: true })
  })

  document.fonts?.ready.then(() => ScrollTrigger.refresh())
})

onBeforeUnmount(() => {
  if (raf) gsap.ticker.remove(raf)
  lenis.value?.destroy()
})
</script>
