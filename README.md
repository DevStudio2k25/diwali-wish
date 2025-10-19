# 🪔 3D Personalized Diwali Greeting Website

A beautiful, interactive 3D Diwali greeting website built with Vite, Vanilla JavaScript, and Three.js.

## 🌐 Live Demo

**🔗 [https://devstudio2k25.github.io/diwali-wish/](https://devstudio2k25.github.io/diwali-wish/)**

Try it now:
- [English Greeting](https://devstudio2k25.github.io/diwali-wish/?n=Rahul&lang=english)
- [Hindi Greeting](https://devstudio2k25.github.io/diwali-wish/?n=राहुल&lang=hindi)

## ✨ Features

- **3D Animated Diya** - Glowing diya with flickering flame effect (supports custom 3D models!)
- **Floating Particles** - Golden particles floating around the scene
- **Personalized Messages** - Full Hindi & English Diwali messages
- **Dual Names** - Sender (From) and Receiver (To) names
- **Language Selection** - Choose Hindi or English message before generating link
- **Share Functionality** - Share on Twitter and WhatsApp
- **Music Toggle** - Optional ambient background music
- **Responsive Design** - Works on all devices
- **SEO Optimized** - Meta tags for social sharing
- **Custom 3D Models** - Easy to add your own downloaded 3D models

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Test Personalized Link
Try: `http://localhost:5173/?n=Rahul&lang=english`
Or Hindi: `http://localhost:5173/?n=राहुल&lang=hindi`

## 📦 Build for Production

```bash
npm run build
```

The `dist` folder will contain your production-ready files.

## 🌐 Deploy

### GitHub Pages
1. Push your code to GitHub
2. Go to Settings > Pages
3. Select "GitHub Actions" as source
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v1
        id: deployment
```

### Netlify
1. Run `npm run build`
2. Drag the `dist` folder to Netlify
3. Or connect your GitHub repo for auto-deployment

## 🎨 Customization

### Change Colors
Edit CSS variables in `src/style.css`:
```css
:root {
  --primary-gold: #ffd700;
  --primary-orange: #ff6b35;
  --deep-purple: #1a0033;
}
```

### Modify 3D Scene
Edit Three.js setup in `src/main.js`:
- Adjust diya size, colors, and materials
- Change particle count and behavior
- Modify lighting and camera position

## 📱 Usage

1. **View Greeting**: Open the site to see the default greeting
2. **Create Personal Link**: 
   - Enter YOUR name
   - Select language (Hindi or English)
   - Click "Generate My Link"
   - Link copied automatically!
3. **Share**: Use Twitter or WhatsApp buttons to share
4. **Music**: Click the music toggle button to play/pause ambient sound

## 🎨 Lightweight Diya Styles

No need to download heavy 3D models! We have **4 procedural diya styles** built with code:

- 🪔 **Traditional** - Classic golden diya (default)
- 🌸 **Lotus** - Beautiful flower-shaped diya
- ⭐ **Star** - Festive 5-pointed star diya
- 🔷 **Modern** - Contemporary hexagonal design

**📖 See `EASY_DIYA_SWITCH.md` for copy-paste ready code!**

All styles are:
- ✅ Super lightweight (few KB)
- ✅ Instant loading
- ✅ Fully customizable colors
- ✅ No downloads needed!

## 🎨 Add Custom 3D Models

Want to use your own 3D diya models? Check out the detailed guide:

**📖 See `3D_MODELS_GUIDE.md` for complete instructions!**

Quick steps:
1. Download free models from Sketchfab or Free3D
2. Place `.glb` files in `public/models/` folder
3. Models will load automatically!

Example sources:
- https://sketchfab.com/search?q=diya&type=models
- https://free3d.com/3d-models/diya

## 🛠️ Tech Stack

- **Vite** - Fast build tool
- **Three.js** - 3D graphics library
- **Vanilla JavaScript** - No framework overhead
- **CSS3** - Modern animations and effects

## 📄 License

MIT License - Feel free to use for personal or commercial projects!

## 🎉 Happy Diwali! ✨

May this festival bring light, love, and prosperity to all!
