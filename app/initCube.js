import { createScene } from '../core/scene.js';
import { createCamera } from '../core/camera.js';
import { createRenderer } from '../core/renderer.js';
import { createControls } from '../core/controls.js';
import { cube, updateCubeMaterial, updateCubeSize, setupSpeedControl } from '../objects/cube.js';
import { setupTextureSwitcher } from '../ui/textureSwitcher.js';
import { rotationSpeed } from '../objects/cube.js';

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
        cube.rotation.x += rotationSpeed;
        cube.rotation.y += rotationSpeed;

        controls.update();
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    setupTextureSwitcher(updateCubeMaterial);
    updateCubeSize(cube);
    setupSpeedControl();
}
