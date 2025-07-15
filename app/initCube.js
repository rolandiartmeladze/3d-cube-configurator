import { createScene } from '../core/scene.js';
import { createCamera } from '../core/camera.js';
import { createRenderer } from '../core/renderer.js';
import { createControls } from '../core/controls.js';
import { cube, updateCubeMaterial } from '../objects/cube.js';
import { setupTextureSwitcher } from '../ui/textureSwitcher.js';

export function initCube() {
    const canvas = document.querySelector('#cube');
    const scene = createScene();
    const renderer = createRenderer(canvas);
    const camera = createCamera(canvas.clientWidth / canvas.clientHeight);
    const controls = createControls(camera, renderer);

    scene.add(cube);

    function resize() {
        const { width, height } = canvas.getBoundingClientRect();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    window.addEventListener('resize', resize);

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update();
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    setupTextureSwitcher(updateCubeMaterial);
}
