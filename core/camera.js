import * as THREE from 'three';

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(
    75,
    aspect,
    0.1,
    1000
  );
  camera.position.z = 5;
  return camera;
}
