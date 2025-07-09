import * as THREE from 'three';

const canvas = document.querySelector('#webgl');

export const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});

const width = canvas.clientWidth;
const height = canvas.clientHeight;

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
