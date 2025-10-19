import * as THREE from 'three'

/**
 * 🪔 Procedural Diya Builder
 * 
 * No need to download heavy 3D models!
 * This creates beautiful diyas using code with different styles.
 * Super lightweight and customizable!
 */

/**
 * Create a traditional diya
 * @param {Object} options - Customization options
 * @returns {THREE.Group} - Complete diya group
 */
export function createTraditionalDiya(options = {}) {
  const {
    baseColor = 0xd4af37,
    bowlColor = 0xffd700,
    flameColor = 0xffeb3b,
    size = 1
  } = options

  const diyaGroup = new THREE.Group()

  // Base plate (flat cylinder)
  const baseGeometry = new THREE.CylinderGeometry(0.9 * size, 1 * size, 0.1 * size, 32)
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    metalness: 0.8,
    roughness: 0.2
  })
  const base = new THREE.Mesh(baseGeometry, baseMaterial)
  base.position.y = 0
  base.castShadow = true
  diyaGroup.add(base)

  // Bowl (hemisphere)
  const bowlGeometry = new THREE.SphereGeometry(0.7 * size, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
  const bowlMaterial = new THREE.MeshStandardMaterial({
    color: bowlColor,
    metalness: 0.7,
    roughness: 0.3
  })
  const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial)
  bowl.position.y = 0.1 * size
  bowl.castShadow = true
  diyaGroup.add(bowl)

  // Rim (torus)
  const rimGeometry = new THREE.TorusGeometry(0.7 * size, 0.05 * size, 16, 32)
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    metalness: 0.9,
    roughness: 0.1
  })
  const rim = new THREE.Mesh(rimGeometry, rimMaterial)
  rim.rotation.x = Math.PI / 2
  rim.position.y = 0.4 * size
  diyaGroup.add(rim)

  // Flame
  const flame = createFlame(flameColor, size)
  flame.position.y = 0.8 * size
  diyaGroup.add(flame)

  return diyaGroup
}

/**
 * Create a lotus-style diya
 * @param {Object} options - Customization options
 * @returns {THREE.Group} - Complete diya group
 */
export function createLotusDiya(options = {}) {
  const {
    petalColor = 0xff69b4,
    centerColor = 0xffd700,
    flameColor = 0xffeb3b,
    size = 1
  } = options

  const diyaGroup = new THREE.Group()

  // Center bowl
  const centerGeometry = new THREE.SphereGeometry(0.5 * size, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
  const centerMaterial = new THREE.MeshStandardMaterial({
    color: centerColor,
    metalness: 0.6,
    roughness: 0.4
  })
  const center = new THREE.Mesh(centerGeometry, centerMaterial)
  center.position.y = 0
  center.castShadow = true
  diyaGroup.add(center)

  // Petals (8 petals around)
  const petalGeometry = new THREE.SphereGeometry(0.4 * size, 16, 16, 0, Math.PI, 0, Math.PI / 2)
  const petalMaterial = new THREE.MeshStandardMaterial({
    color: petalColor,
    metalness: 0.5,
    roughness: 0.5
  })

  for (let i = 0; i < 8; i++) {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial)
    const angle = (i / 8) * Math.PI * 2
    petal.position.x = Math.cos(angle) * 0.6 * size
    petal.position.z = Math.sin(angle) * 0.6 * size
    petal.position.y = -0.1 * size
    petal.rotation.y = angle
    petal.rotation.x = Math.PI / 6
    petal.castShadow = true
    diyaGroup.add(petal)
  }

  // Flame
  const flame = createFlame(flameColor, size)
  flame.position.y = 0.6 * size
  diyaGroup.add(flame)

  return diyaGroup
}

/**
 * Create a modern geometric diya
 * @param {Object} options - Customization options
 * @returns {THREE.Group} - Complete diya group
 */
export function createModernDiya(options = {}) {
  const {
    bodyColor = 0x00d4ff,
    accentColor = 0xffd700,
    flameColor = 0xffeb3b,
    size = 1
  } = options

  const diyaGroup = new THREE.Group()

  // Hexagonal base
  const baseGeometry = new THREE.CylinderGeometry(0.8 * size, 1 * size, 0.3 * size, 6)
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: bodyColor,
    metalness: 0.8,
    roughness: 0.2
  })
  const base = new THREE.Mesh(baseGeometry, baseMaterial)
  base.position.y = 0
  base.castShadow = true
  diyaGroup.add(base)

  // Top bowl
  const bowlGeometry = new THREE.ConeGeometry(0.6 * size, 0.5 * size, 6)
  const bowlMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    metalness: 0.7,
    roughness: 0.3
  })
  const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial)
  bowl.position.y = 0.4 * size
  bowl.rotation.y = Math.PI / 6
  bowl.castShadow = true
  diyaGroup.add(bowl)

  // Flame
  const flame = createFlame(flameColor, size)
  flame.position.y = 0.9 * size
  diyaGroup.add(flame)

  return diyaGroup
}

