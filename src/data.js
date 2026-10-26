// Toàn bộ nội dung website (tiếng Việt + tiếng Anh) — sửa tại đây.

// Số điện thoại KHÔNG hiển thị trên trang, chỉ dùng để tạo link mở Zalo.
export const contact = {
  zaloUrl: 'https://zalo.me/0965649531',
  // Nơi nhận form. Để trống formKey: form sẽ soạn sẵn nội dung và mở Zalo.
  // Muốn nhận thẳng vào email: đăng ký miễn phí tại web3forms.com, dán access key vào formKey.
  formEndpoint: 'https://api.web3forms.com/submit',
  formKey: ''
}

// Thông tin chung của dự án (không đổi theo ngôn ngữ)
export const projectsBase = [
  { slug: 'thanhhungphat', url: 'https://thanhhungphat.com/', domain: 'thanhhungphat.com', hue: 28 },
  { slug: 'edubiz', url: 'https://earlychildhoodeducation.vercel.app/', domain: 'earlychildhoodeducation.vercel.app', hue: 320 },
  { slug: 'ahtech', url: 'https://www.ahtechnology.vn/', domain: 'ahtechnology.vn', hue: 205 },
  { slug: 'bmcpack', url: 'https://bmc-five-delta.vercel.app/#/', domain: 'bmc-five-delta.vercel.app', hue: 150 }
]


// start/end: ngày bắt đầu và kết thúc của từng bước (dự án 14 ngày)
const days = [
  [1, 1],
  [1, 2],
  [2, 5],
  [5, 11],
  [11, 13],
  [14, 14]
]

