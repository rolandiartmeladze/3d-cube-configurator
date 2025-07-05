import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setPixelRatio(window.devicePixelRatio);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height, false);
});
