<template>
  <!-- Đội ngũ Nexora: ảnh chân dung + giới thiệu từng người -->
  <section id="team" ref="root" class="section team">
    <div class="container">
      <div class="head">
        <div>
          <p class="label">{{ t.founder.label }}</p>
          <h2 class="h2">{{ t.founder.title }}</h2>
        </div>
        <p class="lead">{{ t.founder.lead }}</p>
      </div>

      <ul class="members">
        <li v-for="(m, i) in t.founder.members" :key="m.name" class="member">
          <div class="frame">
            <span class="mono" aria-hidden="true">{{ initials(m.name) }}</span>
            <!-- Ảnh đặt trong thư mục public/, khổ dọc 4:5 -->
            <img :class="{ ok: loaded[i] }" :src="m.photo" :alt="m.name" loading="lazy" @load="loaded[i] = true" @error="loaded[i] = false" />
          </div>
          <div class="info">
            <h3>{{ m.name }}</h3>
            <p class="role">{{ m.role }}</p>
            <p class="bio">{{ m.bio }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import { gsap, reduced } from '../utils/gsap'
import { t } from '../i18n'

const root = ref(null)
const loaded = reactive({})
const initials = (n) =>
  n
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
let ctx

onMounted(() => {
  if (reduced()) return
  ctx = gsap.context(() => {
    gsap.from('.head > *', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.head', start: 'top 82%', once: true }
    })
    gsap.utils.toArray('.member').forEach((m, i) => {
      gsap
        .timeline({ scrollTrigger: { trigger: m, start: 'top 82%', once: true }, delay: i * 0.12 })
        .from(m.querySelector('.frame'), { clipPath: 'inset(100% 0 0 0 round 20px)', duration: 1.3, ease: 'expo.inOut' })
        .from(m.querySelectorAll('.frame img, .mono'), { scale: 1.25, duration: 1.6, ease: 'expo.out' }, 0.3)
        .from(m.querySelectorAll('.info > *'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' }, 0.5)
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.team.section {
  padding: clamp(88px, 8vw, 120px) 0;
  background: var(--night-2);
  border-top: 1px solid var(--line);
}
.head {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 40px;
  align-items: end;
  margin-bottom: clamp(32px, 4vw, 56px);
}
.label {
  font-size: var(--t-sm);
  color: var(--brass);
  margin-bottom: 14px;
}
.head .h2 {
  font-size: clamp(32px, 3.4vw, 54px);
  max-width: 18em;
}
.members {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(24px, 3vw, 48px);
}
.member {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
  gap: clamp(20px, 2.4vw, 32px);
  align-items: end;
}
.frame {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 20px;
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
  font-size: clamp(48px, 5vw, 80px);
  font-weight: 300;
  color: rgba(196, 164, 107, 0.6);
}
.frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  opacity: 0;
  transition: transform 1.2s var(--ease), opacity 0.6s;
}
.frame img.ok {
  opacity: 1;
}
.member:hover .frame img {
  transform: scale(1.04);
}
.info h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(26px, 2.4vw, 36px);
  line-height: 1.1;
}
.role {
  margin-top: 6px;
  font-size: var(--t-sm);
  color: var(--brass);
}
.bio {
  margin-top: 14px;
  font-size: 15px;
  line-height: 1.65;
  color: var(--stone);
}
@media (max-width: 1100px) {
  .members {
    grid-template-columns: 1fr;
  }
  .member {
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
    align-items: center;
  }
}
@media (max-width: 900px) {
  .head {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
@media (max-width: 560px) {
  .member {
    grid-template-columns: 1fr;
  }
  .frame {
    max-width: 280px;
  }
}
</style>
