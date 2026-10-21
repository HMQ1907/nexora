<template>
  <section id="about" ref="root" class="section about">
    <div class="container">
      <p class="eyebrow" data-reveal>Về Nexora</p>
      <p ref="statement" class="statement">
        Nexora là studio số giúp doanh nghiệp sở hữu website không chỉ đẹp — mà còn khiến khách hàng nhớ, tin và hành
        động. Một đội ngũ, một quy trình khép kín, từ ý tưởng đầu tiên đến ngày ra mắt và xa hơn thế.
      </p>

      <div class="stats">
        <div v-for="(s, i) in stats" :key="i" class="stat" data-reveal>
          <div class="stat__val">
            <span class="num" :data-to="s.value">0</span><span class="suf">{{ s.suffix }}</span>
          </div>
          <p class="stat__label">{{ s.label }}</p>
          <span class="stat__idx">0{{ i + 1 }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { stats } from '../data'

const root = ref(null)
const statement = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // từng từ sáng dần theo cuộn
    const words = statement.value.textContent.trim().split(/\s+/)
    statement.value.innerHTML = words.map((w) => `<span class="sw">${w}</span>`).join(' ')
    gsap.fromTo(
      '.sw',
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: statement.value, start: 'top 80%', end: 'bottom 45%', scrub: true }
      }
    )
    // đếm số
    gsap.utils.toArray('.num').forEach((el) => {
      const o = { v: 0 }
      gsap.to(o, {
        v: +el.dataset.to,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => (el.textContent = Math.round(o.v))
      })
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.statement {
  margin-top: 32px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(24px, 3.6vw, 54px);
  line-height: 1.25;
  letter-spacing: -0.02em;
  max-width: 24em;
}
.statement :deep(.sw) { display: inline; }
.stats {
  margin-top: clamp(64px, 9vw, 120px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
}
.stat {
  position: relative;
  padding: 36px 28px 28px 0;
  border-right: 1px solid var(--line);
}
.stat + .stat { padding-left: 28px; }
.stat:last-child { border-right: 0; }
.stat__val {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(44px, 5vw, 76px);
  line-height: 1;
  letter-spacing: -0.03em;
}
.suf { color: var(--accent); font-size: 0.5em; margin-left: 4px; vertical-align: top; }
.stat__label { margin-top: 14px; color: var(--muted); font-size: 14px; max-width: 22ch; }
.stat__idx {
  position: absolute;
  top: 12px;
  right: 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
}
@media (max-width: 900px) {
  .stats { grid-template-columns: 1fr 1fr; }
  .stat, .stat + .stat { padding: 28px 16px; border-bottom: 1px solid var(--line); }
  .stat:nth-child(2n) { border-right: 0; }
}
</style>
