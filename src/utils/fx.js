import { reduced } from './gsap'

const GLYPHS = 'ABCDEFGHKLMNOPRSTUVXYZ0123456789#%&*+=<>/'

// Chữ "giải mã" kiểu terminal: ký tự ngẫu nhiên dần ổn định thành chữ thật
export function scramble(el, text = el.dataset.text || el.textContent, duration = 900) {
  if (!el) return
  el.dataset.text = text
  if (reduced()) {
    el.textContent = text
    return
  }
  cancelAnimationFrame(el._scr)
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const fixed = Math.floor(p * text.length)
    let out = ''
    for (let i = 0; i < text.length; i++) {
      const ch = text[i]
      out += i < fixed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
    }
    el.textContent = out
    if (p < 1) el._scr = requestAnimationFrame(tick)
  }
  el._scr = requestAnimationFrame(tick)
}

let seen = false
// Màn mở đầu chỉ chạy một lần mỗi phiên truy cập
export const loaderSeen = () => {
  if (seen) return true
  try {
    return sessionStorage.getItem('nexora-intro') === '1'
  } catch {
    return false
  }
}
export const markLoaderSeen = () => {
  seen = true
  try {
    sessionStorage.setItem('nexora-intro', '1')
  } catch {}
}