export const content = {
  vi: {
    meta: {
      title: 'Nexora — Thiết kế website mang dấu ấn thương hiệu',
      description: 'Nexora thiết kế website riêng cho doanh nghiệp: bất động sản, công nghệ, nhà hàng F&B, spa, giáo dục, sản xuất... Hoàn thiện chỉ trong 1–2 tuần.'
    },
    ui: {
      skip: 'Bỏ qua đến nội dung',
      home: 'Nexora, về đầu trang',
      menuOpen: 'Mở menu',
      menuClose: 'Đóng menu',
      lang: 'Ngôn ngữ',
      mainNav: 'Điều hướng chính',
      quote: 'Nhận báo giá',
      work: 'Xem dự án',
      zaloShort: 'Zalo',
      zaloAria: 'Nhắn Nexora qua Zalo',
      top: 'Lên đầu trang'
    },
    nav: [
      { label: 'Dịch vụ', href: '#services' },
      { label: 'Lĩnh vực', href: '#industries' },
      { label: 'Dự án', href: '#work' },
      { label: 'Quy trình', href: '#process' },
      { label: 'Liên hệ', href: '#contact' }
    ],
    hero: {
      title: 'Thương hiệu của bạn, kể bằng một website.',
      lead: 'Nexora thiết kế và xây dựng website riêng cho từng doanh nghiệp, từ ý tưởng, giao diện đến vận hành. Hoàn thiện chỉ trong 1–2 tuần.',
      ring: 'ý tưởng ✦ thiết kế ✦ xây dựng ✦ vận hành ✦ ý tưởng ✦ thiết kế ✦ xây dựng ✦ vận hành ✦',
      clients: 'Hơn 30 doanh nghiệp đã tin chọn Nexora, trong đó có',
      others: 'và nhiều thương hiệu khác.',
      scroll: 'Cuộn để khám phá'
    },
    marks: ['Giới thiệu', 'Lĩnh vực', 'Dịch vụ', 'Quy trình', 'Dự án', 'Liên hệ'],
    intro: {
      statement:
        'Một website tốt không chỉ đẹp. Nó khiến khách hàng nhớ đến bạn, tin bạn và chủ động liên hệ. Nexora làm việc như một xưởng may đo: lắng nghe, đo đạc kỹ, rồi mới bắt tay vào cắt may.',
      stats: [
        { value: 30, suffix: '+', unit: 'doanh nghiệp', label: 'ở nhiều lĩnh vực đã tin chọn Nexora làm website' },
        { value: 14, unit: 'ngày', label: 'là thời gian tối đa từ buổi gặp đầu tiên đến khi website sẵn sàng đón khách' },
        { value: 100, unit: '%', label: 'thiết kế riêng cho thương hiệu của bạn, không dùng mẫu có sẵn' }
      ]
    },
    industries: {
      title: 'Mỗi ngành một website riêng.',
      lead: 'Dù bạn bán căn hộ, cà phê hay liệu trình spa, Nexora hiểu khách hàng của bạn cần thấy gì trước khi liên hệ.',
      // icon: building | chip | cup | lotus | bed | cap | factory | bag
      items: [
        { icon: 'building', name: 'Bất động sản', desc: 'Trang dự án, bảng giá, mặt bằng, tiến độ và form đăng ký nhận thông tin cho từng dự án.' },
        { icon: 'chip', name: 'Công ty công nghệ', desc: 'Giới thiệu sản phẩm, giải pháp và đội ngũ rõ ràng, chuyên nghiệp, dễ thuyết phục đối tác.' },
        { icon: 'cup', name: 'Nhà hàng & F&B', desc: 'Thực đơn đẹp mắt, đặt bàn, đặt món và chỉ đường đến quán chỉ trong vài chạm.' },
        { icon: 'lotus', name: 'Spa & làm đẹp', desc: 'Bảng dịch vụ, bảng giá, đặt lịch hẹn và hình ảnh không gian thư giãn, sang trọng.' },
        { icon: 'bed', name: 'Khách sạn & du lịch', desc: 'Giới thiệu phòng, tour, thư viện ảnh và nhận đặt chỗ trực tiếp không qua trung gian.' },
        { icon: 'cap', name: 'Giáo dục & đào tạo', desc: 'Khóa học, lịch khai giảng, giảng viên và form đăng ký học cho phụ huynh, học viên.' },
        { icon: 'factory', name: 'Sản xuất & công nghiệp', desc: 'Năng lực sản xuất, danh mục sản phẩm và hồ sơ doanh nghiệp cho khách trong và ngoài nước.' },
        { icon: 'bag', name: 'Bán lẻ & cửa hàng online', desc: 'Cửa hàng online có giỏ hàng, thanh toán, khuyến mãi và quản lý đơn hàng.' }
      ],
      more: 'Ngành của bạn chưa có ở đây? Nexora vẫn làm được.',
      moreCta: 'Hỏi Nexora'
    },
    benefits: ['Đẹp trên mọi màn hình', 'Tải nhanh', 'Dễ tìm trên Google', 'Tự cập nhật nội dung', 'Thu hút khách liên hệ', 'Hoàn thiện trong 1–2 tuần'],
    services: {
      title: 'Mọi thứ website của bạn cần, trong một xưởng.',
      lead: 'Một đầu mối cho toàn bộ dự án. Bạn tập trung kinh doanh, phần website để Nexora lo.',
      items: [
        { title: 'Chiến lược & nhận diện số', desc: 'Tìm hiểu khách hàng và đối thủ của bạn, định vị thương hiệu và lên bố cục nội dung trước khi bắt tay thiết kế.', tags: ['Khảo sát', 'Định vị', 'Sơ đồ trang'] },
        { title: 'Thiết kế giao diện', desc: 'Giao diện riêng theo thương hiệu, đẹp trên cả điện thoại lẫn máy tính, dẫn khách đến nút liên hệ.', tags: ['Thiết kế riêng', 'Đẹp trên mobile', 'Duyệt bản demo'] },
        { title: 'Xây dựng website', desc: 'Website tải nhanh, dễ tìm trên Google. Bạn tự sửa chữ, ảnh, bài viết mà không cần biết kỹ thuật.', tags: ['Tải nhanh', 'Chuẩn SEO', 'Tự quản trị'] },
        { title: 'Hiệu ứng & trải nghiệm', desc: 'Chuyển động tinh tế, cuộn mượt, hình ảnh ấn tượng khiến khách dừng lại lâu hơn và nhớ đến bạn.', tags: ['Hiệu ứng', 'Hình ảnh', 'Ấn tượng'] },
        { title: 'Bán hàng online & landing page', desc: 'Cửa hàng online, trang khuyến mãi cho từng chiến dịch, nhận đơn, đặt lịch và thanh toán.', tags: ['Giỏ hàng', 'Đặt lịch', 'Landing page'] },
        { title: 'Vận hành, SEO & bảo trì', desc: 'Tên miền, hosting, bảo mật, tốc độ, SEO và đồng hành nâng cấp lâu dài sau khi bàn giao.', tags: ['Tên miền & hosting', 'SEO', 'Bảo trì'] }
      ]
    },
    founder: {
      label: 'Đội ngũ Nexora',
      title: 'Một người làm website thật đẹp, một người đưa khách hàng đến với nó.',
      lead: 'Bạn làm việc trực tiếp với những người làm ra website của mình, từ buổi gặp đầu tiên đến sau khi bàn giao.',
      members: [
        {
          photo: '/team-quang.jpg',
          name: 'Hồ Minh Quang',
          role: 'Nhà sáng lập, phụ trách thiết kế & xây dựng website',
          bio: 'Hơn 5 năm thiết kế và xây dựng hệ thống thương mại điện tử cho thị trường Nhật Bản, nơi đòi hỏi khắt khe về chất lượng và từng chi tiết. Trực tiếp thực hiện website cho Thành Hưng Phát, AH Technology và nhiều doanh nghiệp khác.'
        },
        {
          photo: '/team-hoang.jpg',
          name: 'Phạm Huy Hoàng',
          role: 'Phụ trách quảng cáo, marketing & SEO',
          bio: 'Hơn 7 năm làm quảng cáo, marketing và SEO website. Giúp website không chỉ đẹp mà còn có khách tìm đến: lên top Google, chạy quảng cáo hiệu quả và đo lường từng lượt liên hệ.'
        }
      ]
    },
    process: {
      title: 'Hai tuần, từ ý tưởng đến website hoàn chỉnh.',
      lead: 'Sáu bước rõ ràng. Mỗi bước có kết quả để bạn duyệt trước khi đi tiếp.',
      day: 'Ngày',
      steps: [
        { step: 'A', title: 'Khám phá', time: 'Ngày 1', desc: 'Lắng nghe mục tiêu, khách hàng và đối thủ của bạn. Chốt phạm vi, ngân sách và tiến độ.' },
        { step: 'B', title: 'Chiến lược', time: 'Ngày 1–2', desc: 'Kiến trúc thông tin, sơ đồ trang, nội dung chủ đạo và định hướng hình ảnh.' },
        { step: 'C', title: 'Thiết kế', time: 'Ngày 2–5', desc: 'Phác thảo phong cách, giao diện hoàn chỉnh và bản demo để bạn duyệt trước khi xây dựng.' },
        { step: 'D', title: 'Xây dựng', time: 'Ngày 5–11', desc: 'Dựng website hoàn chỉnh, thêm hiệu ứng, kết nối form, Zalo, bản đồ và công cụ bạn đang dùng.' },
        { step: 'E', title: 'Kiểm thử', time: 'Ngày 11–13', desc: 'Kiểm tra trên mọi điện thoại và máy tính, tối ưu tốc độ, SEO và bảo mật.' },
        { step: 'Z', title: 'Ra mắt & đồng hành', time: 'Ngày 14', desc: 'Chính thức ra mắt website, bàn giao, hướng dẫn quản trị và hỗ trợ dài hạn.' }
      ]
    },
    projects: {
      title: 'Dự án tiêu biểu.',
      note: 'Một vài trong số hơn 30 website Nexora đã thực hiện cho doanh nghiệp ở nhiều lĩnh vực.',
      open: 'Mở website',
      scopeLabel: 'Hạng mục đã làm',
      // scope: hạng mục đã làm cho từng dự án — sửa riêng cho đúng thực tế
      items: {
        thanhhungphat: { name: 'Thành Hưng Phát', industry: 'Năng lượng, nhiên liệu công nghiệp', desc: 'Website doanh nghiệp cho nhà cung cấp than đá, nhiên liệu sinh khối cho lò hơi công nghiệp trên toàn quốc.', scope: ['Thiết kế', 'Website', 'Mobile', 'SEO'] },
        edubiz: { name: 'Edubiz Media', industry: 'Truyền thông, giáo dục', desc: 'Landing page cho đơn vị truyền thông giáo dục: sản xuất video, phim hoạt hình AI và xây dựng thương hiệu trường học.', scope: ['Thiết kế', 'Website', 'Mobile', 'SEO'] },
        ahtech: { name: 'AHTECH', industry: 'Công nghệ, chuyển đổi số', desc: 'Website cho đối tác chuyển đổi số: hạ tầng, phần mềm, điện toán đám mây và an ninh mạng cho doanh nghiệp.', scope: ['Thiết kế', 'Website', 'Mobile', 'SEO'] },
        bmcpack: { name: 'BMC PACK', industry: 'Sản xuất, máy móc bao bì', desc: 'Website giới thiệu dây chuyền sản xuất bao bì carton sóng 4.0, phục vụ khách hàng tại hơn 40 quốc gia.', scope: ['Thiết kế', 'Website', 'Mobile', 'SEO'] }
      }
    },
    contact: {
      title: 'Kể cho Nexora nghe về website bạn muốn.',
      lead: 'Điền vài thông tin, Nexora sẽ liên hệ lại trong một ngày làm việc. Muốn trao đổi nhanh hơn, hãy nhắn qua Zalo.',
      zaloTitle: 'Nhắn Nexora qua Zalo',
      zaloNote: 'Mở cuộc trò chuyện trong ứng dụng Zalo',
      officeLabel: 'Văn phòng',
      office: '127 Ngô Thì Nhậm, phường Dĩ An, TP. Hồ Chí Minh',
      hoursLabel: 'Giờ làm việc',
      hours: 'Thứ 2 – Thứ 7, 8:00 – 18:00',
      formTitle: 'Nhận tư vấn & báo giá miễn phí',
      formNote: 'Điền thông tin, Nexora gọi lại trong một ngày làm việc.',
      needsLabel: 'Bạn cần gì?',
      needsHint: 'Chọn một hoặc nhiều',
      needs: ['Website doanh nghiệp', 'Landing page', 'Bán hàng online', 'Đặt lịch / đặt bàn', 'Làm lại website cũ', 'Bảo trì & SEO'],
      name: 'Họ và tên',
      phone: 'Số điện thoại hoặc Zalo của bạn',
      company: 'Công ty hoặc thương hiệu',
      message: 'Mô tả ngắn về dự án',
      optional: 'không bắt buộc',
      placeholder: 'Ví dụ: website giới thiệu công ty, khoảng 6 trang, có tiếng Anh',
      submit: 'Gửi yêu cầu',
      sending: 'Đang gửi…',
      errName: 'Nhập họ và tên để Nexora biết cách xưng hô.',
      errPhone: 'Nhập số điện thoại gồm 9 đến 12 chữ số.',
      errSend: 'Chưa gửi được yêu cầu. Kiểm tra kết nối mạng rồi thử lại, hoặc nhắn Nexora qua Zalo.',
      sentTitle: 'Đã nhận yêu cầu của bạn.',
      sentText: 'Nexora sẽ liên hệ lại trong một ngày làm việc qua số bạn đã để lại.',
      copiedTitle: 'Nội dung đã được sao chép.',
      copiedText: 'Dán vào khung chat Zalo vừa mở rồi bấm gửi. Nexora sẽ trả lời trong một ngày làm việc.',
      openedTitle: 'Zalo đã được mở.',
      openedText: 'Hãy gửi cho Nexora vài dòng về dự án của bạn trong khung chat Zalo.',
      reopen: 'Mở lại Zalo',
      another: 'Gửi yêu cầu khác',
      msg: {
        intro: 'Chào Nexora, tôi muốn trao đổi về dự án website.',
        subject: 'Yêu cầu dự án mới',
        name: 'Họ tên',
        phone: 'Điện thoại',
        company: 'Công ty',
        needs: 'Nhu cầu',
        message: 'Mô tả'
      }
    },
    footer: {
      tag: 'Thiết kế, xây dựng và vận hành website trọn gói cho doanh nghiệp.'
    }
  },

  en: {
    meta: {
      title: 'Nexora — Websites that tell your brand story',
      description: 'Nexora designs bespoke websites for real estate, tech companies, restaurants, spas, education, manufacturing and more. Ready in one to two weeks.'
    },
    ui: {
      skip: 'Skip to content',
      home: 'Nexora, back to top',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      lang: 'Language',
      mainNav: 'Main navigation',
      quote: 'Get a quote',
      work: 'See our work',
      zaloShort: 'Zalo',
      zaloAria: 'Message Nexora on Zalo',
      top: 'Back to top'
    },
    nav: [
      { label: 'Services', href: '#services' },
      { label: 'Industries', href: '#industries' },
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'Contact', href: '#contact' }
    ],
    hero: {
      title: 'Your brand, told through a website.',
      lead: 'Nexora designs and builds bespoke websites for businesses, from first idea and interface to ongoing care. Ready in one to two weeks.',
      ring: 'idea ✦ design ✦ build ✦ care ✦ idea ✦ design ✦ build ✦ care ✦ idea ✦ design ✦',
      clients: 'Trusted by 30+ businesses, including',
      others: 'and many more.',
      scroll: 'Scroll to explore'
    },
    marks: ['About', 'Industries', 'Services', 'Process', 'Work', 'Contact'],
    intro: {
      statement:
        'A good website does more than look nice. It makes customers remember you, trust you and reach out. Nexora works like a tailor: listen first, measure carefully, then cut.',
      stats: [
        { value: 30, suffix: '+', unit: 'businesses', label: 'across many industries have trusted Nexora with their website' },
        { value: 14, unit: 'days', label: 'at most, from our first meeting to a website ready to welcome customers' },
        { value: 100, unit: '%', label: 'designed for your brand, no ready-made templates' }
      ]
    },
    industries: {
      title: 'A website shaped to your industry.',
      lead: 'Whether you sell apartments, coffee or spa treatments, we know what your customers need to see before they get in touch.',
      items: [
        { icon: 'building', name: 'Real estate', desc: 'Project pages, price lists, floor plans, progress updates and lead forms for every development.' },
        { icon: 'chip', name: 'Tech companies', desc: 'Clear, credible pages for your products, solutions and team that win over partners.' },
        { icon: 'cup', name: 'Restaurants & F&B', desc: 'Beautiful menus, table booking, ordering and directions in just a few taps.' },
        { icon: 'lotus', name: 'Spa & beauty', desc: 'Treatment menus, pricing, appointment booking and a space that feels calm and luxurious.' },
        { icon: 'bed', name: 'Hotels & travel', desc: 'Rooms, tours, photo galleries and direct bookings without the middleman.' },
        { icon: 'cap', name: 'Education & training', desc: 'Courses, start dates, teachers and enrolment forms for parents and students.' },
        { icon: 'factory', name: 'Manufacturing & industry', desc: 'Capabilities, product catalogues and company profiles for local and overseas buyers.' },
        { icon: 'bag', name: 'Retail & online stores', desc: 'Online stores with cart, checkout, promotions and order management.' }
      ],
      more: "Don't see your industry? We can still build it.",
      moreCta: 'Ask Nexora'
    },
    benefits: ['Looks great on every screen', 'Loads fast', 'Easy to find on Google', 'Update it yourself', 'Turns visitors into enquiries', 'Ready in 1–2 weeks'],
    services: {
      title: 'Everything your website needs, under one roof.',
      lead: 'One point of contact for the whole project. You run the business; Nexora takes care of the website.',
      items: [
        { title: 'Strategy & digital identity', desc: 'We study your customers and competitors, position your brand and plan the content before any design begins.', tags: ['Research', 'Positioning', 'Sitemap'] },
        { title: 'Interface design', desc: 'A look made for your brand that works on phones and desktops and leads visitors to get in touch.', tags: ['Custom design', 'Mobile-ready', 'Review a demo'] },
        { title: 'Website build', desc: 'Fast pages that are easy to find on Google. Edit text, photos and posts yourself, no technical skills needed.', tags: ['Fast', 'SEO-ready', 'Easy to manage'] },
        { title: 'Motion & experience', desc: 'Subtle movement, smooth scrolling and striking visuals that keep visitors longer and make you memorable.', tags: ['Motion', 'Visuals', 'Memorable'] },
        { title: 'Online sales & landing pages', desc: 'Online stores, campaign pages, orders, bookings and payments.', tags: ['Cart', 'Booking', 'Landing page'] },
        { title: 'Hosting, SEO & care', desc: 'Domain, hosting, security, speed, SEO and long-term upgrades after handover.', tags: ['Domain & hosting', 'SEO', 'Maintenance'] }
      ]
    },
    founder: {
      label: 'The Nexora team',
      title: 'One of us builds a beautiful website, the other brings customers to it.',
      lead: 'You work directly with the people who build your website, from the first meeting to long after handover.',
      members: [
        {
          photo: '/team-quang.jpg',
          name: 'Ho Minh Quang',
          role: 'Founder, website design & build',
          bio: 'More than 5 years designing and building e-commerce systems for the Japanese market, where quality and detail are non-negotiable. Personally delivered websites for Thanh Hung Phat, AH Technology and many other businesses.'
        },
        {
          photo: '/team-hoang.jpg',
          name: 'Pham Huy Hoang',
          role: 'Advertising, marketing & SEO',
          bio: 'More than 7 years in advertising, marketing and website SEO. Makes sure your website is not only beautiful but found: ranking on Google, running effective ads and tracking every enquiry.'
        }
      ]
    },
    process: {
      title: 'Two weeks from idea to launch.',
      lead: 'Six clear steps, each with something for you to review before we move on.',
      day: 'Day',
      steps: [
        { step: 'A', title: 'Discovery', time: 'Day 1', desc: 'We learn your goals, customers and competitors, then agree on scope, budget and timeline.' },
        { step: 'B', title: 'Strategy', time: 'Days 1–2', desc: 'Information architecture, sitemap, key messages and visual direction.' },
        { step: 'C', title: 'Design', time: 'Days 2–5', desc: 'Style direction, finished interface and a demo for you to approve before we build.' },
        { step: 'D', title: 'Build', time: 'Days 5–11', desc: 'We build the full site, add motion and connect forms, Zalo, maps and the tools you already use.' },
        { step: 'E', title: 'Testing', time: 'Days 11–13', desc: 'Checks on every phone and computer, plus speed, SEO and security.' },
        { step: 'Z', title: 'Launch & care', time: 'Day 14', desc: 'We put the site live, hand it over, train your team and stay on for long-term support.' }
      ]
    },
    projects: {
      title: 'Selected work.',
      note: 'A few of the 30+ websites Nexora has built for businesses across industries.',
      open: 'Visit website',
      scopeLabel: 'Scope of work',
      items: {
        thanhhungphat: { name: 'Thanh Hung Phat', industry: 'Energy & industrial fuel', desc: 'Corporate website for a nationwide supplier of coal and biomass fuel for industrial boilers.', scope: ['Design', 'Website', 'Mobile', 'SEO'] },
        edubiz: { name: 'Edubiz Media', industry: 'Media & education', desc: 'Landing page for an education media studio producing videos, AI animation and school branding.', scope: ['Design', 'Website', 'Mobile', 'SEO'] },
        ahtech: { name: 'AHTECH', industry: 'Technology & digital transformation', desc: 'Website for a digital transformation partner offering infrastructure, software, cloud and cybersecurity.', scope: ['Design', 'Website', 'Mobile', 'SEO'] },
        bmcpack: { name: 'BMC PACK', industry: 'Manufacturing & packaging machinery', desc: 'Showcase site for 4.0 corrugated carton production lines serving customers in more than 40 countries.', scope: ['Design', 'Website', 'Mobile', 'SEO'] }
      }
    },
    contact: {
      title: 'Tell us about the website you want.',
      lead: "Leave a few details and we'll get back to you within one business day. For a quicker chat, message us on Zalo.",
      zaloTitle: 'Message Nexora on Zalo',
      zaloNote: 'Opens a chat in the Zalo app',
      officeLabel: 'Office',
      office: '127 Ngo Thi Nham, Di An Ward, Ho Chi Minh City',
      hoursLabel: 'Hours',
      hours: 'Mon – Sat, 8:00 – 18:00',
      formTitle: 'Get a free consultation & quote',
      formNote: "Leave your details and we'll call you back within one business day.",
      needsLabel: 'What do you need?',
      needsHint: 'Pick one or more',
      needs: ['Company website', 'Landing page', 'Online store', 'Booking system', 'Redesign my site', 'Care & SEO'],
      name: 'Full name',
      phone: 'Your phone or Zalo number',
      company: 'Company or brand',
      message: 'A few words about the project',
      optional: 'optional',
      placeholder: 'For example: a 6-page company website with an English version',
      submit: 'Send request',
      sending: 'Sending…',
      errName: 'Enter your name so we know how to address you.',
      errPhone: 'Enter a phone number with 9 to 12 digits.',
      errSend: "Your request wasn't sent. Check your connection and try again, or message us on Zalo.",
      sentTitle: 'Request received.',
      sentText: "We'll get back to you within one business day on the number you left.",
      copiedTitle: 'Your message is copied.',
      copiedText: "Paste it into the Zalo chat that just opened and press send. We'll reply within one business day.",
      openedTitle: 'Zalo is open.',
      openedText: 'Send us a few lines about your project in the Zalo chat.',
      reopen: 'Open Zalo again',
      another: 'Send another request',
      msg: {
        intro: "Hi Nexora, I'd like to talk about a website project.",
        subject: 'New project request',
        name: 'Name',
        phone: 'Phone',
        company: 'Company',
        needs: 'Needs',
        message: 'Details'
      }
    },
    footer: {
      tag: 'Design, build and care for business websites, end to end.'
    }
  }
}

// Gắn ngày bắt đầu/kết thúc vào các bước quy trình của cả hai ngôn ngữ
for (const lang of Object.values(content)) {
  lang.process.steps.forEach((s, i) => Object.assign(s, { start: days[i][0], end: days[i][1] }))
}
