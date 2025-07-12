import { createScene } from '../core/scene.js';
import { createCamera } from '../core/camera.js';
import { createRenderer } from '../core/renderer.js';
import { createControls } from '../core/controls.js';
import { sphere } from '../objects/sphere.js';

export function initText() {
    const canvas = document.querySelector('#text');
    const scene = createScene();
    const renderer = createRenderer(canvas);
    const camera = createCamera(canvas.clientWidth / canvas.clientHeight);
    const controls = createControls(camera, renderer);

    const getSphere = sphere({ hue: 0.55 });
    scene.add(getSphere);

    function animate() {
        controls.update();
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
}