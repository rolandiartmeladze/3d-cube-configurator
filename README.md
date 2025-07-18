# ✨ Interactive 3D Cube Configurator with Animated Text

This web-based application provides an interactive 3D visualization tool for configuring a **cube** and viewing a **glass-style 3D text** with animated outlines. It is built with **Three.js** and a modular architecture using **Vite** for fast development.

---

https://3d-cube-configurator.vercel.app/

![video-gif](https://github.com/user-attachments/assets/a0d22db0-135b-422a-9eb2-50add7dac3ad)


## 🚀 Features

### 🧱 Core 3D Elements

- **Interactive 3D Cube**
  - Customizable size, rotation, and texture
  - Real-time updates
- **Animated 3D Text Component**
  - Glass-like appearance using `MeshPhysicalMaterial`
  - Smooth outline animation using `Line2`, `LineMaterial`, and `LineGeometry`
  - Cyclical glow/fade effect synchronized with outline

### 🧪 Visual & Interactive Design

- Orbit controls (zoom, pan, rotate)
- Animated background sphere with dynamic vertex colors
- Live resizing support
- Responsive and optimized for modern browsers

---

## 🛠️ Tech Stack

| Tool / Library    | Purpose                                |
|-------------------|----------------------------------------|
| **Three.js**      | 3D rendering engine                    |
| **Vite**          | Build tool for fast development        |
| **Vanilla JS**    | Logic, animation, and scene control    |
| **HTML/CSS**      | Layout and canvas rendering            |
| **Line2 / LineMaterial** | Outline animation for 3D shapes |

---

## 📁 Updated Folder Structure

```bash
├── index.html
├── style.css
├── main.js
├── app/
│   ├── initCube.js
│   └── init3DText.js
├── core/
│   ├── camera.js
│   ├── controls.js
│   ├── renderer.js
│   └── scene.js
├── objects/
│   ├── cube.js
│   ├── sphere.js
│   ├── text.js
│   └── textOutline.js
├── ui/
│   └── textureSwitcher.js
├── public/textures/
│   ├── wood.jpg
│   ├── metal.jpg
│   ├── ice.jpg
│   └── example.webp
├── public/font/
│   └── ChakraPetch-Bold.typeface.json
├── jsconfig.json
├── package.json
└── README.md
```
---

## 💡 Recent Update: Animated 3D Text

The latest update introduces a new **Text3D component** that enhances the scene with:

- Modular text group creation using `TextGeometry`
- Smooth outline drawing via `Line2` with dash animations
- Timed phases for:
  - Initial full glow & outline
  - Fade-out of glow & stroke
  - Pause phase
  - Re-draw outline progressively
  - Fade-in glow and final state
- Lightweight and reusable function for adding animated text to any scene

The text component can be fully customized and controlled via the main animation loop (`group.userData.update(time)`), enabling seamless integration into any animated sequence.

---

## 🖼️ Visual Behavior Overview

| Phase             | Description                             |
|------------------|-----------------------------------------|
| **Start**         | Full glow + outline visible             |
| **Fade Out**      | Both glow and stroke gradually fade     |
| **Pause**         | Text remains off briefly                |
| **Redraw Outline**| Stroke reappears with dash animation    |
| **Glow Fade-In**  | Emissive glow rises to full intensity   |

---

## 🔄 How to Run

```bash
# Clone and install
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔍 Notes

- All modules follow a single-responsibility structure
- `update()` functions are used to allow time-based animation in a clean way
- Ready for future enhancements: reflections, post-processing, custom shaders

---

## 📸 Preview (optional)

Soon ...
