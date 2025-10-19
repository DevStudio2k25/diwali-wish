import './style.css'
import * as THREE from 'three'

// ===== SCENE SETUP =====
const canvas = document.querySelector('#webgl')
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0x1a0033, 10, 50)

// ===== CAMERA =====
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.set(0, 2, 8)
camera.lookAt(0, 0, 0)

// ===== RENDERER =====
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// ===== LIGHTS =====
const ambientLight = new THREE.AmbientLight(0xffd700, 0.3)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xff6b35, 2, 20)
pointLight.position.set(0, 3, 0)
pointLight.castShadow = true
scene.add(pointLight)

// ===== CREATE 3D DIYA =====
const diyaGroup = new THREE.Group()

// Diya base (torus)
const diyaBaseGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 32)
const diyaBaseMaterial = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  metalness: 0.7,
  roughness: 0.3
})
const diyaBase = new THREE.Mesh(diyaBaseGeometry, diyaBaseMaterial)
diyaBase.rotation.x = Math.PI / 2
diyaBase.position.y = 0
diyaBase.castShadow = true
diyaGroup.add(diyaBase)

// Diya bowl (sphere)
const diyaBowlGeometry = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
const diyaBowlMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  metalness: 0.6,
  roughness: 0.4
})
const diyaBowl = new THREE.Mesh(diyaBowlGeometry, diyaBowlMaterial)
diyaBowl.position.y = 0.3
diyaBowl.castShadow = true
diyaGroup.add(diyaBowl)

// Flame (cone + light)
const flameGeometry = new THREE.ConeGeometry(0.15, 0.6, 8)
const flameMaterial = new THREE.MeshStandardMaterial({
  color: 0xffeb3b,
  emissive: 0xff6b00,
  emissiveIntensity: 2
})
const flame = new THREE.Mesh(flameGeometry, flameMaterial)
flame.position.y = 1
diyaGroup.add(flame)

// Flame light
const flameLight = new THREE.PointLight(0xff6b00, 3, 10)
flameLight.position.set(0, 1.2, 0)
flameLight.castShadow = true
diyaGroup.add(flameLight)

diyaGroup.position.y = -1
scene.add(diyaGroup)

// ===== FLOATING PARTICLES =====
const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)
const colors = new Float32Array(particlesCount * 3)

for (let i = 0; i < particlesCount * 3; i += 3) {
  // Random positions in a sphere around the scene
  positions[i] = (Math.random() - 0.5) * 20
  positions[i + 1] = Math.random() * 10
  positions[i + 2] = (Math.random() - 0.5) * 20
  
  // Golden/orange colors
  colors[i] = 1
  colors[i + 1] = Math.random() * 0.5 + 0.5
  colors[i + 2] = Math.random() * 0.3
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// ===== ANIMATION LOOP =====
const clock = new THREE.Clock()

function animate() {
  const elapsedTime = clock.getElapsedTime()
  
  // Rotate diya slowly
  diyaGroup.rotation.y = elapsedTime * 0.2
  
  // Flickering flame effect
  flame.scale.y = 1 + Math.sin(elapsedTime * 10) * 0.1
  flameLight.intensity = 3 + Math.sin(elapsedTime * 10) * 0.5
  
  // Floating particles
  const particlesPositions = particles.geometry.attributes.position.array
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3
    particlesPositions[i3 + 1] += Math.sin(elapsedTime + i) * 0.01
    
    // Reset particles that go too high
    if (particlesPositions[i3 + 1] > 10) {
      particlesPositions[i3 + 1] = 0
    }
  }
  particles.geometry.attributes.position.needsUpdate = true
  
  // Rotate particles
  particles.rotation.y = elapsedTime * 0.05
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

// ===== RESPONSIVE =====
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ===== DIWALI MESSAGES =====
const messages = {
  english: {
    greeting: (name) => `Happy Diwali! 🪔`,
    message: (name) => `
      <p>Wishing you a very Happy Diwali! May this festival of lights bring endless joy, prosperity, and success to your life. May the divine light of Diwali spread peace, prosperity, happiness, and good health in your life.</p>
      <p>May the beauty of Diwali season fill your home with happiness, and may the coming year provide you with everything that brings you joy. May the lamps of joy illuminate your life and fill your days with the bright sparkles of peace, mirth, and goodwill.</p>
      <p>Wishing you and your family a blessed and prosperous Diwali! May Goddess Lakshmi bless you with wealth and prosperity. May Lord Ganesha remove all obstacles from your path to success.</p>
      <p class="from-text">With warm wishes,<br/>— ${name} ✨</p>
    `
  },
  hindi: {
    greeting: (name) => `दीपावली की हार्दिक शुभकामनाएं! 🪔`,
    message: (name) => `
      <p>आपको दीपावली की हार्दिक शुभकामनाएं! यह दीपों का त्योहार आपके जीवन में अनंत खुशियां, समृद्धि और सफलता लेकर आए। दीवाली का दिव्य प्रकाश आपके जीवन में शांति, समृद्धि, खुशी और अच्छे स्वास्थ्य का प्रसार करे।</p>
      <p>दीपावली के इस पावन पर्व की सुंदरता आपके घर को खुशियों से भर दे, और आने वाला साल आपको वह सब कुछ प्रदान करे जो आपको आनंद देता है। खुशी के दीपक आपके जीवन को रोशन करें और आपके दिनों को शांति, हर्ष और सद्भावना की चमक से भर दें।</p>
      <p>आपको और आपके परिवार को दीपावली की ढेर सारी शुभकामनाएं! माँ लक्ष्मी आपको धन और समृद्धि से आशीर्वादित करें। भगवान गणेश आपकी सफलता के मार्ग से सभी बाधाओं को दूर करें।</p>
      <p class="from-text">हार्दिक शुभकामनाओं के साथ,<br/>— ${name} ✨</p>
    `
  }
}

// ===== PERSONALIZATION LOGIC =====
const greetingText = document.getElementById('greeting-text')
const personalizedMessageDiv = document.getElementById('personalized-message')
const nameInput = document.getElementById('name-input')
const generateBtn = document.getElementById('generate-btn')
const linkFeedback = document.getElementById('link-feedback')
const generatedLinkContainer = document.getElementById('generated-link-container')
const generatedLinkInput = document.getElementById('generated-link')

// Get parameters from URL
function getParamsFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  return {
    name: urlParams.get('n'),
    language: urlParams.get('lang') || 'english'
  }
}

