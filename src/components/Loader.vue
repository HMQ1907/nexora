<template>
  <div v-if="show" ref="root" class="loader" aria-hidden="true">
    <div class="panel panel--top"></div>
    <div class="panel panel--bottom"></div>
    <span class="seam"></span>

    <div class="stage">
      <!-- Vòng thước tự vẽ quanh tên thương hiệu -->
      <svg class="ring" viewBox="0 0 400 400">
        <circle class="r-outer" cx="200" cy="200" r="190" />
        <circle class="r-arc" cx="200" cy="200" r="164" />
        <g class="r-ticks">
          <line v-for="i in 60" :key="i" x1="200" :y1="i % 5 === 0 ? 2 : 8" x2="200" y2="16" :class="{ major: i % 5 === 0 }" :transform="`rotate(${i * 6} 200 200)`" />
        </g>
      </svg>
      <p ref="word" class="word">Nexora</p>
      <p ref="tag" class="tag">{{ tagline }}</p>
    </div>

    <div class="meter">
      <span ref="count" class="count">000</span>
      <span class="bar"><span ref="fill"></span></span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap, SplitText, reduced } from '../utils/gsap'
import { loaderSeen, markLoaderSeen, scramble } from '../utils/fx'
import { lang } from '../i18n'

const emit = defineEmits(['done'])
const show = ref(!loaderSeen() && !reduced())
const tagline = lang.value === 'vi' ? 'Thiết kế  ✦  Xây dựng  ✦  Vận hành' : 'Design  ✦  Build  ✦  Care'
const root = ref(null)
const word = ref(null)
const tag = ref(null)
const fill = ref(null)
const count = ref(null)

onMounted(() => {
  if (!show.value) {
    emit('done')
    return
  }
  markLoaderSeen()
  document.documentElement.style.overflow = 'hidden'
  const q = gsap.utils.selector(root.value)
  const split = SplitText.create(word.value, { type: 'chars', mask: 'chars' })
  const prog = { v: 0 }
  gsap.set(tag.value, { opacity: 0 })

  gsap
    .timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        split.revert()
        show.value = false
      }
    })
    // 1. Vòng thước vẽ dần, vạch chia hiện lần lượt
    .from(q('.r-outer, .r-arc'), { drawSVG: 0, duration: 1.6, stagger: 0.15, ease: 'power3.inOut' }, 0)
    .from(q('.r-ticks line'), { opacity: 0, duration: 0.4, stagger: 0.012, ease: 'none' }, 0.1)
    .fromTo(q('.r-ticks'), { rotation: -60, svgOrigin: '200 200' }, { rotation: 0, svgOrigin: '200 200', duration: 2.2, ease: 'power3.out' }, 0)
    // 2. Tên thương hiệu: từ mờ nhoè đến sắc nét
    .from(split.chars, { yPercent: 110, filter: 'blur(12px)', opacity: 0, duration: 1.2, stagger: 0.06 }, 0.35)
    .add(() => {
      gsap.set(tag.value, { opacity: 1 })
      scramble(tag.value, tagline, 900)
    }, 0.9)
    // 3. Đếm phần trăm
    .to(prog, {
      v: 100,
      duration: 1.7,
      ease: 'power2.inOut',
      onUpdate: () => {
        count.value.textContent = String(Math.round(prog.v)).padStart(3, '0')
        fill.value.style.transform = `scaleX(${prog.v / 100})`
      }
    }, 0.2)
    // 4. Thu lại và mở màn như rèm
    .to(split.chars, { yPercent: -110, duration: 0.6, stagger: 0.03, ease: 'expo.in' }, '+=0.1')
    .to(q('.tag, .meter'), { opacity: 0, duration: 0.3 }, '<')
    .to(q('.ring'), { scale: 1.6, opacity: 0, rotation: 40, duration: 0.9, ease: 'expo.in' }, '<')
    .fromTo(q('.seam'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'expo.inOut' }, '-=0.35')
    .add(() => {
      document.documentElement.style.overflow = ''
      emit('done')
    })
    .to(q('.panel--top'), { yPercent: -100, duration: 1.1, ease: 'expo.inOut' })
    .to(q('.panel--bottom'), { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, '<')
    .to(q('.seam'), { opacity: 0, duration: 0.4 }, '<0.2')
})
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 400;
  display: grid;
  place-items: center;
}
.panel {
  position: absolute;
  left: 0;
  right: 0;
  height: 50.5%;
  background: var(--night);
}
.panel--top {
  top: 0;
}
.panel--bottom {
  bottom: 0;
}
.seam {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: var(--brass);
  box-shadow: 0 0 18px rgba(196, 164, 107, 0.8);
  transform: scaleX(0);
}
.stage {
  position: relative;
  display: grid;
  place-items: center;
  width: min(420px, 78vw);
  aspect-ratio: 1;
}
.ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.ring circle,
.ring line {
  fill: none;
  vector-effect: non-scaling-stroke;
}
.r-outer {
  stroke: rgba(236, 229, 214, 0.22);
  stroke-width: 1;
}
.r-arc {
  stroke: var(--brass);
  stroke-width: 1.5;
}
.r-ticks line {
  stroke: rgba(236, 229, 214, 0.3);
  stroke-width: 1;
}
.r-ticks line.major {
  stroke: var(--brass);
}
.word {
  position: relative;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(56px, 11vw, 112px);
  line-height: 1;
  letter-spacing: -0.03em;
}
.tag {
  position: absolute;
  top: calc(50% + clamp(44px, 7vw, 72px));
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--stone);
  white-space: pre;
}
.meter {
  position: absolute;
  left: var(--pad);
  right: var(--pad);
  bottom: 40px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.count {
  font-size: var(--t-sm);
  color: var(--brass);
  font-variant-numeric: lining-nums tabular-nums;
  letter-spacing: 0.08em;
}
.bar {
  flex: 1;
  height: 1px;
  background: var(--line);
}
.bar span {
  display: block;
  height: 100%;
  background: var(--brass);
  transform-origin: left;
  transform: scaleX(0);
}
</style>
