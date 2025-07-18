import * as THREE from 'three';

export let rotationSpeed = 0.01;

const textureLoader = new THREE.TextureLoader();

const faceColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
const colorMaterials = faceColors.map(color => new THREE.MeshStandardMaterial({ color }));

const geometry = new THREE.BoxGeometry(2, 2, 2);
export const cube = new THREE.Mesh(geometry, colorMaterials);

const textures = {
  wood: textureLoader.load('/textures/wood.jpg'),
  metal: textureLoader.load('/textures/metal.jpg'),
  ice: textureLoader.load('/textures/ice.jpg'),
};

export function updateCubeMaterial(type) {
  if (textures[type]) {
    const texture = textures[type];
    const texturedMaterials = Array(6).fill().map(() =>
      new THREE.MeshStandardMaterial({ map: texture, color: 0xffffff })
    );
    cube.material = texturedMaterials;
  } else {
    cube.material = colorMaterials;
  }

  if (Array.isArray(cube.material)) {
    cube.material.forEach(mat => mat.needsUpdate = true);
  } else {
    cube.material.needsUpdate = true;
  }
}

export function updateCubeSize(cube) {
  const setSize = document.getElementById("sizeSelect");
  setSize.addEventListener("change", (event) => {
    const selected = event.target.value;
    let size = [2, 2, 2];
    if (selected === "sm") {
      size = [0.5, 0.5, 0.5];
    } else if (selected === "xl") {
      size = [1.5, 1.5, 1.5];
    } else if (selected == "normal") {
      size = [1, 1, 1];
    }
    cube.scale.set(...size);
  })
}


export function setupSpeedControl() {
  const speedSelect = document.getElementById("speedSelect");

  speedSelect.addEventListener("change", (event) => {
    const value = event.target.value;

    if (value === "sm") {
      rotationSpeed = 0.08;
    } else if (value === "xl") {
      rotationSpeed = 0.15;
    } else {
      rotationSpeed = 0.01;
    }
  });
}