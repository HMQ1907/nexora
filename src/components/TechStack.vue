<template>
  <section id="stack" ref="root" class="section stack">
    <div class="container">
      <div class="head">
        <div>
          <p class="eyebrow" data-reveal>Tech Stack</p>
          <h2 class="h-display" data-reveal>Công nghệ <em>hiện đại</em> cho mọi quy mô.</h2>
        </div>
        <p class="lead" data-reveal>
          Đúng công nghệ cho đúng bài toán — từ landing page, website doanh nghiệp đến hệ thống nội bộ và ứng dụng
          di động, toàn bộ front-end lẫn back-end.
        </p>
      </div>

      <div class="layout">
        <!-- Nhóm công nghệ -->
        <div class="tabs" role="tablist" aria-label="Nhóm công nghệ" data-reveal>
          <button
            v-for="g in groups"
            :key="g.id"
            role="tab"
            class="tab"
            :class="{ on: active === g.id }"
            :aria-selected="active === g.id"
            @click="select(g.id)"
          >
            <span class="tab__label">{{ g.label }}</span>
            <span class="tab__desc">{{ g.desc }}</span>
            <span class="tab__count">{{ String(count(g.id)).padStart(2, '0') }}</span>
          </button>
        </div>

        <!-- Lưới công nghệ -->
        <div ref="grid" class="grid">
          <div
            v-for="t in stack"
            v-show="active === 'all' || t.group === active"
            :key="t.name"
            class="tile"
            :data-flip-id="t.name"
            @pointermove="spot"
          >
            <span class="abbr">{{ t.abbr }}</span>
            <span class="name">{{ t.name }}</span>
            <span class="note">{{ t.note }}</span>
            <span class="grp">{{ labelOf(t.group) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stack, stackGroups } from '../data'

gsap.registerPlugin(Flip)

const groups = [{ id: 'all', label: 'Tất cả', desc: 'Toàn bộ hệ sinh thái Nexora sử dụng' }, ...stackGroups]
const root = ref(null)
const grid = ref(null)
const active = ref('all')
const count = (id) => (id === 'all' ? stack.length : stack.filter((t) => t.group === id).length)
const labelOf = (id) => stackGroups.find((g) => g.id === id)?.label

// Lọc với hiệu ứng GSAP Flip
const select = async (id) => {
  if (id === active.value) return
  const tiles = grid.value.querySelectorAll('.tile')
  const state = Flip.getState(tiles)
  active.value = id
  await nextTick()
  Flip.from(state, {
    duration: 0.7,
    ease: 'expo.inOut',
    stagger: 0.012,
    absolute: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out', delay: 0.15 }),
    onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.6, duration: 0.35 }),
    onComplete: () => ScrollTrigger.refresh()
  })
}

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

let ctx
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.tile', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.9,
      ease: 'expo.out',
      stagger: { each: 0.025, grid: 'auto', from: 'start' },
      scrollTrigger: { trigger: grid.value, start: 'top 85%', once: true }
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.head {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: end;
  margin-bottom: clamp(48px, 7vw, 88px);
}
.head .h-display { margin-top: 20px; font-size: clamp(32px, 4.6vw, 68px); }
.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
}
.tabs {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
}
.tab {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px 12px;
  text-align: left;
  padding: 16px 0 16px 18px;
  background: none;
  border: 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  color: var(--muted);
  transition: color 0.3s, padding 0.5s var(--ease);
}
.tab::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 6px;
  margin-top: -3px;
  background: var(--line-2);
  transition: background 0.3s, box-shadow 0.3s;
}
.tab:hover { color: var(--text); }
.tab.on { color: var(--text); padding-left: 26px; }
.tab.on::before { background: var(--accent); box-shadow: 0 0 12px var(--accent); }
.tab__label { font-family: var(--font-display); font-size: 17px; font-weight: 600; }
.tab__desc { grid-column: 1; font-size: 13px; color: var(--muted); font-weight: 300; }
.tab__count {
  grid-row: 1 / span 2;
  grid-column: 2;
  align-self: center;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}
.tab.on .tab__count { color: var(--accent); }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  position: relative;
}
.tile {
  --mx: 50%;
  --my: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 150px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background:
    radial-gradient(220px circle at var(--mx) var(--my), rgba(200, 255, 46, 0.09), transparent 60%),
    var(--surface);
  overflow: hidden;
  transition: border-color 0.3s, transform 0.5s var(--ease);
}
.tile:hover { border-color: rgba(200, 255, 46, 0.5); }
.abbr {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 1px solid var(--line-2);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.02em;
  margin-bottom: auto;
  transition: background 0.4s, color 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.tile:hover .abbr {
  background: var(--accent);
  color: var(--accent-ink);
  border-color: var(--accent);
  box-shadow: 0 0 24px rgba(200, 255, 46, 0.35);
}
.name { margin-top: 18px; font-weight: 600; font-size: 15px; line-height: 1.3; }
.note { font-size: 12px; color: var(--muted); font-weight: 300; }
.grp {
  position: absolute;
  top: 14px;
  right: 14px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.7;
}

@media (max-width: 900px) {
  .head { grid-template-columns: 1fr; }
  .layout { grid-template-columns: 1fr; }
  .tabs {
    position: static;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    border: 0;
    margin: 0 calc(-1 * var(--pad));
    padding: 0 var(--pad) 4px;
    scrollbar-width: none;
  }
  .tabs::-webkit-scrollbar { display: none; }
  .tab {
    flex: none;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 10px 16px;
    border: 1px solid var(--line-2);
    border-radius: 999px;
  }
  .tab.on { padding-left: 16px; background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
  .tab::before, .tab__desc { display: none; }
  .tab__label { font-size: 13px; }
  .tab.on .tab__count { color: var(--accent-ink); }
  .grid { grid-template-columns: repeat(2, 1fr); }
  .tile { min-height: 132px; }
}
</style>
