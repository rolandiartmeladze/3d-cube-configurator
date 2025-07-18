import { createScene } from '../core/scene.js';
import { createCamera } from '../core/camera.js';
import { createRenderer } from '../core/renderer.js';
import { createControls } from '../core/controls.js';
import { sphere } from '../objects/sphere.js';
import { Text3D } from '../objects/text.js';

export function initText() {
    const canvas = document.querySelector('#text');
    const slider = document.querySelector('#colorSlider');
    const startAnimation = document.getElementById("reset");

    const scene = createScene();
    const renderer = createRenderer(canvas);
    const camera = createCamera(canvas.clientWidth / canvas.clientHeight);
    const controls = createControls(camera, renderer);

    const getSphere = sphere();
    scene.add(getSphere);

    slider.addEventListener('input', (e) => {
        const hue = parseFloat(e.target.value) / 100;
        getSphere.userData.setHue(hue);
        startAnimation.classList.add("bg-red-600/60")
    });

    let textGroup = null;

    Text3D({
        message: 'Roland',
        onLoad: (loadedGroup) => {
            textGroup = loadedGroup;
            scene.add(textGroup);
        }
    });

    function animate(time) {
        getSphere.userData.update(time);
        textGroup?.userData.update?.(time);
        controls.update();
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
}
