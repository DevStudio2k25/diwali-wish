# 🎨 3D Models Guide - Diwali Website

## 📥 Where to Download FREE 3D Models

### Best Sources for Diwali 3D Models:

1. **Sketchfab** (Best Quality)
   - URL: https://sketchfab.com/search?q=diya&type=models
   - Filter by: "Downloadable" + "Free"
   - Search terms: "diya", "diwali lamp", "oil lamp", "rangoli", "fireworks"
   - Format: Download as GLTF (.glb)

2. **Free3D**
   - URL: https://free3d.com/3d-models/diya
   - Search: "diya", "indian lamp", "oil lamp"
   - Format: Look for GLTF/GLB files

3. **CGTrader Free Models**
   - URL: https://www.cgtrader.com/free-3d-models/diya
   - Filter: Free models only
   - Format: GLTF/GLB preferred

4. **TurboSquid Free**
   - URL: https://www.turbosquid.com/Search/3D-Models/free/diya
   - Filter: Free models
   - Format: GLTF/GLB

5. **Poly Pizza** (Google Poly Archive)
   - URL: https://poly.pizza/
   - Search: "lamp", "candle", "light"

## 📁 Folder Structure

Create this folder in your project:

```
your-project/
├── public/
│   └── models/          ← Create this folder
│       ├── diya.glb     ← Put your downloaded models here
│       ├── lamp.glb
│       └── rangoli.glb
├── src/
│   ├── main.js
│   ├── modelLoader.js   ← Already created for you
│   └── style.css
└── index.html
```

## 🚀 How to Add Models to Your Project

### Step 1: Create the models folder
```bash
mkdir public\models
```

### Step 2: Download a model
1. Go to Sketchfab: https://sketchfab.com/3d-models/diya-oil-lamp-c3b6d6c0e3f44e8a9b3c8f5e7d9a1b2c
2. Click "Download 3D Model"
3. Select "glTF" format
4. Extract the downloaded ZIP file
5. Find the `.glb` file inside

### Step 3: Copy model to your project
Copy the `.glb` file to `public/models/diya.glb`

### Step 4: Update main.js to use the model

Add this at the top of `src/main.js`:
```javascript
import { loadModel } from './modelLoader.js'
```

Then REPLACE the diya creation code with:
```javascript
// ===== LOAD 3D DIYA MODEL =====
const diyaGroup = new THREE.Group()
scene.add(diyaGroup)

// Try to load custom 3D model
loadModel('/models/diya.glb', diyaGroup, {
  position: { x: 0, y: -1, z: 0 },
  scale: 2,
  rotation: { x: 0, y: 0, z: 0 }
}).then((model) => {
  console.log('✅ Custom diya model loaded!')
  
  // Add flame on top of the model
  const flameGeometry = new THREE.ConeGeometry(0.15, 0.6, 8)
  const flameMaterial = new THREE.MeshStandardMaterial({
    color: 0xffeb3b,
    emissive: 0xff6b00,
    emissiveIntensity: 2
  })
  const flame = new THREE.Mesh(flameGeometry, flameMaterial)
  flame.position.y = 1
  diyaGroup.add(flame)
  
  const flameLight = new THREE.PointLight(0xff6b00, 3, 10)
  flameLight.position.set(0, 1.2, 0)
  diyaGroup.add(flameLight)
  
}).catch((error) => {
  console.log('⚠️ Using default primitive diya')
  // Keep the existing primitive diya code as fallback
})
```

## 🎯 Quick Example - Complete Code

Here's the complete code to add to your `main.js`:

```javascript
import { loadModel } from './modelLoader.js'

// After scene setup, replace the diya creation with:

const diyaGroup = new THREE.Group()
diyaGroup.position.y = -1
scene.add(diyaGroup)

// Load custom model (will fallback to primitive if not found)
loadModel('/models/diya.glb', diyaGroup, {
  scale: 2
}).catch(() => {
  // Fallback: Create primitive diya
  const diyaBaseGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 32)
  const diyaBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.7,
    roughness: 0.3
  })
  const diyaBase = new THREE.Mesh(diyaBaseGeometry, diyaBaseMaterial)
  diyaBase.rotation.x = Math.PI / 2
  diyaGroup.add(diyaBase)
})

// Add flame (works with both custom and primitive diya)
const flameGeometry = new THREE.ConeGeometry(0.15, 0.6, 8)
const flameMaterial = new THREE.MeshStandardMaterial({
  color: 0xffeb3b,
  emissive: 0xff6b00,
  emissiveIntensity: 2
})
const flame = new THREE.Mesh(flameGeometry, flameMaterial)
flame.position.y = 1
diyaGroup.add(flame)

const flameLight = new THREE.PointLight(0xff6b00, 3, 10)
flameLight.position.set(0, 1.2, 0)
diyaGroup.add(flameLight)
```

## 🎨 Recommended Models to Download

Search these on Sketchfab:
1. **"Diya oil lamp"** - Traditional Indian lamp
2. **"Rangoli"** - Floor decoration
3. **"Lotus lamp"** - Decorative lamp
4. **"Candle holder"** - Alternative to diya

## ⚙️ Model Settings

Adjust these values based on your model:

```javascript
{
  position: { x: 0, y: -1, z: 0 },  // Move up/down/left/right
  scale: 2,                          // Make bigger/smaller
  rotation: { x: 0, y: 0, z: 0 }    // Rotate the model
}
```

## 🐛 Troubleshooting

**Model not showing?**
- Check console for errors (F12 in browser)
- Verify file path: `/models/diya.glb` (must be in `public/models/`)
- Try different scale values (0.5, 1, 2, 5)
- Check if model is too big/small

**Model is black?**
- Add more lights to the scene
- Check if model has textures included

**Model is upside down?**
- Adjust rotation: `rotation: { x: Math.PI, y: 0, z: 0 }`

## 📦 Install Required Loader

The GLTFLoader is already included in Three.js, but make sure you have it:

```bash
npm install three
```

That's it! Your custom 3D models will now load automatically! 🎉