/**
 * Create a star-shaped diya
 * @param {Object} options - Customization options
 * @returns {THREE.Group} - Complete diya group
 */
export function createStarDiya(options = {}) {
  const {
    starColor = 0xffd700,
    centerColor = 0xff6b35,
    flameColor = 0xffeb3b,
    size = 1
  } = options

  const diyaGroup = new THREE.Group()

  // Star base using multiple triangular prisms
  for (let i = 0; i < 5; i++) {
    const pointGeometry = new THREE.ConeGeometry(0.3 * size, 0.6 * size, 3)
    const pointMaterial = new THREE.MeshStandardMaterial({
      color: starColor,
      metalness: 0.7,
      roughness: 0.3
    })
    const point = new THREE.Mesh(pointGeometry, pointMaterial)
    const angle = (i / 5) * Math.PI * 2
    point.position.x = Math.cos(angle) * 0.7 * size
    point.position.z = Math.sin(angle) * 0.7 * size
    point.position.y = 0
    point.rotation.y = angle + Math.PI / 2
    point.rotation.z = Math.PI / 2
    point.castShadow = true
    diyaGroup.add(point)
  }

  // Center bowl
  const centerGeometry = new THREE.SphereGeometry(0.5 * size, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
  const centerMaterial = new THREE.MeshStandardMaterial({
    color: centerColor,
    metalness: 0.6,
    roughness: 0.4
  })
  const center = new THREE.Mesh(centerGeometry, centerMaterial)
  center.position.y = 0.1 * size
  center.castShadow = true
  diyaGroup.add(center)

  // Flame
  const flame = createFlame(flameColor, size)
  flame.position.y = 0.7 * size
  diyaGroup.add(flame)

  return diyaGroup
}

/**
 * Create an animated flame
 * @param {number} color - Flame color
 * @param {number} size - Size multiplier
 * @returns {THREE.Group} - Flame group with light
 */
function createFlame(color, size = 1) {
  const flameGroup = new THREE.Group()

  // Flame mesh (cone)
  const flameGeometry = new THREE.ConeGeometry(0.15 * size, 0.6 * size, 8)
  const flameMaterial = new THREE.MeshStandardMaterial({
    color: color,
    emissive: 0xff6b00,
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.9
  })
  const flame = new THREE.Mesh(flameGeometry, flameMaterial)
  flame.position.y = 0.3 * size
  flameGroup.add(flame)

  // Inner glow
  const glowGeometry = new THREE.SphereGeometry(0.1 * size, 16, 16)
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
  })
  const glow = new THREE.Mesh(glowGeometry, glowMaterial)
  glow.position.y = 0.1 * size
  flameGroup.add(glow)

  // Point light
  const flameLight = new THREE.PointLight(0xff6b00, 3 * size, 10 * size)
  flameLight.position.set(0, 0.4 * size, 0)
  flameLight.castShadow = true
  flameGroup.add(flameLight)

  // Store references for animation
  flameGroup.userData = { flame, glow, flameLight }

  return flameGroup
}

/**
 * Animate a flame (call this in your animation loop)
 * @param {THREE.Group} flameGroup - Flame group to animate
 * @param {number} time - Elapsed time
 */
export function animateFlame(flameGroup, time) {
  if (!flameGroup.userData.flame) return

  const { flame, glow, flameLight } = flameGroup.userData

  // Flickering effect
  flame.scale.y = 1 + Math.sin(time * 10) * 0.1
  flame.scale.x = 1 + Math.sin(time * 8) * 0.05
  flame.scale.z = 1 + Math.sin(time * 8) * 0.05

  // Glow pulsing
  glow.scale.setScalar(1 + Math.sin(time * 5) * 0.2)

  // Light intensity flickering
  flameLight.intensity = 3 + Math.sin(time * 10) * 0.5
}

/**
 * Quick helper to create a random diya
 * @returns {THREE.Group} - Random diya
 */
export function createRandomDiya() {
  const styles = [
    createTraditionalDiya,
    createLotusDiya,
    createModernDiya,
    createStarDiya
  ]
  
  const randomStyle = styles[Math.floor(Math.random() * styles.length)]
  return randomStyle()
}

// Export all styles
export const diyaStyles = {
  traditional: createTraditionalDiya,
  lotus: createLotusDiya,
  modern: createModernDiya,
  star: createStarDiya,
  random: createRandomDiya
}
