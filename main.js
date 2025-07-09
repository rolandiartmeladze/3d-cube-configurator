import { scene } from './core/scene.js';
import { camera } from './core/camera.js';
import { renderer } from './core/renderer.js';
import { controls } from './core/controls.js';
import { cube, updateCubeMaterial } from './objects/cube.js';
import { setupTextureSwitcher } from './ui/textureSwitcher.js';

scene.add(cube);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  const width = renderer.domElement.clientWidth;
  const height = renderer.domElement.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
});

setupTextureSwitcher(updateCubeMaterial);
