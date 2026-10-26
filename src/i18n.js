import { computed, ref } from 'vue'
import { content, projectsBase } from './data'

const read = () => {
  try {
    return localStorage.getItem('nexora-lang')
  } catch {
    return null
  }
}

// Mặc định: theo lựa chọn trước đó, nếu chưa có thì theo ngôn ngữ trình duyệt
const saved = read()
export const lang = ref(saved === 'en' || saved === 'vi' ? saved : navigator.language?.toLowerCase().startsWith('vi') ? 'vi' : 'en')

export const t = computed(() => content[lang.value])

// Danh sách dự án đã ghép nội dung theo ngôn ngữ hiện tại
export const projects = computed(() => projectsBase.map((p) => ({ ...p, ...t.value.projects.items[p.slug] })))

export const applyLang = () => {
  const c = content[lang.value]
  document.documentElement.lang = lang.value
  document.title = c.meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', c.meta.description)
}

export const setLang = (l) => {
  lang.value = l
  try {
    localStorage.setItem('nexora-lang', l)
  } catch {}
  applyLang()
}
