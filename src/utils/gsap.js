import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Tách tiêu đề thành từng dòng có mặt nạ, chữ trồi lên khi xuất hiện
export const splitLines = (el) =>
  SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true })

export { gsap, ScrollTrigger, SplitText }
