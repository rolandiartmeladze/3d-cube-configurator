import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

const textureSelect = document.querySelector('#textureSelect');
const textureLoader = new THREE.TextureLoader();


const texturePreview = document.getElementById('texturePreview');
const textureLabel = document.getElementById('textureLabel');

const previewInfo = {
  none: {
    src: '/textures/example.webp',
    label: 'Colors Texture',
  },
  wood: {
    src: '/textures/wood.jpg',
    label: 'Wood Texture',
  },
  metal: {
    src: '/textures/metal.jpg',
    label: 'Metal Texture',
  },
  ice: {
    src: '/textures/ice.jpg',
    label: 'Ice Texture',
  },
};

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

const faceColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
const materials = faceColors.map(color => new THREE.MeshStandardMaterial({ color }));

const geometry = new THREE.BoxGeometry(1, 1, 1);

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 1, 5);
scene.add(ambientLight);

const textures = {
  none: null,
  wood: textureLoader.load('/textures/wood.jpg'),
  metal: textureLoader.load('/textures/metal.jpg'),
  ice: textureLoader.load('/textures/ice.jpg')
};

textureSelect.addEventListener('change', (event) => {
  const selectedTexture = event.target.value;

  if (textures[selectedTexture]) {
    const texture = textures[selectedTexture];
    const texturedMaterials = Array(6).fill().map(() =>
      new THREE.MeshStandardMaterial({
        map: texture,
        color: 0xffffff
      })
    );
    cube.material = texturedMaterials;
  } else if (selectedTexture === 'none') {
    cube.material = materials;
  }

  cube.material.forEach((mat) => mat.needsUpdate = true);

  const preview = previewInfo[selectedTexture];
  if (preview) {
    texturePreview.src = preview.src;
    textureLabel.textContent = preview.label;
  }
});


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
