## Interactive 3D Cube Configurator

This simple web application allows users to interactively visualize and configure a **3D** cube. It was developed to showcase my ability to utilize new technologies like **Three.js** and **Vanilla JavaScript** in creating modern, responsive web interfaces, serving as a practical demonstration of my capabilities.

---

## 🚀 Project Setup & Current Status

The development environment for this project is now fully prepared for building the core Three.js 3D scene and interactive configurator. Key setup steps include:

- **Vite Integration:** Using Vite as a modern build tool for fast development and optimized production builds.
- **Three.js Installation:** Three.js library integrated via npm for 3D graphics.
- **IDE Configuration:** `jsconfig.json` added for enhanced developer experience and autocompletion in VS Code.

---

## 🚀 Project Features

- 🧱 **3D Cube Visualization** powered by Three.js
- 🎨 **Real-time Configuration** for:
  - Cube **color**
  - **Size/scale** along X/Y/Z axes
  - **Rotation speed**
  - Geometry adjustments (e.g., corner radius)
- 🧰 **Customizable UI panel** for parameter control
- 📱 **Responsive layout** with split view:
- 🧪 Prepared for further enhancements like lighting, materials, or model import

---

## 🛠️ Tech Stack

- **Three.js** – core 3D rendering library
- **Vite** – fast development/build tool
- **HTML/CSS** – modern, flexbox-based responsive layout
- **Vanilla JS** – lightweight interaction logic
- _(Optional: dat.GUI or custom UI controls in future iterations)_

---

### 🎯 Modular Architecture

The project is now structured in **modular ES modules**, each responsible for a specific part of the 3D scene. This includes:

- `core/scene.js` – Scene setup with lights
- `core/camera.js` – Perspective camera and dynamic aspect ratio
- `core/renderer.js` – WebGL renderer with pixel-ratio and canvas sizing logic
- `core/controls.js` – OrbitControls integration with damping
- `objects/cube.js` – Cube geometry, materials, and texture update logic
- `ui/textureSwitcher.js` – UI event listener for updating cube textures and preview panel

### 🧱 Cube Enhancements

- Added support for **default colored faces** or **dynamic textures** (wood, metal, ice)
- Dynamic texture switching using a `<select>` dropdown in the UI
- Texture preview (image + label) updates in real-time

### 🖼️ Real-Time Rendering

- Continuous animation loop using `renderer.setAnimationLoop`
- Live rotation along `x` and `y` axes
- Responsive resizing using `resize` listener with `clientWidth/clientHeight`

### 🧩 Object-Oriented Expansion

- Decoupled the logic into single-responsibility files
- Created reusable `updateCubeMaterial()` function
- Improved scalability and readability

---

## 📁 Updated Folder Structure

```bash
├── index.html
├── style.css
├── main.js
├── core/
│   ├── camera.js
│   ├── controls.js
│   ├── renderer.js
│   └── scene.js
├── objects/
│   └── cube.js
├── ui/
│   └── textureSwitcher.js
├── public/textures/
│   ├── wood.jpg
│   ├── metal.jpg
│   ├── ice.jpg
│   └── example.webp
├── jsconfig.json
├── package.json
└── README.md
```