// Update greeting based on URL
function updateGreeting() {
  const params = getParamsFromURL()
  
  if (params.name) {
    const lang = params.language === 'hindi' ? 'hindi' : 'english'
    greetingText.textContent = messages[lang].greeting(params.name)
    personalizedMessageDiv.innerHTML = messages[lang].message(params.name)
    personalizedMessageDiv.classList.remove('hidden')
  } else {
    greetingText.textContent = 'Happy Diwali ✨'
    personalizedMessageDiv.classList.add('hidden')
  }
}

// Generate personalized link
generateBtn.addEventListener('click', () => {
  const name = nameInput.value.trim()
  const selectedLanguage = document.querySelector('input[name="language"]:checked').value
  
  if (!name) {
    alert('कृपया अपना नाम भरें! / Please enter your name!')
    return
  }
  
  // Create shareable link
  const baseURL = window.location.origin + window.location.pathname
  const personalizedLink = `${baseURL}?n=${encodeURIComponent(name)}&lang=${selectedLanguage}`
  
  // Copy to clipboard
  navigator.clipboard.writeText(personalizedLink).then(() => {
    // Show feedback
    linkFeedback.classList.remove('hidden')
    generatedLinkContainer.classList.remove('hidden')
    generatedLinkInput.value = personalizedLink
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      linkFeedback.classList.add('hidden')
    }, 3000)
  }).catch(err => {
    console.error('Failed to copy:', err)
    alert('Failed to copy link. Please copy manually.')
  })
})

// Copy generated link on click
generatedLinkInput.addEventListener('click', function() {
  this.select()
  navigator.clipboard.writeText(this.value)
})

// ===== SHARE FUNCTIONALITY =====
const shareTwitterBtn = document.getElementById('share-twitter')
const shareWhatsAppBtn = document.getElementById('share-whatsapp')

shareTwitterBtn.addEventListener('click', () => {
  const params = getParamsFromURL()
  const text = `✨ Happy Diwali! 🪔 ${params.name ? `From ${params.name} - ` : ''}Wishing you light, love, and prosperity! Check out this beautiful greeting:`
  const url = window.location.href
  const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  window.open(twitterURL, '_blank')
})

shareWhatsAppBtn.addEventListener('click', () => {
  const params = getParamsFromURL()
  const text = `✨ Happy Diwali! 🪔 ${params.name ? `From ${params.name} - ` : ''}Wishing you light, love, and prosperity! ${window.location.href}`
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(whatsappURL, '_blank')
})

// ===== MUSIC TOGGLE =====
const musicToggle = document.getElementById('music-toggle')
const musicIcon = document.getElementById('music-icon')
let isPlaying = false

// Create audio element (using a royalty-free ambient sound URL)
const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3')
audio.loop = true
audio.volume = 0.3

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause()
    musicIcon.textContent = '🔇'
  } else {
    audio.play().catch(err => {
      console.log('Audio play failed:', err)
    })
    musicIcon.textContent = '🔊'
  }
  isPlaying = !isPlaying
})

// Initialize greeting on page load
updateGreeting()
