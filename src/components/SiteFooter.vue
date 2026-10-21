<template>
  <footer ref="root" class="footer">
    <div class="container">
      <div class="top">
        <p class="tag">Thiết kế · Lập trình · Ra mắt — trọn gói từ A đến Z.</p>
        <button class="totop" @click="toTop" v-magnetic aria-label="Lên đầu trang">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
        </button>
      </div>
      <div ref="word" class="word" aria-hidden="true">
        <span v-for="(c, i) in 'NEXORA'" :key="i"><span>{{ c }}</span></span>
      </div>
      <div class="bottom">
        <span>© {{ year }} Nexora. All rights reserved.</span>
        <span>{{ contact.address }}</span>
        <span>
          <a :href="'tel:' + contact.phone">{{ contact.phoneDisplay }}</a> ·
          <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { contact } from '../data'

const lenis = inject('lenis')
const root = ref(null)
const word = ref(null)
const year = new Date().getFullYear()
const toTop = () => (lenis.value ? lenis.value.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))

let ctx
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.word > span > span', {
      yPercent: 100,
      ease: 'expo.out',
      duration: 1.4,
      stagger: 0.06,
      scrollTrigger: { trigger: word.value, start: 'top 95%' }
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding-top: 56px;
  overflow: hidden;
  background: linear-gradient(180deg, var(--bg), #0a0c10);
}
.top { display: flex; justify-content: space-between; align-items: center; gap: 24px; }
.tag { color: var(--muted); max-width: 32ch; }
.totop {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid var(--line-2);
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.4s, color 0.4s;
  flex: none;
}
.totop svg { width: 22px; height: 22px; }
.totop:hover { background: var(--accent); color: var(--accent-ink); }
.word {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 19.5vw;
  line-height: 0.8;
  letter-spacing: -0.04em;
  margin: 48px 0 0;
  padding-top: 0.04em;
}
.word > span { overflow: hidden; display: inline-block; }
.word > span > span {
  display: inline-block;
  background: linear-gradient(180deg, var(--text) 30%, rgba(237, 239, 243, 0.08));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.word > span:nth-child(3) > span { background-image: linear-gradient(180deg, var(--accent) 30%, rgba(200, 255, 46, 0.08)); }
.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 24px;
  padding: 24px 0 28px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}
.bottom a:hover { color: var(--accent); }
.word { max-width: calc(100vw - 2 * var(--pad)); }
@media (min-width: 1440px) { .word { font-size: 280px; } }
</style>
