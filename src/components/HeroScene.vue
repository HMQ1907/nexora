<template>
  <div ref="wrap" class="scene" aria-hidden="true"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({ ready: Boolean })
const wrap = ref(null)
let cleanup = () => {}

// 3D simplex noise (Ashima Arts, MIT)
const NOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+2.0*C.xxx;vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

onMounted(() => {
  const el = wrap.value
  const isMobile = window.innerWidth < 768
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.setSize(el.clientWidth, el.clientHeight)
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 7)

  const root = new THREE.Group()
  scene.add(root)

  // ---- Khối cầu hạt biến hình ----
  const COUNT = isMobile ? 9000 : 18000
  const pos = new Float32Array(COUNT * 3)
  const rnd = new Float32Array(COUNT)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    pos[i * 3] = Math.cos(th) * r
    pos[i * 3 + 1] = y
    pos[i * 3 + 2] = Math.sin(th) * r
    rnd[i] = Math.random()
  }
  const blobGeo = new THREE.BufferGeometry()
  blobGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  blobGeo.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 1))

  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 1) },
    uMouseForce: { value: 0 },
    uSize: { value: (isMobile ? 2.2 : 2.6) * renderer.getPixelRatio() },
    uColA: { value: new THREE.Color('#c8ff2e') },
    uColB: { value: new THREE.Color('#5b8cff') },
    uAlpha: { value: 0 }
  }

  const blobMat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime, uAmp, uSize, uMouseForce;
      uniform vec3 uMouse;
      attribute float aRnd;
      varying float vN;
      varying float vDepth;
      varying float vRnd;
      ${NOISE}
      void main(){
        vec3 p = position * 1.65;
        float n = snoise(position * 1.4 + vec3(uTime * 0.18));
        float n2 = snoise(position * 3.2 - vec3(uTime * 0.25));
        float disp = n * 0.38 + n2 * 0.08;
        float md = distance(normalize(position), normalize(uMouse));
        disp += smoothstep(0.9, 0.0, md) * 0.45 * uMouseForce;
        p += normalize(position) * disp * uAmp;
        p += normalize(position) * (aRnd - 0.5) * 0.06;
        vN = n;
        vRnd = aRnd;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDepth = -mv.z;
        gl_PointSize = uSize * (0.6 + aRnd * 0.9) * (6.5 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColA, uColB;
      uniform float uAlpha;
      varying float vN;
      varying float vDepth;
      varying float vRnd;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d);
        vec3 col = mix(uColB, uColA, smoothstep(-0.35, 0.45, vN));
        col += vec3(1.0) * step(0.985, vRnd) * 0.6;
        float fade = smoothstep(9.5, 5.2, vDepth);
        gl_FragColor = vec4(col, a * uAlpha * (0.25 + fade * 0.75));
      }`
  })
  const blob = new THREE.Points(blobGeo, blobMat)
  root.add(blob)

  // ---- Lõi khung dây ----
  const coreMat = new THREE.MeshBasicMaterial({ color: '#c8ff2e', wireframe: true, transparent: true, opacity: 0 })
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 1), coreMat)
  root.add(core)

  // ---- Vòng quỹ đạo ----
  const ringMat = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0 })
  const rings = []
  ;[2.6, 3.1].forEach((r, i) => {
    const pts = []
    for (let a = 0; a <= 256; a++) {
      const t = (a / 256) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0))
    }
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), ringMat)
    ring.rotation.x = Math.PI / 2.3 + i * 0.35
    ring.rotation.y = i * 0.6
    root.add(ring)
    rings.push(ring)
  })
  // chấm sáng chạy trên quỹ đạo
  const sat = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), new THREE.MeshBasicMaterial({ color: '#c8ff2e' }))
  rings[0].add(sat)

  // ---- Bụi sao nền ----
  const SC = isMobile ? 700 : 1600
  const sp = new Float32Array(SC * 3)
  for (let i = 0; i < SC; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 30
    sp[i * 3 + 1] = (Math.random() - 0.5) * 20
    sp[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
  const starMat = new THREE.PointsMaterial({ color: '#9aa3b8', size: 0.025, transparent: true, opacity: 0, depthWrite: false })
  const stars = new THREE.Points(starGeo, starMat)
  scene.add(stars)

  // Bố cục: desktop đặt khối cầu lệch phải
  const layout = () => {
    const w = el.clientWidth
    const h = el.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const mobile = w < 900
    root.position.set(mobile ? 0 : 2.1, mobile ? 0.9 : 0, 0)
    root.scale.setScalar(mobile ? 0.8 : 1)
  }
  layout()

  // ---- Tương tác chuột ----
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const raycaster = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  const hitSphere = new THREE.Sphere(new THREE.Vector3(), 1.7)
  const tmp = new THREE.Vector3()
  const onMove = (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1
    const r = el.getBoundingClientRect()
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    raycaster.setFromCamera(ndc, camera)
    root.updateMatrixWorld()
    hitSphere.center.setFromMatrixPosition(root.matrixWorld)
    hitSphere.radius = 1.7 * root.scale.x
    if (raycaster.ray.intersectSphere(hitSphere, tmp)) {
      blob.worldToLocal(tmp)
      uniforms.uMouse.value.copy(tmp)
      gsap.to(uniforms.uMouseForce, { value: 1, duration: 0.6, overwrite: true })
    } else {
      gsap.to(uniforms.uMouseForce, { value: 0, duration: 1.2, overwrite: true })
    }
  }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('resize', layout)

  // ---- Vòng lặp render (dừng khi ra khỏi màn hình) ----
  let visible = true
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(el)
  const clock = new THREE.Clock()
  let raf
  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (!visible) return
    const t = clock.getElapsedTime()
    uniforms.uTime.value = reduce ? 0 : t
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    blob.rotation.y = t * 0.06 + mouse.x * 0.4
    blob.rotation.x = mouse.y * 0.25
    core.rotation.x = t * 0.25
    core.rotation.y = t * 0.18
    rings[0].rotation.z = t * 0.12
    rings[1].rotation.z = -t * 0.08
    sat.position.set(Math.cos(t * 0.9) * 2.6, Math.sin(t * 0.9) * 2.6, 0)
    stars.rotation.y = t * 0.01
    camera.position.x = mouse.x * 0.35
    camera.position.y = mouse.y * 0.25
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
  }
  tick()

  // ---- Intro + cuộn ----
  const intro = () => {
    const tl = gsap.timeline()
    tl.to(uniforms.uAlpha, { value: 1, duration: 2, ease: 'power2.out' })
      .fromTo(uniforms.uAmp, { value: 3.5 }, { value: 1, duration: 2.6, ease: 'expo.out' }, 0)
      .fromTo(blob.scale, { x: 0.2, y: 0.2, z: 0.2 }, { x: 1, y: 1, z: 1, duration: 2.4, ease: 'expo.out' }, 0)
      .to(coreMat, { opacity: 0.35, duration: 1.5 }, 0.6)
      .to(ringMat, { opacity: 0.14, duration: 1.5 }, 0.8)
      .to(starMat, { opacity: 0.7, duration: 2 }, 0.4)
  }
  let played = false
  const stopWatch = watch(
    () => props.ready,
    (v) => { if (v && !played) { played = true; intro() } },
    { immediate: true }
  )

  const st = gsap.timeline({
    scrollTrigger: { trigger: el.parentElement, start: 'top top', end: 'bottom top', scrub: 1 }
  })
  st.to(root.position, { y: '-=1.6', ease: 'none' }, 0)
    .to(root.rotation, { z: 0.6, x: 0.4, ease: 'none' }, 0)
    .to(camera, { zoom: 1.5, ease: 'none', onUpdate: () => camera.updateProjectionMatrix() }, 0)

  cleanup = () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('resize', layout)
    st.scrollTrigger?.kill()
    stopWatch()
    renderer.dispose()
    blobGeo.dispose()
    blobMat.dispose()
    starGeo.dispose()
    el.removeChild(renderer.domElement)
  }
})
onBeforeUnmount(() => cleanup())
</script>

<style scoped>
.scene {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.scene :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
