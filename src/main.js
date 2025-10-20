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

// ===== CREATE MULTIPLE SMALL DIYAS =====
function createSmallDiya(scale = 0.3) {
  const smallDiyaGroup = new THREE.Group()
  
  // Base
  const baseGeo = new THREE.TorusGeometry(0.8 * scale, 0.3 * scale, 16, 32)
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.7,
    roughness: 0.3
  })
  const base = new THREE.Mesh(baseGeo, baseMat)
  base.rotation.x = Math.PI / 2
  base.castShadow = true
  smallDiyaGroup.add(base)
  
  // Bowl
  const bowlGeo = new THREE.SphereGeometry(0.6 * scale, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
  const bowlMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.6,
    roughness: 0.4
  })
  const bowl = new THREE.Mesh(bowlGeo, bowlMat)
  bowl.position.y = 0.3 * scale
  bowl.castShadow = true
  smallDiyaGroup.add(bowl)
  
  // Flame
  const flameGeo = new THREE.ConeGeometry(0.15 * scale, 0.6 * scale, 8)
  const flameMat = new THREE.MeshStandardMaterial({
    color: 0xffeb3b,
    emissive: 0xff6b00,
    emissiveIntensity: 2
  })
  const smallFlame = new THREE.Mesh(flameGeo, flameMat)
  smallFlame.position.y = 1 * scale
  smallDiyaGroup.add(smallFlame)
  
  // Light
  const light = new THREE.PointLight(0xff6b00, 1 * scale, 5)
  light.position.set(0, 1.2 * scale, 0)
  smallDiyaGroup.add(light)
  
  // Store flame reference for animation
  smallDiyaGroup.userData.flame = smallFlame
  smallDiyaGroup.userData.light = light
  
  return smallDiyaGroup
}

// Add multiple small diyas around the scene
const smallDiyas = []
const diyaPositions = [
  // Top row (above form)
  { x: -6, y: 4, z: -3, scale: 0.3 },
  { x: 0, y: 5, z: -4, scale: 0.25 },
  { x: 6, y: 4, z: -3, scale: 0.3 },
  
  // Middle row (sides of form)
  { x: -8, y: 1, z: 0, scale: 0.35 },
  { x: 8, y: 1, z: 0, scale: 0.35 },
  { x: -7, y: 0, z: 3, scale: 0.28 },
  { x: 7, y: 0, z: 3, scale: 0.28 },
  
  // Bottom row (below form)
  { x: -5, y: -2, z: 5, scale: 0.32 },
  { x: 0, y: -3, z: 6, scale: 0.3 },
  { x: 5, y: -2, z: 5, scale: 0.32 },
  
  // Back corners
  { x: -4, y: 2, z: -6, scale: 0.22 },
  { x: 4, y: 2, z: -6, scale: 0.22 },
  
  // Extra decorative diyas
  { x: -9, y: -1, z: 1, scale: 0.25 },
  { x: 9, y: -1, z: 1, scale: 0.25 },
  { x: -3, y: 3.5, z: -2, scale: 0.2 },
  { x: 3, y: 3.5, z: -2, scale: 0.2 }
]

diyaPositions.forEach((pos, index) => {
  const smallDiya = createSmallDiya(pos.scale)
  smallDiya.position.set(pos.x, pos.y, pos.z)
  smallDiya.rotation.y = Math.random() * Math.PI * 2
  
  // Store initial position and random movement params
  smallDiya.userData.initialY = pos.y
  smallDiya.userData.floatSpeed = 0.5 + Math.random() * 0.5
  smallDiya.userData.floatAmount = 0.3 + Math.random() * 0.4
  smallDiya.userData.rotationSpeed = 0.05 + Math.random() * 0.1
  smallDiya.userData.offset = index * 0.5
  
  scene.add(smallDiya)
  smallDiyas.push(smallDiya)
})

// ===== FLOATING PARTICLES (Reduced) =====
const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 100
const positions = new Float32Array(particlesCount * 3)
const colors = new Float32Array(particlesCount * 3)

