import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    return scene;
}
