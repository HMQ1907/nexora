<template>
  <Transition name="fab">
    <a v-show="show" :href="contact.zaloUrl" target="_blank" rel="noopener" class="fab" :aria-label="t.ui.zaloAria">
      <ZaloIcon />
      <span class="fab__txt">Zalo</span>
    </a>
  </Transition>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { contact } from '../data'
import { t } from '../i18n'
import ZaloIcon from './ZaloIcon.vue'

// Hiện sau khi qua hero, ẩn khi tới khung liên hệ (đã có nút Zalo lớn ở đó)
const show = ref(false)
let io
onMounted(() => {
  const hero = document.getElementById('top')
  const contactEl = document.getElementById('contact')
  const seen = { hero: true, contact: false }
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (seen[e.target === hero ? 'hero' : 'contact'] = e.isIntersecting))
      show.value = !seen.hero && !seen.contact
    },
    { threshold: 0.1 }
  )
  hero && io.observe(hero)
  contactEl && io.observe(contactEl)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<style scoped>
.fab {
  position: fixed;
  right: max(18px, env(safe-area-inset-right));
  bottom: max(18px, env(safe-area-inset-bottom));
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 54px;
  padding: 0 22px 0 18px;
  border-radius: 999px;
  background: var(--brass);
  color: var(--night);
  font-weight: 500;
  box-shadow: 0 18px 40px -14px rgba(0, 0, 0, 0.7);
  transition: transform 0.5s var(--ease);
}
.fab:hover {
  transform: translateY(-3px);
}
.fab svg {
  width: 24px;
  height: 24px;
}
.fab-enter-active,
.fab-leave-active {
  transition: opacity 0.4s, transform 0.6s var(--ease);
}
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(24px);
}
</style>