for (let i = 0; i < particlesCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 20
  positions[i + 1] = Math.random() * 10
  positions[i + 2] = (Math.random() - 0.5) * 20
  
  colors[i] = 1
  colors[i + 1] = Math.random() * 0.5 + 0.5
  colors[i + 2] = Math.random() * 0.3
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// ===== ANIMATION LOOP =====
const clock = new THREE.Clock()

function animate() {
  const elapsedTime = clock.getElapsedTime()
  
  // Rotate main diya slowly
  diyaGroup.rotation.y = elapsedTime * 0.2
  
  // Flickering flame effect for main diya
  flame.scale.y = 1 + Math.sin(elapsedTime * 10) * 0.1
  flameLight.intensity = 3 + Math.sin(elapsedTime * 10) * 0.5
  
  // Animate small diyas with floating and rotation
  smallDiyas.forEach((diya, index) => {
    // Smooth rotation
    diya.rotation.y += diya.userData.rotationSpeed * 0.02
    
    // Floating up and down
    const floatOffset = diya.userData.offset
    const floatSpeed = diya.userData.floatSpeed
    const floatAmount = diya.userData.floatAmount
    diya.position.y = diya.userData.initialY + Math.sin(elapsedTime * floatSpeed + floatOffset) * floatAmount
    
    // Slight side-to-side sway
    diya.position.x += Math.sin(elapsedTime * 0.3 + index) * 0.002
    
    // Flickering flames with variation
    if (diya.userData.flame) {
      const flameFlicker = Math.sin(elapsedTime * 8 + index * 0.7) * 0.15
      diya.userData.flame.scale.y = 1 + flameFlicker
      diya.userData.flame.scale.x = 1 + flameFlicker * 0.5
    }
    
    // Pulsing light intensity
    if (diya.userData.light) {
      diya.userData.light.intensity = 0.8 + Math.sin(elapsedTime * 6 + index * 0.5) * 0.4
    }
  })
  
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
    showCustomAlert('कृपया अपना नाम भरें! 🪔\nPlease enter your name! 🪔')
    nameInput.focus()
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
    showCustomAlert('लिंक कॉपी नहीं हो सका। कृपया मैन्युअली कॉपी करें।\nFailed to copy link. Please copy manually.')
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

// Function to get current link with name
function getCurrentShareLink() {
  const name = nameInput.value.trim()
  const selectedLanguage = document.querySelector('input[name="language"]:checked').value
  
  if (!name) {
    return null
  }
  
  const baseURL = window.location.origin + window.location.pathname
  return `${baseURL}?n=${encodeURIComponent(name)}&lang=${selectedLanguage}`
}

shareTwitterBtn.addEventListener('click', () => {
  const shareLink = getCurrentShareLink()
  
  if (!shareLink) {
    showCustomAlert('कृपया पहले अपना नाम भरें! 🪔\nPlease enter your name first! 🪔')
    nameInput.focus()
    return
  }
  
  const name = nameInput.value.trim()
  const text = `✨ Happy Diwali from ${name}! 🪔\n\nWishing you light, love, and prosperity!\n\n🎥 Subscribe: https://www.youtube.com/@DevStudio-2k25`
  const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareLink)}`
  window.open(twitterURL, '_blank')
})

shareWhatsAppBtn.addEventListener('click', () => {
  const shareLink = getCurrentShareLink()
  
  if (!shareLink) {
    showCustomAlert('कृपया पहले अपना नाम भरें! 🪔\nPlease enter your name first! 🪔')
    nameInput.focus()
    return
  }
  
  const name = nameInput.value.trim()
  const text = `✨ *Happy Diwali from ${name}!* 🪔\n\nWishing you light, love, and prosperity!\n\n🎁 Your personalized greeting:\n${shareLink}\n\n🎥 Subscribe to DevStudio 2k25:\nhttps://www.youtube.com/@DevStudio-2k25`
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(whatsappURL, '_blank')
})

// Facebook share
const shareFacebookBtn = document.getElementById('share-facebook')
shareFacebookBtn.addEventListener('click', () => {
  const shareLink = getCurrentShareLink()
  
  if (!shareLink) {
    showCustomAlert('कृपया पहले अपना नाम भरें! 🪔\nPlease enter your name first! 🪔')
    nameInput.focus()
    return
  }
  
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`
  window.open(facebookURL, '_blank')
})

// Telegram share
const shareTelegramBtn = document.getElementById('share-telegram')
shareTelegramBtn.addEventListener('click', () => {
  const shareLink = getCurrentShareLink()
  
  if (!shareLink) {
    showCustomAlert('कृपया पहले अपना नाम भरें! 🪔\nPlease enter your name first! 🪔')
    nameInput.focus()
    return
  }
  
  const name = nameInput.value.trim()
  const text = `✨ Happy Diwali from ${name}! 🪔\n\nWishing you light, love, and prosperity!\n\n🎥 Subscribe: https://www.youtube.com/@DevStudio-2k25`
  const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(text)}`
  window.open(telegramURL, '_blank')
})

// LinkedIn share
const shareLinkedInBtn = document.getElementById('share-linkedin')
shareLinkedInBtn.addEventListener('click', () => {
  const shareLink = getCurrentShareLink()
  
  if (!shareLink) {
    showCustomAlert('कृपया पहले अपना नाम भरें! 🪔\nPlease enter your name first! 🪔')
    nameInput.focus()
    return
  }
  
  const linkedinURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`
  window.open(linkedinURL, '_blank')
})

// Custom alert function
function showCustomAlert(message) {
  // Create custom alert overlay
  const alertOverlay = document.createElement('div')
  alertOverlay.className = 'custom-alert-overlay'
  alertOverlay.innerHTML = `
    <div class="custom-alert-box">
      <div class="custom-alert-icon">🪔</div>
      <div class="custom-alert-message">${message.replace(/\n/g, '<br>')}</div>
      <button class="custom-alert-btn">OK</button>
    </div>
  `
  
  document.body.appendChild(alertOverlay)
  
  // Close on button click
  const closeBtn = alertOverlay.querySelector('.custom-alert-btn')
  closeBtn.addEventListener('click', () => {
    alertOverlay.remove()
  })
  
  // Close on overlay click
  alertOverlay.addEventListener('click', (e) => {
    if (e.target === alertOverlay) {
      alertOverlay.remove()
    }
  })
}

// Initialize greeting on page load
updateGreeting()

// ===== WELCOME POPUP LOGIC =====
const welcomePopup = document.getElementById('welcome-popup')
const closePopupBtn = document.getElementById('close-popup')

// Check if user has visited before
const hasVisited = localStorage.getItem('hasVisitedDiwaliSite')

if (!hasVisited) {
  // Show popup for first-time visitors
  welcomePopup.classList.remove('hidden')
} else {
  // Hide popup for returning visitors
  welcomePopup.classList.add('hidden')
}

// Close popup and mark as visited
closePopupBtn.addEventListener('click', () => {
  welcomePopup.classList.add('hidden')
  localStorage.setItem('hasVisitedDiwaliSite', 'true')
})
