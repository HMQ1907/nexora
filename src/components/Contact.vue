<template>
  <section id="contact" ref="root" class="section contact">
    <div class="container">
      <SectionMark :n="6" :text="t.marks[5]" />
      <h2 ref="title" class="title">{{ t.contact.title }}</h2>

      <div class="cols">
        <div class="side">
          <p class="lead">{{ t.contact.lead }}</p>
          <a :href="contact.zaloUrl" target="_blank" rel="noopener" class="zalo">
            <span class="zalo__icon"><ZaloIcon /></span>
            <span class="zalo__txt">
              <span class="zalo__k">{{ t.contact.zaloTitle }}</span>
              <span class="zalo__note">{{ t.contact.zaloNote }}</span>
            </span>
            <svg class="zalo__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </a>
          <dl class="meta">
            <div>
              <dt>{{ t.contact.officeLabel }}</dt>
              <dd>{{ t.contact.office }}</dd>
            </div>
            <div>
              <dt>{{ t.contact.hoursLabel }}</dt>
              <dd>{{ t.contact.hours }}</dd>
            </div>
          </dl>
        </div>

        <div ref="env" class="env" :class="{ still }">
          <span class="env__back" aria-hidden="true"></span>
        <div class="form-wrap" @pointermove="spot">
          <form v-if="!done" ref="formEl" class="form" @submit.prevent="submit" novalidate>
            <h3 class="form__title">{{ t.contact.formTitle }}</h3>
            <p class="form__note">{{ t.contact.formNote }}</p>
            <fieldset class="chips">
              <legend>{{ t.contact.needsLabel }} <span>{{ t.contact.needsHint }}</span></legend>
              <button
                v-for="n in t.contact.needs"
                :key="n"
                type="button"
                class="chip"
                :class="{ on: form.needs.includes(n) }"
                :aria-pressed="form.needs.includes(n)"
                @click="toggle(n)"
              >{{ n }}</button>
            </fieldset>
            <div class="row">
              <label class="field" :class="{ err: errors.name }">
                <span class="field__label">{{ t.contact.name }}</span>
                <input v-model.trim="form.name" autocomplete="name" :aria-invalid="!!errors.name" />
                <small v-if="errors.name">{{ errors.name }}</small>
              </label>
              <label class="field" :class="{ err: errors.phone }">
                <span class="field__label">{{ t.contact.phone }}</span>
                <input v-model.trim="form.phone" type="tel" inputmode="tel" autocomplete="tel" :aria-invalid="!!errors.phone" />
                <small v-if="errors.phone">{{ errors.phone }}</small>
              </label>
            </div>
            <label class="field">
              <span class="field__label">{{ t.contact.company }} <em>{{ t.contact.optional }}</em></span>
              <input v-model.trim="form.company" autocomplete="organization" />
            </label>
            <label class="field">
              <span class="field__label">{{ t.contact.message }} <em>{{ t.contact.optional }}</em></span>
              <textarea v-model="form.message" rows="3" :placeholder="t.contact.placeholder"></textarea>
            </label>

            <button class="btn btn--brass submit" type="submit" :disabled="sending">
              {{ sending ? t.contact.sending : t.contact.submit }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <p class="status" role="status" aria-live="polite">{{ status }}</p>
          </form>

          <div v-else ref="doneEl" class="done" role="status">
            <svg class="done__mark" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" />
              <path d="M20 33l8 8 16-18" />
            </svg>
            <h3>{{ doneTitle }}</h3>
            <p>{{ doneText }}</p>
            <div class="done__actions">
              <a v-if="!hasEndpoint" :href="contact.zaloUrl" target="_blank" rel="noopener" class="btn btn--brass">{{ t.contact.reopen }}</a>
              <button type="button" class="btn" @click="reset">{{ t.contact.another }}</button>
            </div>
          </div>
        </div>
          <span class="env__pocket" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="0,0 50,40 100,0" /></svg>
          </span>
          <span class="env__flap" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="0,0 50,100 100,0" /></svg>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import { gsap, splitLines, reduced } from '../utils/gsap'
import { contact } from '../data'
import { t } from '../i18n'
import SectionMark from './SectionMark.vue'
import ZaloIcon from './ZaloIcon.vue'

const root = ref(null)
const env = ref(null)
// Phong bì tắt: form luôn hiện rõ để khách điền ngay
const still = true
const title = ref(null)
const doneEl = ref(null)
const form = reactive({ needs: [], name: '', phone: '', company: '', message: '' })
const errors = reactive({ name: '', phone: '' })
const status = ref('')
const sending = ref(false)
const done = ref(false)
const doneTitle = ref('')
const doneText = ref('')
const hasEndpoint = !!(contact.formEndpoint && contact.formKey)
const c = () => t.value.contact

// Viền sáng chạy theo con trỏ quanh khung form
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

const toggle = (n) => {
  const i = form.needs.indexOf(n)
  i > -1 ? form.needs.splice(i, 1) : form.needs.push(n)
}

const validate = () => {
  errors.name = form.name ? '' : c().errName
  const digits = form.phone.replace(/\D/g, '')
  errors.phone = digits.length >= 9 && digits.length <= 12 ? '' : c().errPhone
  return !errors.name && !errors.phone
}

const message = () => {
  const m = c().msg
  return [
    m.intro,
    `${m.name}: ${form.name}`,
    `${m.phone}: ${form.phone}`,
    `${m.company}: ${form.company || '-'}`,
    `${m.needs}: ${form.needs.join(', ') || '-'}`,
    form.message ? `${m.message}: ${form.message}` : ''
  ]
    .filter(Boolean)
    .join('\n')
}

const showDone = async (title, d) => {
  doneTitle.value = title
  doneText.value = d
  done.value = true
  await nextTick()
  if (!reduced()) {
    gsap.from(doneEl.value.querySelectorAll('circle, path'), { drawSVG: 0, duration: 1.1, stagger: 0.25, ease: 'power3.inOut' })
    gsap.from(doneEl.value.querySelectorAll('h3, p, .done__actions'), { y: 24, opacity: 0, duration: 1, stagger: 0.08, delay: 0.3, ease: 'expo.out' })
  }
}

const submit = async () => {
  status.value = ''
  if (!validate()) return

  // Có khoá Web3Forms: gửi thẳng về email
  if (hasEndpoint) {
    sending.value = true
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.formKey,
          subject: `${c().msg.subject}: ${form.name}`,
          from_name: 'Website Nexora',
          [c().msg.name]: form.name,
          [c().msg.phone]: form.phone,
          [c().msg.company]: form.company || '-',
          [c().msg.needs]: form.needs.join(', ') || '-',
          [c().msg.message]: form.message || '-'
        })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === false) throw new Error()
      showDone(c().sentTitle, c().sentText)
    } catch {
      status.value = c().errSend
    } finally {
      sending.value = false
    }
    return
  }

  // Chưa có nơi nhận form: sao chép nội dung rồi mở Zalo để khách dán và gửi
  let copied = false
  try {
    await navigator.clipboard.writeText(message())
    copied = true
  } catch {}
  window.open(contact.zaloUrl, '_blank', 'noopener')
  showDone(copied ? c().copiedTitle : c().openedTitle, copied ? c().copiedText : c().openedText)
}

