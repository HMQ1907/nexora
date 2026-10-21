<template>
  <section id="contact" ref="root" class="section contact">
    <div class="grid-bg"></div>
    <div class="container">
      <div class="status" data-reveal><span class="ping"></span>Đang nhận dự án mới</div>
      <h2 class="big" ref="big">
        <span class="line"><span class="li">Có ý tưởng?</span></span>
        <span class="line"><span class="li">Hãy <em>bắt đầu</em> ngay.</span></span>
      </h2>

      <div class="cols">
        <div class="info">
          <a :href="'mailto:' + contact.email" class="mail" data-reveal data-cursor="GỬI MAIL">
            {{ contact.email }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </a>
          <ul class="list">
            <li data-reveal>
              <span class="k">Điện thoại</span>
              <a :href="'tel:' + contact.phone">{{ contact.phoneDisplay }}</a>
            </li>
            <li data-reveal>
              <span class="k">Email</span>
              <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
            </li>
            <li data-reveal>
              <span class="k">Địa chỉ</span>
              <a :href="contact.mapUrl" target="_blank" rel="noopener">{{ contact.address }}</a>
            </li>
            <li data-reveal>
              <span class="k">Giờ làm việc</span>
              <span>Thứ 2 – Thứ 7 · 8:00 – 18:00</span>
            </li>
          </ul>
        </div>

        <form class="form" data-reveal @submit.prevent="submit">
          <p class="form__title">Gửi yêu cầu báo giá</p>
          <div class="chips" role="group" aria-label="Bạn cần gì?">
            <button
              v-for="n in needs"
              :key="n"
              type="button"
              class="chip"
              :class="{ on: form.needs.includes(n) }"
              :aria-pressed="form.needs.includes(n)"
              @click="toggle(n)"
            >{{ n }}</button>
          </div>
          <div class="row">
            <label class="field">
              <input v-model="form.name" required placeholder=" " />
              <span>Họ và tên *</span>
            </label>
            <label class="field">
              <input v-model="form.phone" type="tel" required placeholder=" " />
              <span>Số điện thoại *</span>
            </label>
          </div>
          <label class="field">
            <input v-model="form.company" placeholder=" " />
            <span>Công ty / Thương hiệu</span>
          </label>
          <label class="field">
            <textarea v-model="form.message" rows="4" placeholder=" "></textarea>
            <span>Mô tả ngắn về dự án</span>
          </label>
          <button class="btn btn--solid submit" type="submit" v-magnetic="0.2">
            {{ sent ? 'Đã mở ứng dụng email ✓' : 'Gửi yêu cầu' }}
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <p class="note">Hoặc gọi trực tiếp <a :href="'tel:' + contact.phone">{{ contact.phoneDisplay }}</a> — phản hồi trong 24 giờ làm việc.</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import gsap from 'gsap'
import { contact } from '../data'

const root = ref(null)
const big = ref(null)
const sent = ref(false)
const needs = ['Website doanh nghiệp', 'Landing page', 'Thương mại điện tử', 'UI/UX Design', '3D & Motion', 'Bảo trì & SEO']
const form = reactive({ needs: [], name: '', phone: '', company: '', message: '' })
const toggle = (n) => {
  const i = form.needs.indexOf(n)
  i > -1 ? form.needs.splice(i, 1) : form.needs.push(n)
}

// Chưa có máy chủ: mở ứng dụng email với nội dung soạn sẵn
const submit = () => {
  const body = [
    `Họ tên: ${form.name}`,
    `Điện thoại: ${form.phone}`,
    `Công ty: ${form.company || '-'}`,
    `Nhu cầu: ${form.needs.join(', ') || '-'}`,
    '',
    form.message
  ].join('\n')
  const subject = `Yêu cầu dự án mới — ${form.name}`
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}

let ctx
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.big .li', {
      yPercent: 110,
      rotate: 3,
      duration: 1.4,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: { trigger: big.value, start: 'top 80%' }
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.contact { overflow: hidden; }
.status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border: 1px solid var(--line-2);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.ping {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 rgba(200, 255, 46, 0.7);
  animation: ping 1.8s infinite;
}
@keyframes ping {
  70% { box-shadow: 0 0 0 10px rgba(200, 255, 46, 0); }
  100% { box-shadow: 0 0 0 0 rgba(200, 255, 46, 0); }
}
.big {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(44px, 8.4vw, 136px);
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 28px 0 clamp(48px, 7vw, 96px);
}
.line { display: block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.li { display: inline-block; transform-origin: left bottom; }
.big em { font-style: normal; color: var(--accent); }
.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 96px);
  position: relative;
}
.mail {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-display);
  font-size: clamp(22px, 2.6vw, 38px);
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line-2);
  transition: color 0.3s, border-color 0.3s;
  word-break: break-all;
}
.mail svg { width: 0.9em; height: 0.9em; flex: none; transition: transform 0.5s var(--ease); }
.mail:hover { color: var(--accent); border-color: var(--accent); }
.mail:hover svg { transform: rotate(45deg); }
.list { list-style: none; margin-top: 48px; }
.list li {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.list a:hover { color: var(--accent); }
.k { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); padding-top: 3px; }

.form {
  padding: clamp(24px, 3vw, 40px);
  border: 1px solid var(--line-2);
  border-radius: 24px;
  background: rgba(15, 18, 24, 0.7);
  backdrop-filter: blur(10px);
}
.form__title { font-family: var(--font-display); font-size: 20px; margin-bottom: 20px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.chip {
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid var(--line-2);
  background: transparent;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.3s var(--ease);
}
.chip:hover { color: var(--text); border-color: var(--text); }
.chip.on { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.field { position: relative; display: block; margin-bottom: 22px; }
.field input,
.field textarea {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--line-2);
  padding: 22px 0 10px;
  font-size: 16px;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s;
}
.field span {
  position: absolute;
  left: 0;
  top: 22px;
  color: var(--muted);
  font-size: 15px;
  pointer-events: none;
  transition: all 0.35s var(--ease);
}
.field input:focus,
.field textarea:focus { border-color: var(--accent); }
.field input:focus + span,
.field input:not(:placeholder-shown) + span,
.field textarea:focus + span,
.field textarea:not(:placeholder-shown) + span {
  top: 0;
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}
.submit { width: 100%; justify-content: center; margin-top: 8px; padding: 18px; }
.note { margin-top: 16px; font-size: 13px; color: var(--muted); text-align: center; }
.note a { color: var(--text); border-bottom: 1px solid var(--line-2); }

@media (max-width: 900px) {
  .cols { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; gap: 0; }
  .list li { grid-template-columns: 1fr; gap: 4px; }
}
</style>
