<template>
  <footer ref="root" class="footer">
    <div class="container">
      <div class="top">
        <p class="tag">{{ t.footer.tag }}</p>
        <nav :aria-label="t.ui.mainNav">
          <a v-for="l in t.nav" :key="l.href" :href="l.href" @click.prevent="scrollTo(l.href)">{{ l.label }}</a>
          <a :href="contact.zaloUrl" target="_blank" rel="noopener">Zalo</a>
        </nav>
      </div>
      <p ref="word" class="word" aria-hidden="true">Nexora</p>
      <div class="bottom">
        <span>© {{ year }} Nexora</span>
        <span>{{ t.contact.office }}</span>
        <button type="button" class="totop" @click="scrollTo('#top')">{{ t.ui.top }}</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, SplitText, reduced } from '../utils/gsap'
import { contact } from '../data'
import { t } from '../i18n'

const scrollTo = inject('scrollTo')
const root = ref(null)
const word = ref(null)
const year = new Date().getFullYear()
let ctx
let split

onMounted(() => {
  if (reduced()) return
  ctx = gsap.context(() => {
    split = SplitText.create(word.value, { type: 'chars', mask: 'chars' })
    gsap.from(split.chars, {
      yPercent: 100,
      duration: 1.6,
      stagger: 0.06,
      ease: 'expo.out',
      scrollTrigger: { trigger: word.value, start: 'top 95%', once: true }
    })
  }, root.value)
})
onBeforeUnmount(() => {
  split?.revert()
  ctx?.revert()
})
</script>

<style scoped>
.footer {
  padding-top: 72px;
  background: var(--night-2);
  border-top: 1px solid var(--line);
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  flex-wrap: wrap;
}
.tag {
  max-width: 32ch;
  color: var(--stone);
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 32px;
}
nav a {
  border-bottom: 1px solid transparent;
  transition: color 0.3s, border-color 0.3s;
}
nav a:hover {
  color: var(--brass);
  border-color: var(--brass);
}
.word {
  margin-top: 40px;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(96px, 25vw, 380px);
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--ivory);
  opacity: 0.92;
  white-space: nowrap;
}
.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px 24px;
  padding: 24px 0 30px;
  margin-top: 24px;
  border-top: 1px solid var(--line);
  font-size: var(--t-sm);
  color: var(--stone);
}
.totop {
  background: none;
  border: 0;
  color: var(--ivory);
  cursor: pointer;
  border-bottom: 1px solid var(--line-2);
  padding-bottom: 2px;
}
.totop:hover {
  border-color: var(--brass);
  color: var(--brass);
}
</style>
