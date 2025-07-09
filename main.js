import { scene } from './core/scene.js';
import { camera } from './core/camera.js';
import { renderer } from './core/renderer.js';
import { controls } from './core/controls.js';
import { cube, updateCubeMaterial } from './objects/cube.js';
import { setupTextureSwitcher } from './ui/textureSwitcher.js';
import './global.css';

scene.add(cube);

function resizeRenderer() {
  const canvas = document.querySelector('#webgl');
  const { width, height } = canvas.getBoundingClientRect();

  renderer.setSize(width, height, false);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

resizeRenderer();

window.addEventListener('resize', resizeRenderer);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

setupTextureSwitcher(updateCubeMaterial);
