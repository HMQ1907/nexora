<template>
  <!-- Người đứng sau Nexora: ảnh chân dung + lời giới thiệu ngắn -->
  <section id="founder" ref="root" class="section founder">
    <div class="container grid">
      <div class="photo">
        <div class="frame">
          <span class="mono" aria-hidden="true">HMQ</span>
          <!-- Đặt ảnh chân dung tại public/founder.jpg (khuyến nghị dọc 4:5, tối thiểu 900x1125) -->
          <img v-show="hasPhoto" :src="photo" :alt="t.founder.name" @load="hasPhoto = true" @error="hasPhoto = false" />
        </div>
        <span class="ring" aria-hidden="true"></span>
      </div>

      <div class="copy">
        <p class="label">{{ t.founder.label }}</p>
        <blockquote class="quote">{{ t.founder.quote }}</blockquote>
        <p class="who"><strong>{{ t.founder.name }}</strong><span>{{ t.founder.role }}</span></p>
        <p class="bio">{{ t.founder.bio }}</p>
        <ul class="points">
          <li v-for="pt in t.founder.points" :key="pt">{{ pt }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { t } from '../i18n'

const root = ref(null)
const hasPhoto = ref(false)
const photo = '/founder.jpg'
let ctx

onMounted(() => {
  if (reduced()) return
  ctx = gsap.context(() => {
    gsap
      .timeline({ scrollTrigger: { trigger: root.value, start: 'top 75%', once: true } })
      .from('.frame', { clipPath: 'inset(100% 0 0 0 round 24px)', duration: 1.4, ease: 'expo.inOut' })
      .from('.frame img, .mono', { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.3)
      .from('.ring', { scale: 0.6, opacity: 0, rotation: -40, duration: 1.4, ease: 'expo.out' }, 0.4)
      .from('.copy > *', { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }, 0.4)
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.founder.section {
  padding: clamp(88px, 8vw, 120px) 0;
  background: var(--night-2);
  border-top: 1px solid var(--line);
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(40px, 7vw, 120px);
  align-items: center;
}
.photo {
  position: relative;
  max-width: 440px;
}
.frame {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--line-2);
  background:
    radial-gradient(circle at 30% 20%, rgba(196, 164, 107, 0.25), transparent 60%),
    var(--surface);
}
.mono {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--serif);
  font-size: clamp(64px, 8vw, 120px);
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(196, 164, 107, 0.6);
}
.frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
}
/* Vòng tròn đồng trang trí ở góc */
.ring {
  position: absolute;
  right: -36px;
  bottom: -36px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid var(--brass);
  pointer-events: none;
}
.label {
  font-size: var(--t-sm);
  color: var(--brass);
}
.quote {
  margin-top: 18px;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(28px, 3vw, 46px);
  line-height: 1.22;
  max-width: 22em;
  text-wrap: pretty;
}
.who {
  display: flex;
  gap: 14px;
  align-items: baseline;
  margin-top: 28px;
}
.who strong {
  font-family: var(--serif);
  font-weight: 500;
  font-size: var(--t-lg);
}
.who span {
  font-size: var(--t-sm);
  color: var(--stone);
}
.bio {
  margin-top: 14px;
  max-width: 54ch;
  color: var(--stone);
}
.points {
  list-style: none;
  display: grid;
  gap: 10px;
  margin-top: 24px;
}
.points li {
  position: relative;
  padding-left: 26px;
}
.points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75em;
  width: 14px;
  height: 1px;
  background: var(--brass);
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .photo {
    max-width: 300px;
  }
  .ring {
    right: -20px;
    bottom: -20px;
    width: 80px;
    height: 80px;
  }
}
</style>
