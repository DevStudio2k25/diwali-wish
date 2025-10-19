import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * 3D Model Loader for Diwali Assets
 * 
 * HOW TO USE:
 * 1. Download 3D models from these FREE sources:
 *    - Sketchfab: https://sketchfab.com/search?q=diya&type=models (Filter: Downloadable)
 *    - Free3D: https://free3d.com/3d-models/diya
 *    - CGTrader: https://www.cgtrader.com/free-3d-models/diya
 * 
 * 2. Download models in GLTF (.gltf or .glb) format
 * 
 * 3. Place your downloaded models in the 'public/models/' folder:
 *    - public/models/diya.glb
 *    - public/models/lamp.glb
 *    - public/models/rangoli.glb
 * 
 * 4. Use the loadModel() function to load them in main.js
 */

const loader = new GLTFLoader()

/**
 * Load a 3D model
 * @param {string} modelPath - Path to model file (e.g., '/models/diya.glb')
 * @param {THREE.Scene} scene - Three.js scene to add model to
 * @param {Object} options - Optional settings (position, scale, rotation)
 * @returns {Promise} - Resolves with the loaded model
 */
export function loadModel(modelPath, scene, options = {}) {
  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene
        
        // Apply options
        if (options.position) {
          model.position.set(
            options.position.x || 0,
            options.position.y || 0,
            options.position.z || 0
          )
        }
        
        if (options.scale) {
          const scale = options.scale
          model.scale.set(scale, scale, scale)
        }
        
        if (options.rotation) {
          model.rotation.set(
            options.rotation.x || 0,
            options.rotation.y || 0,
            options.rotation.z || 0
          )
        }
        
        // Enable shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        
        scene.add(model)
        console.log('✅ Model loaded successfully:', modelPath)
        resolve(model)
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100
        console.log(`Loading model: ${percent.toFixed(2)}%`)
      },
      (error) => {
        console.error('❌ Error loading model:', error)
        reject(error)
      }
    )
  })
}

/**
 * Example usage in main.js:
 * 
 * import { loadModel } from './modelLoader.js'
 * 
 * // Load a diya model
 * loadModel('/models/diya.glb', scene, {
 *   position: { x: 0, y: -1, z: 0 },
 *   scale: 2,
 *   rotation: { x: 0, y: Math.PI / 4, z: 0 }
 * }).then((model) => {
 *   // Model loaded! You can animate it here
 *   console.log('Diya model loaded!')
 * }).catch((error) => {
 *   console.log('Using default primitive diya instead')
 * })
 */
