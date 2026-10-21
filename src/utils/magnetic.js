import gsap from 'gsap'

// v-magnetic: phần tử bị "hút" nhẹ theo con trỏ
export const magnetic = {
  mounted(el, binding) {
    if (window.matchMedia('(hover: none)').matches) return
    const strength = binding.value ?? 0.35
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: 'power3.out' })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    el._mag = { move, leave }
  },
  unmounted(el) {
    if (!el._mag) return
    el.removeEventListener('mousemove', el._mag.move)
    el.removeEventListener('mouseleave', el._mag.leave)
  }
}
