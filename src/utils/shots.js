import { reactive } from 'vue'
import { projectsBase as projects } from '../data'

// Ảnh chụp website: ưu tiên ảnh trong public/projects/<slug>.jpg,
// nếu không có thì lấy ảnh chụp trực tuyến (mshots), lỗi nữa thì hiện khung màu.
export const shotState = reactive(Object.fromEntries(projects.map((p) => [p.slug, 'local'])))

const remote = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1440&h=2400`

export const shotSrc = (p) => (shotState[p.slug] === 'local' ? `/projects/${p.slug}.jpg` : remote(p.url))

export const onShotError = (p) => {
  shotState[p.slug] = shotState[p.slug] === 'local' ? 'remote' : 'failed'
}

// mshots trả ảnh chờ nhỏ khi đang tạo ảnh; thử lại vài lần
export const onShotLoad = (e, p) => {
  const img = e.target
  const tries = +(img.dataset.tries || 0)
  if (shotState[p.slug] === 'remote' && img.naturalWidth < 500 && tries < 4) {
    img.dataset.tries = tries + 1
    setTimeout(() => (img.src = remote(p.url) + '&r=' + Date.now()), 4000)
  }
}
