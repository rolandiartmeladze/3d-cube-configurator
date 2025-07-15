import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

const faceColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
const colorMaterials = faceColors.map(color => new THREE.MeshStandardMaterial({ color }));

const geometry = new THREE.BoxGeometry(3, 3, 3);
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