const reset = () => {
  Object.assign(form, { needs: [], name: '', phone: '', company: '', message: '' })
  done.value = false
}

let ctx
let split
onMounted(() => {
  if (reduced()) return
  ctx = gsap.context(() => {
    split = splitLines(title.value)
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.5,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: title.value, start: 'top 80%', once: true }
    })
    gsap.from('.side > *', {
      y: 50,
      opacity: 0,
      duration: 1.3,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.cols', start: 'top 80%', once: true }
    })


  }, root.value)
})
onBeforeUnmount(() => {
  split?.revert()
  ctx?.revert()
})
</script>

<style scoped>
.contact {
  border-top: 1px solid var(--line);
}
.contact.section {
  padding: clamp(88px, 8vw, 120px) 0 clamp(64px, 7vw, 110px);
}
.title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(36px, 4.4vw, 68px);
  line-height: 1.02;
  letter-spacing: -0.02em;
  max-width: 20ch;
  margin-bottom: clamp(28px, 3.5vw, 48px);
  text-wrap: balance;
}
.cols {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(40px, 7vw, 120px);
  align-items: start;
}

.zalo {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 36px;
  padding: 22px 24px;
  border-radius: 18px;
  border: 1px solid rgba(196, 164, 107, 0.45);
  background: linear-gradient(135deg, rgba(196, 164, 107, 0.12), rgba(196, 164, 107, 0.02));
  transition: border-color 0.4s, background 0.4s;
}
.zalo:hover {
  border-color: var(--brass);
  background: linear-gradient(135deg, rgba(196, 164, 107, 0.2), rgba(196, 164, 107, 0.05));
}
.zalo__icon {
  flex: none;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--brass);
  color: var(--night);
}
.zalo__icon svg {
  width: 26px;
  height: 26px;
}
.zalo__txt {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}
.zalo__k {
  font-family: var(--serif);
  font-size: var(--t-lg);
}
.zalo__note {
  font-size: var(--t-sm);
  color: var(--stone);
}
.zalo__arrow {
  width: 26px;
  height: 26px;
  margin-left: auto;
  flex: none;
  color: var(--brass);
  transition: transform 0.5s var(--ease);
}
.zalo:hover .zalo__arrow {
  transform: translate(4px, -4px);
}
.meta {
  margin-top: 48px;
}
.meta div {
  padding: 16px 0;
  border-top: 1px solid var(--line);
}
.meta dt {
  font-size: var(--t-sm);
  color: var(--stone);
}

