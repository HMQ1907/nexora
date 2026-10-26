<template>
  <!-- Cảnh 2: câu giới thiệu hiện từng từ giữa màn hình, sau đó các con số -->
  <section ref="root" class="intro" :class="{ static: still }">
    <div ref="pin" class="pin container">
      <SectionMark :n="1" :text="t.marks[0]" />
      <p ref="statement" class="statement">{{ t.intro.statement }}</p>

      <ul class="stats">
        <li v-for="s in t.intro.stats" :key="s.unit" class="stat">
          <span class="stat__val"><span class="num" :data-to="s.value">{{ s.value }}</span><span v-if="s.suffix" class="suf">{{ s.suffix }}</span> {{ s.unit }}</span>
          <span class="stat__label">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, SplitText, reduced } from '../utils/gsap'
import { t } from '../i18n'
import SectionMark from './SectionMark.vue'

const still = reduced()
const root = ref(null)
const pin = ref(null)
const statement = ref(null)
let mm
let split

onMounted(() => {
  if (still) return
  split = SplitText.create(statement.value, { type: 'words' })
  mm = gsap.matchMedia()

  const build = (pinIt) => {
    const nums = gsap.utils.toArray('.num', root.value)
    const vals = nums.map(() => ({ v: 0 }))
    nums.forEach((el) => (el.textContent = '0'))
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: pinIt
        ? { trigger: root.value, start: 'top top', end: '+=90%', pin: pin.value, scrub: 0.8 }
        : { trigger: statement.value, start: 'top 80%', end: 'bottom 20%', scrub: 0.8 }
    })
    tl.fromTo(split.words, { opacity: 0.1, filter: 'blur(6px)', y: 12 }, { opacity: 1, filter: 'blur(0px)', y: 0, stagger: 0.06, duration: 0.4 })
    // Các con số xuất hiện và đếm lên khi câu đã sáng hết
    const at = tl.duration()
    tl.from(gsap.utils.toArray('.stat', root.value), { '--rule': 0, opacity: 0, y: 40, stagger: 0.12, duration: 0.6, ease: 'power2.out' }, at)
    nums.forEach((el, i) => {
      tl.to(vals[i], { v: +el.dataset.to, duration: 0.9, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(vals[i].v)) }, at + 0.1)
    })
    tl.to({}, { duration: 0.4 })
  }
  mm.add('all', () => build(false))
})
onBeforeUnmount(() => {
  mm?.revert()
  split?.revert()
})
</script>

<style scoped>
.pin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: clamp(88px, 9vw, 130px);
  padding-bottom: clamp(64px, 7vw, 100px);
}
.statement {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(30px, 4.2vw, 68px);
  line-height: 1.18;
  letter-spacing: -0.015em;
  max-width: 22em;
  text-wrap: pretty;
}
.stats {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 4vw, 64px);
  margin-top: clamp(48px, 8vh, 96px);
}
.stat {
  --rule: 1;
  position: relative;
  padding-top: 24px;
}
.stat::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--brass);
  transform: scaleX(var(--rule));
  transform-origin: left;
}
.stat__val {
  display: block;
  font-family: var(--serif);
  font-size: var(--t-xl);
  line-height: 1.1;
}
.num {
  display: inline-block;
  font-size: 1.6em;
  color: var(--brass);
  font-variant-numeric: lining-nums tabular-nums;
}
.suf {
  font-size: 1.2em;
  color: var(--brass);
}
.stat__label {
  display: block;
  margin-top: 10px;
  color: var(--stone);
  max-width: 30ch;
}
.intro.static .pin {
  min-height: 0;
  padding-top: clamp(96px, 13vw, 200px);
  padding-bottom: clamp(96px, 13vw, 200px);
}
@media (max-width: 900px) {
  .pin {
    min-height: 0;
    padding-top: 96px;
    padding-bottom: 96px;
  }
  .stats {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
