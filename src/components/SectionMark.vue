<template>
  <!-- Nhãn vị trí section: số thứ tự + tên, chữ được "giải mã" khi cuộn tới -->
  <p ref="el" class="mark" aria-hidden="true">
    <span class="mark__n">{{ String(n).padStart(2, '0') }}</span>
    <span class="mark__line"></span>
    <span ref="label" class="mark__label">{{ text }}</span>
  </p>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger, reduced } from '../utils/gsap'
import { scramble } from '../utils/fx'

const props = defineProps({ n: Number, text: String })
const el = ref(null)
const label = ref(null)
let st
let tw

onMounted(() => {
  if (reduced()) return
  gsap.set(el.value.querySelector('.mark__line'), { scaleX: 0 })
  gsap.set(label.value, { opacity: 0 })
  st = ScrollTrigger.create({
    trigger: el.value,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      tw = gsap.to(el.value.querySelector('.mark__line'), { scaleX: 1, duration: 0.9, ease: 'expo.out' })
      gsap.set(label.value, { opacity: 1 })
      scramble(label.value, props.text, 800)
    }
  })
})
onBeforeUnmount(() => {
  st?.kill()
  tw?.kill()
})
</script>

<style scoped>
.mark {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: clamp(28px, 4vw, 48px);
  font-size: var(--t-sm);
  color: var(--stone);
  letter-spacing: 0.04em;
  font-variant-numeric: lining-nums tabular-nums;
}
.mark__n {
  color: var(--brass);
}
.mark__line {
  width: 48px;
  height: 1px;
  background: var(--brass);
  transform-origin: left;
}
</style>
