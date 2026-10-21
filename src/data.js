// Toàn bộ nội dung của website — sửa tại đây.
export const contact = {
  phone: '0965649531',
  phoneDisplay: '0965 649 531',
  email: 'info@nexora.com',
  address: '127 Ngô Thì Nhậm, phường Dĩ An, TP. Hồ Chí Minh',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('127 Ngô Thì Nhậm, Dĩ An, Hồ Chí Minh')
}

export const nav = [
  { label: 'Dịch vụ', href: '#services' },
  { label: 'Quy trình', href: '#process' },
  { label: 'Dự án', href: '#work' },
  { label: 'Liên hệ', href: '#contact' }
]

export const stats = [
  { value: 4, suffix: '+', label: 'Doanh nghiệp đã đồng hành' },
  { value: 6, suffix: '', label: 'Bước quy trình khép kín A → Z' },
  { value: 100, suffix: '%', label: 'Mã nguồn tuỳ biến, không template' },
  { value: 60, suffix: 'fps', label: 'Hiệu ứng mượt trên mọi thiết bị' }
]

export const services = [
  {
    code: 'S/01',
    title: 'Chiến lược & Thương hiệu số',
    desc: 'Phân tích thị trường, định vị thương hiệu, kiến trúc nội dung và hành trình khách hàng trước khi vẽ pixel đầu tiên.',
    tags: ['Discovery', 'Brand', 'Sitemap']
  },
  {
    code: 'S/02',
    title: 'Thiết kế UI/UX',
    desc: 'Giao diện độc bản theo xu hướng mới nhất, wireframe → prototype tương tác trên Figma, tối ưu chuyển đổi.',
    tags: ['Figma', 'Prototype', 'Design System']
  },
  {
    code: 'S/03',
    title: 'Lập trình Web & Ứng dụng',
    desc: 'Vue, Nuxt, React, Node.js — mã nguồn sạch, tải nhanh, chuẩn SEO, dễ mở rộng và quản trị.',
    tags: ['Vue / Nuxt', 'React', 'API']
  },
  {
    code: 'S/04',
    title: '3D, Motion & WebGL',
    desc: 'Hiệu ứng Three.js, GSAP, cuộn điện ảnh — biến website thành trải nghiệm khiến khách hàng phải dừng lại.',
    tags: ['Three.js', 'GSAP', 'Shader']
  },
  {
    code: 'S/05',
    title: 'Thương mại điện tử & CMS',
    desc: 'Website bán hàng, landing page chiến dịch, hệ thống quản trị nội dung giúp bạn tự cập nhật dễ dàng.',
    tags: ['E-commerce', 'Headless CMS', 'Landing']
  },
  {
    code: 'S/06',
    title: 'Vận hành, SEO & Bảo trì',
    desc: 'Tên miền, hosting, bảo mật, tối ưu tốc độ, SEO và đồng hành nâng cấp lâu dài sau khi bàn giao.',
    tags: ['Hosting', 'SEO', 'Care']
  }
]

export const process = [
  { step: 'A', title: 'Khám phá', desc: 'Lắng nghe mục tiêu, khách hàng và đối thủ của bạn. Chốt phạm vi, ngân sách và tiến độ rõ ràng.', time: 'Tuần 1' },
  { step: 'B', title: 'Chiến lược', desc: 'Kiến trúc thông tin, sitemap, nội dung chủ đạo và định hướng hình ảnh cho toàn bộ dự án.', time: 'Tuần 1–2' },
  { step: 'C', title: 'Thiết kế', desc: 'Moodboard → wireframe → UI hoàn chỉnh và prototype chuyển động để bạn duyệt trước khi code.', time: 'Tuần 2–4' },
  { step: 'D', title: 'Lập trình', desc: 'Xây dựng front-end, back-end, hiệu ứng 3D/motion, tích hợp CMS và các hệ thống bạn đang dùng.', time: 'Tuần 4–7' },
  { step: 'E', title: 'Kiểm thử', desc: 'Kiểm tra trên mọi thiết bị và trình duyệt, tối ưu tốc độ, SEO kỹ thuật và bảo mật.', time: 'Tuần 7–8' },
  { step: 'Z', title: 'Ra mắt & Đồng hành', desc: 'Triển khai lên môi trường thật, bàn giao, hướng dẫn quản trị và hỗ trợ phát triển dài hạn.', time: 'Từ tuần 8' }
]

export const projects = [
  {
    slug: 'thanhhungphat',
    name: 'Thành Hưng Phát',
    url: 'https://thanhhungphat.com/',
    domain: 'thanhhungphat.com',
    industry: 'Năng lượng · Nhiên liệu công nghiệp',
    desc: 'Website doanh nghiệp cho nhà cung cấp than đá, nhiên liệu sinh khối cho lò hơi công nghiệp trên toàn quốc.',
    hue: 28
  },
  {
    slug: 'edubiz',
    name: 'Edubiz Media',
    url: 'https://earlychildhoodeducation.vercel.app/',
    domain: 'earlychildhoodeducation.vercel.app',
    industry: 'Truyền thông · Giáo dục',
    desc: 'Landing page cho đơn vị truyền thông giáo dục: sản xuất video, phim hoạt hình AI và xây dựng thương hiệu trường học.',
    hue: 320
  },
  {
    slug: 'ahtech',
    name: 'AHTECH',
    url: 'https://www.ahtechnology.vn/',
    domain: 'ahtechnology.vn',
    industry: 'Công nghệ · Chuyển đổi số',
    desc: 'Website cho đối tác chuyển đổi số: hạ tầng, phần mềm, điện toán đám mây và an ninh mạng cho doanh nghiệp.',
    hue: 205
  },
  {
    slug: 'bmcpack',
    name: 'BMC PACK',
    url: 'https://bmc-five-delta.vercel.app/#/',
    domain: 'bmc-five-delta.vercel.app',
    industry: 'Sản xuất · Máy móc bao bì',
    desc: 'Website giới thiệu dây chuyền sản xuất bao bì carton sóng 4.0, phục vụ khách hàng tại hơn 40 quốc gia.',
    hue: 150
  }
]

export const tech = ['Vue 3', 'Nuxt', 'React', 'Three.js', 'GSAP', 'WebGL', 'Figma', 'Node.js', 'TypeScript', 'Tailwind', 'Vite', 'Headless CMS']
