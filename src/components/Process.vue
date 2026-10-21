<template>
  <section id="process" ref="root" class="process">
    <div ref="pin" class="pin">
      <div class="container intro">
        <div>
          <p class="eyebrow">Quy trình</p>
          <h2 class="h-display">Từ ý tưởng đến ra mắt — <em>A → Z.</em></h2>
        </div>
        <div class="progress">
          <span class="progress__num"><span ref="cur">A</span> / Z</span>
          <span class="progress__bar"><span ref="fill"></span></span>
        </div>
      </div>

      <div ref="track" class="track">
        <article v-for="(p, i) in process" :key="p.step" class="step">
          <div class="step__letter">{{ p.step }}</div>
          <div class="step__body">
            <div class="step__meta">
              <span>0{{ i + 1 }}</span><span>{{ p.time }}</span>
            </div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
          </div>
          <span class="node"></span>
        </article>
        <div class="track__line"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { process } from '../data'

const root = ref(null)
const pin = ref(null)
const track = ref(null)
const fill = ref(null)
const cur = ref(null)
let mm

onMounted(() => {
  mm = gsap.matchMedia()
  // Desktop: cuộn ngang được ghim
  mm.add('(min-width: 901px)', () => {
    const steps = gsap.utils.toArray('.step', root.value)
    const dist = () => track.value.scrollWidth - window.innerWidth
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => '+=' + dist(),
        pin: pin.value,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
          cur.value.textContent = process[idx].step
          steps.forEach((s, i) => s.classList.toggle('active', i <= idx))
        }
      }
    })
    tl.to(track.value, { x: () => -dist(), ease: 'none' }, 0)
      .fromTo(fill.value, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
    steps.forEach((s) => {
      gsap.fromTo(
        s.querySelector('.step__letter'),
        { yPercent: 30 },
        {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: s, containerAnimation: tl, start: 'left right', end: 'right left', scrub: true }
        }
      )
    })
  })
  // Mobile: danh sách dọc
  mm.add('(max-width: 900px)', () => {
    gsap.utils.toArray('.step', root.value).forEach((s) => {
      gsap.fromTo(s, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: s, start: 'top 85%', onEnter: () => s.classList.add('active') }
      })
    })
  })
})
onBeforeUnmount(() => mm?.revert())
</script>

<style scoped>
.process {
  position: relative;
  background: var(--bg-2);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.pin {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  gap: clamp(32px, 6vh, 72px);
}
.intro {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
}
.intro .h-display { margin-top: 20px; font-size: clamp(32px, 4.6vw, 68px); max-width: 12em; }
.progress { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; min-width: 220px; }
.progress__num { font-family: var(--font-mono); font-size: 13px; color: var(--muted); letter-spacing: 0.12em; }
.progress__num span { color: var(--accent); }
.progress__bar { width: 220px; height: 1px; background: var(--line-2); }
.progress__bar span {
  display: block;
  height: 100%;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
  box-shadow: 0 0 10px var(--accent);
}
.track {
  position: relative;
  display: flex;
  gap: 0;
  width: max-content;
  padding: 0 var(--pad);
}
.track__line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: var(--line-2);
}
.step {
  position: relative;
  width: clamp(340px, 30vw, 460px);
  padding: 40px 48px 0 0;
  flex: none;
}
.node {
  position: absolute;
  top: -6px;
  left: 0;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 1px solid var(--line-2);
  background: var(--bg-2);
  transition: background 0.4s, box-shadow 0.4s, border-color 0.4s;
  z-index: 1;
}
.step.active .node { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 16px var(--accent); }
.step__letter {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(120px, 16vw, 240px);
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.18);
  transition: -webkit-text-stroke-color 0.6s, color 0.6s;
  margin-bottom: 24px;
}
.step.active .step__letter { -webkit-text-stroke-color: var(--accent); }
.step__meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 18px;
}
.step h3 { font-family: var(--font-display); font-weight: 600; font-size: 26px; margin-bottom: 10px; }
.step p { color: var(--muted); font-weight: 300; font-size: 15px; max-width: 34ch; }

@media (max-width: 900px) {
  .pin { height: auto; padding: 96px 0; }
  .intro { flex-direction: column; align-items: flex-start; }
  .progress { display: none; }
  .track { flex-direction: column; width: 100%; gap: 48px; }
  .track__line { left: var(--pad); right: auto; top: 0; bottom: 0; width: 1px; height: auto; }
  .step { width: 100%; padding: 0 0 0 32px; }
  .node { top: 18px; left: -5px; }
  .step__letter { font-size: 96px; margin-bottom: 12px; }
}
</style>
