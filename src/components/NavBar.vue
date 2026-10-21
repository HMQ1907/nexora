<template>
  <header ref="bar" class="nav" :class="{ scrolled, hidden }">
    <div class="nav__inner container">
      <a href="#top" class="logo" @click.prevent="go('#top')" aria-label="Nexora — về đầu trang">
        <svg viewBox="0 0 64 64" class="logo__mark"><path d="M18 46V18h6l16 18V18h6v28h-6L24 28v18z" /></svg>
        <span>NEXORA</span>
      </a>
      <nav class="links" aria-label="Điều hướng chính">
        <a v-for="(l, i) in nav" :key="l.href" :href="l.href" @click.prevent="go(l.href)" @mouseenter="hover($event)">
          <span class="idx">0{{ i + 1 }}</span><span class="txt" :data-text="l.label">{{ l.label }}</span>
        </a>
      </nav>
      <a :href="'tel:' + contact.phone" class="btn btn--solid cta" v-magnetic>
        {{ contact.phoneDisplay }}
      </a>
      <button class="burger" :class="{ open }" @click="toggle" :aria-expanded="open" aria-label="Mở menu">
        <span></span><span></span>
      </button>
    </div>

    <div ref="menu" class="menu" :class="{ open }">
      <nav>
        <a v-for="(l, i) in nav" :key="l.href" :href="l.href" @click.prevent="go(l.href)" class="menu__link">
          <span class="idx">0{{ i + 1 }}</span>{{ l.label }}
        </a>
      </nav>
      <div class="menu__foot">
        <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
        <a :href="'tel:' + contact.phone">{{ contact.phoneDisplay }}</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import gsap from 'gsap'
import { nav, contact } from '../data'
import { scramble } from '../utils/scramble'

const props = defineProps({ ready: Boolean })
const lenis = inject('lenis')
const bar = ref(null)
const menu = ref(null)
const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)
let last = 0

const hover = (e) => {
  const t = e.currentTarget.querySelector('.txt')
  scramble(t, t.dataset.text, 450)
}

const go = (href) => {
  open.value = false
  lenis.value?.start()
  const target = href === '#top' ? 0 : href
  if (lenis.value) lenis.value.scrollTo(target, { duration: 1.6 })
  else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

const toggle = () => {
  open.value = !open.value
  if (open.value) {
    lenis.value?.stop()
    gsap.fromTo(
      menu.value.querySelectorAll('.menu__link'),
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.9, ease: 'expo.out', delay: 0.2 }
    )
  } else lenis.value?.start()
}

const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 40
  hidden.value = y > last && y > 400 && !open.value
  last = y
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  gsap.set(bar.value, { yPercent: -120 })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(
  () => props.ready,
  (v) => v && gsap.to(bar.value, { yPercent: 0, duration: 1.2, delay: 1.2, ease: 'expo.out' })
)
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
.nav.hidden .nav__inner { transform: translateY(-140%); }
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 84px;
  transition: transform 0.6s var(--ease), height 0.5s var(--ease);
  position: relative;
  z-index: 2;
}
.nav.scrolled .nav__inner { height: 68px; }
.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(6, 7, 10, 0.6);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid var(--line);
  opacity: 0;
  transition: opacity 0.5s, transform 0.6s var(--ease);
}
.nav.scrolled::before { opacity: 1; }
.nav.hidden::before { transform: translateY(-100%); }
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 17px;
  letter-spacing: 0.04em;
}
.logo__mark {
  width: 30px;
  height: 30px;
  fill: var(--accent);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  padding: 3px;
}
.links {
  display: flex;
  gap: 36px;
  font-size: 14px;
}
.links a {
  display: flex;
  align-items: baseline;
  gap: 6px;
  color: var(--muted);
  transition: color 0.3s;
}
.links a:hover { color: var(--text); }
.idx {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
}
.cta { padding: 12px 20px; font-size: 12px; }
.burger {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line-2);
  border-radius: 50%;
  background: transparent;
  position: relative;
}
.burger span {
  position: absolute;
  left: 13px;
  right: 13px;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.5s var(--ease);
}
.burger span:first-child { top: 18px; }
.burger span:last-child { top: 24px; }
.burger.open span:first-child { transform: translateY(3px) rotate(45deg); }
.burger.open span:last-child { transform: translateY(-3px) rotate(-45deg); }

.menu {
  position: fixed;
  inset: 0;
  background: var(--bg);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px var(--pad) 40px;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.8s var(--ease);
}
.menu.open { clip-path: inset(0 0 0 0); }
.menu nav { display: flex; flex-direction: column; gap: 8px; }
.menu__link {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(36px, 10vw, 64px);
  line-height: 1.15;
  display: flex;
  gap: 14px;
  align-items: baseline;
  overflow: hidden;
}
.menu__foot {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}

@media (max-width: 900px) {
  .links, .cta { display: none; }
  .burger { display: block; }
}
</style>
