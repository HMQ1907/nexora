# Nexora — Website giới thiệu công ty

Vue 3 + Vite · Three.js (khối cầu hạt 3D bằng shader) · GSAP + ScrollTrigger · Lenis (cuộn mượt)

## Chạy thử
```bash
npm install
npm run dev        # mở http://localhost:5173
```

## Đóng gói để đưa lên hosting
```bash
npm run build      # kết quả nằm trong thư mục dist/
```
Upload thư mục `dist/` lên bất kỳ hosting tĩnh nào (Vercel, Netlify, cPanel...).

## Sửa nội dung
Toàn bộ chữ, số điện thoại, email, địa chỉ, dịch vụ, quy trình và danh sách khách hàng nằm trong **`src/data.js`**.

## Ảnh dự án khách hàng
Trang tự lấy ảnh chụp trực tuyến của từng website. Để dùng ảnh của bạn (đẹp và ổn định hơn), đặt file vào
`public/projects/` với tên: `thanhhungphat.jpg`, `edubiz.jpg`, `ahtech.jpg`, `bmcpack.jpg` (khuyến nghị 1600×1000).

## Cấu trúc
- `src/components/HeroScene.vue` — cảnh 3D Three.js (hạt biến hình theo noise, phản ứng chuột)
- `src/components/Preloader.vue` — màn hình tải
- `src/components/Process.vue` — quy trình A → Z cuộn ngang
- `src/components/Projects.vue` — thẻ dự án xếp chồng
- `src/components/Contact.vue` — form liên hệ (mở email soạn sẵn; có thể nối API sau)
