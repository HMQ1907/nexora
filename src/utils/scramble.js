const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFXZ'

// Hiệu ứng chữ "giải mã" kiểu terminal
export function scramble(el, finalText = el.dataset.text || el.textContent, duration = 900) {
  if (!el) return
  el.dataset.text = finalText
  const start = performance.now()
  const len = finalText.length
  cancelAnimationFrame(el._scr)
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const revealed = Math.floor(p * len)
    let out = ''
    for (let i = 0; i < len; i++) {
      const ch = finalText[i]
      if (i < revealed || ch === ' ') out += ch
      else out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
    }
    el.textContent = out
    if (p < 1) el._scr = requestAnimationFrame(tick)
  }
  el._scr = requestAnimationFrame(tick)
}

// Tách chữ thành từng ký tự (giữ nguyên từ để xuống dòng đúng)
export function splitChars(el) {
  const text = el.textContent
  el.setAttribute('aria-label', text)
  el.innerHTML = text
    .split(' ')
    .map(
      (w) =>
        `<span class="w" aria-hidden="true">${Array.from(w)
          .map((c) => `<span class="c"><span class="ci">${c}</span></span>`)
          .join('')}</span>`
    )
    .join(' ')
  return el.querySelectorAll('.ci')
}