/* Phong bì bao quanh form */
.env {
  position: relative;
  perspective: 1600px;
  clip-path: inset(-300% -60px -18px -60px);
}
.env > span {
  position: absolute;
  left: -14px;
  right: -14px;
  pointer-events: none;
}
.env__back {
  top: 20%;
  bottom: -14px;
  z-index: 0;
  border-radius: 20px;
  background: #1d1915;
  border: 1px solid rgba(196, 164, 107, 0.25);
}
.env__pocket {
  bottom: -14px;
  height: 60%;
  z-index: 2;
  border-radius: 0 0 20px 20px;
  background: linear-gradient(180deg, #241f19, #1a1612);
  border: 1px solid rgba(196, 164, 107, 0.3);
  border-top: 0;
  clip-path: polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%);
}
.env__flap {
  top: 20%;
  height: 42%;
  z-index: 3;
  background: linear-gradient(180deg, #2a231c, #211b16);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
}
.env svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: rgba(196, 164, 107, 0.7);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}
.env svg polyline {
  vector-effect: non-scaling-stroke;
}
.env.still > span {
  display: none;
}
.env.still {
  clip-path: none;
}

/* Form */
.form-wrap {
  --mx: 50%;
  --my: 0%;
  position: relative;
  z-index: 1;
  padding: clamp(26px, 3.4vw, 48px);
  border-radius: 24px;
  background: var(--night-2);
  border: 1px solid var(--line);
  isolation: isolate;
}
/* Viền đồng thau sáng lên quanh con trỏ */
.form-wrap::before {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(320px circle at var(--mx) var(--my), rgba(196, 164, 107, 0.9), transparent 60%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s;
}
.form-wrap:hover::before {
  opacity: 1;
}
.chips {
  border: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 34px;
}
.chips legend {
  margin-bottom: 14px;
  font-weight: 400;
}
.chips legend span,
.field em {
  margin-left: 8px;
  font-style: normal;
  font-size: var(--t-sm);
  color: var(--stone);
}
.chip {
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid var(--line-2);
  background: transparent;
  font-size: 15px;
  color: var(--stone);
  cursor: pointer;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.chip:hover {
  color: var(--ivory);
  border-color: var(--ivory);
}
.chip.on {
  background: var(--brass);
  border-color: var(--brass);
  color: var(--night);
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.field {
  display: block;
  margin-bottom: 28px;
}
.field__label {
  display: block;
  font-size: 15px;
  font-weight: 400;
}
.field input,
.field textarea {
  width: 100%;
  padding: 12px 0;
  border: 0;
  border-bottom: 1px solid var(--line-2);
  background: transparent;
  font-size: 17px;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s;
}
.field input:focus,
.field textarea:focus {
  border-color: var(--brass);
}
.field input:focus-visible,
.field textarea:focus-visible {
  outline: none;
}
.field textarea::placeholder {
  color: rgba(163, 155, 140, 0.6);
}
.field.err input {
  border-color: #d4786a;
}
.field small {
  display: block;
  margin-top: 8px;
  font-size: var(--t-sm);
  color: #e08d7f;
}
.submit {
  width: 100%;
  margin-top: 8px;
}
.submit:disabled {
  opacity: 0.6;
  cursor: progress;
}
.status {
  min-height: 1.5em;
  margin-top: 14px;
  font-size: var(--t-sm);
  color: #e08d7f;
}
.done {
  padding: 24px 0;
  text-align: center;
}
.done__mark {
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
  fill: none;
  stroke: var(--brass);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.done h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: var(--t-xl);
  line-height: 1.1;
}
.done p {
  max-width: 40ch;
  margin: 14px auto 32px;
  color: var(--stone);
}
.done__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.form__title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: var(--t-lg);
  line-height: 1.15;
}
.form__note {
  margin: 6px 0 26px;
  font-size: var(--t-sm);
  color: var(--stone);
}
@media (max-width: 900px) {
  .cols {
    grid-template-columns: 1fr;
  }
  .env {
    order: -1;
  }
  .row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
