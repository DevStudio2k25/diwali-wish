# 🎨 Easy Diya Style Switch - Copy Paste Ready!

## Super Simple - Just Copy & Paste!

Koi download nahi chahiye! Bas ye code copy karo aur paste karo!

---

## 🪔 Option 1: Traditional Diya (Current - Default)

Already in your code! Golden traditional diya.

---

## 🌸 Option 2: Lotus Diya (Pink & Beautiful)

**Step 1:** Add this import at the TOP of `src/main.js`:
```javascript
import { createLotusDiya, animateFlame } from './diyaBuilder.js'
```

**Step 2:** Find this line (around line 50):
```javascript
const diyaGroup = new THREE.Group()
```

**Step 3:** REPLACE everything from `const diyaGroup = new THREE.Group()` 
until `scene.add(diyaGroup)` with:

```javascript
const diyaGroup = createLotusDiya({
  petalColor: 0xff69b4,   // Pink petals
  centerColor: 0xffd700,  // Gold center
  flameColor: 0xffeb3b,
  size: 1
})
diyaGroup.position.y = -1
scene.add(diyaGroup)
```

**Step 4:** In the `animate()` function, REPLACE the flame animation:

Find this:
```javascript
// Flickering flame effect
flame.scale.y = 1 + Math.sin(elapsedTime * 10) * 0.1
flameLight.intensity = 3 + Math.sin(elapsedTime * 10) * 0.5
```

Replace with:
```javascript
// Animate flame
const flameGroup = diyaGroup.children.find(child => child.userData.flame)
if (flameGroup) {
  animateFlame(flameGroup, elapsedTime)
}
```

**Done!** 🎉

---

## ⭐ Option 3: Star Diya (Festive!)

**Step 1:** Add import:
```javascript
import { createStarDiya, animateFlame } from './diyaBuilder.js'
```

**Step 2:** Replace diya creation:
```javascript
const diyaGroup = createStarDiya({
  starColor: 0xffd700,    // Gold stars
  centerColor: 0xff6b35,  // Orange center
  flameColor: 0xffeb3b,
  size: 1
})
diyaGroup.position.y = -1
scene.add(diyaGroup)
```

**Step 3:** Same flame animation as Option 2

---

## 🔷 Option 4: Modern Geometric Diya

**Step 1:** Add import:
```javascript
import { createModernDiya, animateFlame } from './diyaBuilder.js'
```

**Step 2:** Replace diya creation:
```javascript
const diyaGroup = createModernDiya({
  bodyColor: 0x00d4ff,    // Cyan blue
  accentColor: 0xffd700,  // Gold
  flameColor: 0xffeb3b,
  size: 1
})
diyaGroup.position.y = -1
scene.add(diyaGroup)
```

**Step 3:** Same flame animation as Option 2

---

## 🎲 Option 5: Random Diya (Different Every Time!)

**Step 1:** Add import:
```javascript
import { createRandomDiya, animateFlame } from './diyaBuilder.js'
```

**Step 2:** Replace diya creation:
```javascript
const diyaGroup = createRandomDiya()
diyaGroup.position.y = -1
scene.add(diyaGroup)
```

**Step 3:** Same flame animation as Option 2

---

## 🎨 Custom Colors

Want different colors? Change these values:

### Color Codes:
```javascript
// Gold colors
0xffd700  // Bright gold
0xd4af37  // Dark gold
0xffeb3b  // Yellow gold

// Pink/Red
0xff69b4  // Hot pink
0xff1493  // Deep pink
0xff0000  // Red

// Blue/Cyan
0x00d4ff  // Bright cyan
0x3498db  // Blue
0x9b59b6  // Purple

// Orange
0xff6b35  // Bright orange
0xff8c00  // Dark orange
```

### Example - Red & Gold Lotus:
```javascript
const diyaGroup = createLotusDiya({
  petalColor: 0xff0000,   // Red petals
  centerColor: 0xffd700,  // Gold center
  flameColor: 0xffeb3b,
  size: 1.2  // Make it bigger!
})
```

---

## 📏 Size Adjustment

Make diya bigger or smaller:

```javascript
size: 0.5   // Half size (small)
size: 1     // Normal size
size: 1.5   // 1.5x bigger
size: 2     // Double size (big!)
```

---

## 🔥 Complete Copy-Paste Example

Sabse easy - pura code ek saath!

**Replace your entire diya section with this:**

```javascript
// ===== CREATE 3D DIYA =====
import { createLotusDiya, animateFlame } from './diyaBuilder.js'

const diyaGroup = createLotusDiya({
  petalColor: 0xff69b4,
  centerColor: 0xffd700,
  flameColor: 0xffeb3b,
  size: 1.2
})
diyaGroup.position.y = -1
scene.add(diyaGroup)
```

**And in animate() function:**

```javascript
function animate() {
  const elapsedTime = clock.getElapsedTime()
  
  // Rotate diya
  diyaGroup.rotation.y = elapsedTime * 0.2
  
  // Animate flame
  const flameGroup = diyaGroup.children.find(child => child.userData.flame)
  if (flameGroup) {
    animateFlame(flameGroup, elapsedTime)
  }
  
  // ... rest of your code
}
```

---

## ✅ Benefits

- ✅ No downloads needed
- ✅ Super fast loading
- ✅ Easy to customize
- ✅ Change anytime
- ✅ Multiple styles available

---

## 🎊 That's It!

Bas itna hi! Koi file download nahi, koi setup nahi. Just copy-paste and enjoy! 🪔✨

Try different styles and see which one you like best!
