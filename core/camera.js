import * as THREE from 'three';

const canvas = document.querySelector('#webgl');

export const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);

camera.position.z = 5;
