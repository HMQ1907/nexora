<template>
  <div ref="root" class="loader" aria-hidden="true">
    <div class="panel panel--top"></div>
    <div class="panel panel--bottom"></div>
    <div ref="inner" class="inner">
      <div class="brand">
        <span v-for="(c, i) in 'NEXORA'" :key="i" class="ch"><span>{{ c }}</span></span>
      </div>
      <div class="meta">
        <span ref="status" class="status">INITIALIZING CORE</span>
        <span class="count"><span ref="count">000</span>%</span>
      </div>
      <div class="bar"><span ref="bar"></span></div>
    </div>
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { scramble } from '../utils/scramble'

const emit = defineEmits(['done'])
const root = ref(null)
const inner = ref(null)
const count = ref(null)
const bar = ref(null)
const status = ref(null)

const STEPS = ['INITIALIZING CORE', 'COMPILING SHADERS', 'CALIBRATING MOTION', 'SYSTEM READY']

onMounted(() => {
  const q = gsap.utils.selector(root.value)
  const prog = { v: 0 }
  let lastStep = 0
  const tl = gsap.timeline()

  tl.from(q('.ch span'), { yPercent: 110, duration: 1, stagger: 0.06, ease: 'expo.out' })
    .from(q('.corner'), { scale: 0, opacity: 0, duration: 0.6, stagger: 0.05 }, 0)
    .to(
      prog,
      {
        v: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(prog.v)
          count.value.textContent = String(v).padStart(3, '0')
          bar.value.style.transform = `scaleX(${prog.v / 100})`
          const step = Math.min(Math.floor(v / 34), 3)
          if (step !== lastStep) {
            lastStep = step
            scramble(status.value, STEPS[step], 500)
          }
        }
      },
      0.2
    )
    .to(q('.ch span'), { yPercent: -110, duration: 0.7, stagger: 0.04, ease: 'expo.in' }, '+=0.15')
    .to(q('.meta, .bar, .corner'), { opacity: 0, duration: 0.4 }, '<')
    .add(() => emit('done'), '-=0.1')
    .to(q('.panel--top'), { yPercent: -100, duration: 1.2, ease: 'expo.inOut' })
    .to(q('.panel--bottom'), { yPercent: 100, duration: 1.2, ease: 'expo.inOut' }, '<')
    .set(root.value, { display: 'none' })
})
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
}
.panel {
  position: absolute;
  left: 0;
  right: 0;
  height: 50.5%;
  background: var(--bg);
}
.panel--top { top: 0; border-bottom: 1px solid var(--line); }
.panel--bottom { bottom: 0; }
.inner {
  position: relative;
  width: min(560px, 86vw);
}
.brand {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(44px, 10vw, 96px);
  line-height: 1;
  letter-spacing: -0.02em;
}
.ch { overflow: hidden; display: inline-block; }
.ch span { display: inline-block; }
.ch:nth-child(3) span { color: var(--accent); }
.meta {
  display: flex;
  justify-content: space-between;
  margin-top: 28px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--muted);
}
.count { color: var(--text); }
.bar {
  margin-top: 12px;
  height: 1px;
  background: var(--line-2);
}
.bar span {
  display: block;
  height: 100%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
  transform-origin: left;
  transform: scaleX(0);
}
.corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: var(--line-2);
  border-style: solid;
  border-width: 0;
}
.tl { top: 24px; left: 24px; border-top-width: 1px; border-left-width: 1px; }
.tr { top: 24px; right: 24px; border-top-width: 1px; border-right-width: 1px; }
.bl { bottom: 24px; left: 24px; border-bottom-width: 1px; border-left-width: 1px; }
.br { bottom: 24px; right: 24px; border-bottom-width: 1px; border-right-width: 1px; }
</style>
