# 🪔 Diya Styles Guide - No Downloads Needed!

## ✨ Lightweight 3D Diyas - Built with Code!

Forget downloading heavy 3D models! Use our **procedural diya builder** to create beautiful diyas with just code. Super lightweight and fully customizable!

## 🎨 Available Styles

### 1. Traditional Diya (Default)
Classic Indian diya with golden colors
```javascript
import { createTraditionalDiya } from './diyaBuilder.js'

const diya = createTraditionalDiya({
  baseColor: 0xd4af37,    // Gold
  bowlColor: 0xffd700,    // Bright gold
  flameColor: 0xffeb3b,   // Yellow
  size: 1
})
```

### 2. Lotus Diya
Beautiful lotus-shaped diya with petals
```javascript
import { createLotusDiya } from './diyaBuilder.js'

const diya = createLotusDiya({
  petalColor: 0xff69b4,   // Pink
  centerColor: 0xffd700,  // Gold
  flameColor: 0xffeb3b,   // Yellow
  size: 1
})
```

### 3. Modern Geometric Diya
Contemporary hexagonal design
```javascript
import { createModernDiya } from './diyaBuilder.js'

const diya = createModernDiya({
  bodyColor: 0x00d4ff,    // Cyan
  accentColor: 0xffd700,  // Gold
  flameColor: 0xffeb3b,   // Yellow
  size: 1
})
```

### 4. Star Diya
Star-shaped festive diya
```javascript
import { createStarDiya } from './diyaBuilder.js'

const diya = createStarDiya({
  starColor: 0xffd700,    // Gold
  centerColor: 0xff6b35,  // Orange
  flameColor: 0xffeb3b,   // Yellow
  size: 1
})
```

### 5. Random Diya
Get a random style each time!
```javascript
import { createRandomDiya } from './diyaBuilder.js'

const diya = createRandomDiya()
```

## 🚀 How to Use in Your Project

### Step 1: Replace the diya in main.js

Open `src/main.js` and find the diya creation section (around line 50).

**Replace this:**
```javascript
// ===== CREATE 3D DIYA =====
const diyaGroup = new THREE.Group()

// Diya base (torus)
const diyaBaseGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 32)
// ... rest of the old code
```

**With this:**
```javascript
// ===== CREATE 3D DIYA =====
import { createTraditionalDiya, animateFlame } from './diyaBuilder.js'

const diyaGroup = createTraditionalDiya({
  baseColor: 0xd4af37,
  bowlColor: 0xffd700,
  flameColor: 0xffeb3b,
  size: 1
})
diyaGroup.position.y = -1
scene.add(diyaGroup)
```

### Step 2: Update the animation loop

Find the `animate()` function and update the flame animation:

**Replace this:**
```javascript
// Flickering flame effect
flame.scale.y = 1 + Math.sin(elapsedTime * 10) * 0.1
flameLight.intensity = 3 + Math.sin(elapsedTime * 10) * 0.5
```

**With this:**
```javascript
// Animate flame
const flameGroup = diyaGroup.children.find(child => child.userData.flame)
if (flameGroup) {
  animateFlame(flameGroup, elapsedTime)
}
```

## 🎨 Color Customization

Use hex colors to customize your diya:

```javascript
// Golden traditional
createTraditionalDiya({ baseColor: 0xffd700, bowlColor: 0xffeb3b })

// Silver modern
createModernDiya({ bodyColor: 0xc0c0c0, accentColor: 0xffffff })

// Pink lotus
createLotusDiya({ petalColor: 0xff1493, centerColor: 0xff69b4 })

// Rainbow star
createStarDiya({ starColor: 0xff00ff, centerColor: 0x00ffff })
```

### Popular Color Codes:
- Gold: `0xffd700`
- Silver: `0xc0c0c0`
- Bronze: `0xcd7f32`
- Red: `0xff0000`
- Orange: `0xff6b35`
- Pink: `0xff69b4`
- Purple: `0x9b59b6`
- Blue: `0x3498db`
- Green: `0x2ecc71`

## 📦 Complete Example

Here's a complete working example:

```javascript
// At the top of main.js
import './style.css'
import * as THREE from 'three'
import { createLotusDiya, animateFlame } from './diyaBuilder.js'

// ... scene setup code ...

// Create lotus diya
const diyaGroup = createLotusDiya({
  petalColor: 0xff69b4,
  centerColor: 0xffd700,
  flameColor: 0xffeb3b,
  size: 1.2  // Make it bigger
})
diyaGroup.position.y = -1
scene.add(diyaGroup)

// In animation loop
function animate() {
  const elapsedTime = clock.getElapsedTime()
  
  // Rotate diya
  diyaGroup.rotation.y = elapsedTime * 0.2
  
  // Animate flame
  const flameGroup = diyaGroup.children.find(child => child.userData.flame)
  if (flameGroup) {
    animateFlame(flameGroup, elapsedTime)
  }
  
  // ... rest of animation code ...
}
```

## 🎯 Multiple Diyas

Want multiple diyas? Easy!

```javascript
// Create 3 diyas in a row
const styles = [createTraditionalDiya, createLotusDiya, createStarDiya]

styles.forEach((createStyle, index) => {
  const diya = createStyle({ size: 0.8 })
  diya.position.set((index - 1) * 3, -1, 0)
  scene.add(diya)
})
```

## 💡 Why Use This Instead of Downloaded Models?

✅ **Super Lightweight** - No large .glb files to download  
✅ **Instant Loading** - No waiting for model downloads  
✅ **Fully Customizable** - Change colors, size, everything!  
✅ **No Copyright Issues** - It's your code  
✅ **Easy to Modify** - Just change parameters  
✅ **Multiple Styles** - Switch styles with one line  

## 🔥 Pro Tips

1. **Mix and Match**: Use different styles for variety
2. **Animate Rotation**: Make diyas spin slowly
3. **Add More Lights**: Each diya has its own light
4. **Scale Up/Down**: Use `size` parameter to adjust
5. **Random Colors**: Generate random colors for fun effects

## 🎊 Ready to Use!

No downloads needed! Just import and use. The diyas are created procedurally using Three.js primitives, so they're super fast and lightweight!

Happy Diwali! 🪔✨
