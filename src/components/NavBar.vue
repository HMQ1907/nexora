<template>
  <header ref="bar" class="nav" :class="{ solid: scrolled && !open, hidden }">
    <div ref="inner" class="nav__bar container">
      <a href="#top" class="logo" @click.prevent="go('#top')" :aria-label="t.ui.home">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M10.5 22V10h2.2l6.6 8.2V10h2.2v12h-2.2l-6.6-8.2V22z" fill="currentColor" />
        </svg>
        <span>Nexora</span>
      </a>
      <nav class="links" :aria-label="t.ui.mainNav">
        <a v-for="l in t.nav" :key="l.href" :href="l.href" @click.prevent="go(l.href)">
          <span class="roll" :data-text="l.label">{{ l.label }}</span>
        </a>
      </nav>
      <div class="lang" role="group" :aria-label="t.ui.lang">
        <button v-for="l in ['vi', 'en']" :key="l" type="button" :aria-pressed="lang === l" :class="{ on: lang === l }" @click="pick(l)">
          {{ l.toUpperCase() }}
        </button>
      </div>
      <a href="#contact" class="btn cta" @click.prevent="go('#contact')">{{ t.ui.quote }}</a>
      <button
        class="burger"
        :class="{ open }"
        @click="open = !open"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="open ? t.ui.menuClose : t.ui.menuOpen"
      >
        <span></span><span></span>
      </button>
    </div>

    <Transition :css="false" @enter="menuIn" @leave="menuOut">
      <div v-if="open" id="mobile-menu" class="menu">
        <nav :aria-label="t.ui.menuOpen">
          <a v-for="l in t.nav" :key="l.href" :href="l.href" class="menu__link" @click.prevent="go(l.href)">
            <span>{{ l.label }}</span>
          </a>
        </nav>
        <a :href="contact.zaloUrl" target="_blank" rel="noopener" class="btn btn--brass menu__zalo">{{ t.ui.zaloAria }}</a>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { contact } from '../data'
import { lang, t } from '../i18n'

const lenis = inject('lenis')
const scrollTo = inject('scrollTo')
const switchLang = inject('switchLang')
const pick = (l) => {
  open.value = false
  switchLang(l)
}
const bar = ref(null)
const inner = ref(null)
const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)
let last = 0

const go = (href) => {
  open.value = false
  scrollTo(href)
}

const menuIn = (el, done) => {
  gsap
    .timeline({ onComplete: done })
    .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' })
    .from(el.querySelectorAll('.menu__link span'), { yPercent: 110, duration: 0.8, stagger: 0.06, ease: 'expo.out' }, 0.35)
    .from(el.querySelector('.menu__zalo'), { opacity: 0, y: 20, duration: 0.6 }, 0.6)
}
const menuOut = (el, done) => {
  gsap.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'expo.inOut', onComplete: done })
}

const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 30
  hidden.value = y > last && y > 600 && !open.value
  last = y
}
const onKey = (e) => {
  if (e.key === 'Escape') open.value = false
}

watch(open, (v) => (v ? lenis.value?.stop() : lenis.value?.start()))

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  if (!reduced()) gsap.from(inner.value, { yPercent: -100, opacity: 0, duration: 1.2, delay: 1.1, ease: 'expo.out' })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: transform 0.6s var(--ease);
}
.nav.hidden {
  transform: translateY(-110%);
}
.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(18, 16, 14, 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
  opacity: 0;
  transition: opacity 0.5s;
}
.nav.solid::before {
  opacity: 1;
}
.nav__bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 28px;
  height: 84px;
  transition: height 0.5s var(--ease);
}
.nav.solid .nav__bar {
  height: 70px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: auto;
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.logo svg {
  width: 32px;
  height: 32px;
  color: var(--brass);
}
.links {
  display: flex;
  gap: 36px;
  font-size: 15px;
}
.links a {
  display: block;
  overflow: hidden;
  color: var(--stone);
  transition: color 0.3s;
}
.links a:hover {
  color: var(--ivory);
}
/* Chữ cuộn lên khi rê chuột */
.roll {
  position: relative;
  display: inline-block;
  transition: transform 0.55s var(--ease);
}
.roll::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 100%;
  color: var(--brass);
}
.links a:hover .roll {
  transform: translateY(-100%);
}
.lang {
  display: flex;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid var(--line-2);
}
.lang button {
  min-width: 42px;
  height: 36px;
  padding: 0 10px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--stone);
  font-size: 13px;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: background 0.4s var(--ease), color 0.3s;
}
.lang button:hover {
  color: var(--ivory);
}
.lang button.on {
  background: var(--ivory);
  color: var(--night);
}
.cta {
  min-height: 46px;
  padding: 0 24px;
  font-size: 14px;
}
.burger {
  display: none;
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--line-2);
  background: transparent;
  cursor: pointer;
}
.burger span {
  position: absolute;
  left: 15px;
  right: 15px;
  height: 1px;
  background: var(--ivory);
  transition: transform 0.45s var(--ease);
}
.burger span:first-child {
  top: 20px;
}
.burger span:last-child {
  top: 27px;
}
.burger.open span:first-child {
  transform: translateY(3.5px) rotate(45deg);
}
.burger.open span:last-child {
  transform: translateY(-3.5px) rotate(-45deg);
}
.menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px var(--pad) 36px;
  background: var(--night-2);
}
.menu nav {
  display: flex;
  flex-direction: column;
}
.menu__link {
  display: block;
  overflow: hidden;
  font-family: var(--serif);
  font-size: clamp(48px, 13vw, 76px);
  line-height: 1.2;
  border-bottom: 1px solid var(--line);
}
.menu__link span {
  display: inline-block;
}
@media (max-width: 900px) {
  .links,
  .cta {
    display: none;
  }
  .burger {
    display: block;
  }
  .nav__bar {
    height: 72px;
  }
}
</style>
