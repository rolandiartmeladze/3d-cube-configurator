// This component is adapted from a public code sample by another developer.
// It's used in my project for learning how 3D animation and vertex color logic works.

import * as THREE from "three";

// Create a background sphere using IcosahedronGeometry
export function sphere({ hue = 0.565, lightnessMult = 0.015 } = {}) {
  const sphereGeo = new THREE.IcosahedronGeometry(3.5, 4);

  // Use a basic material with vertex colors and visible inner surface
  const sphereMat = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    vertexColors: true,
    fog: false,
  });

  // Generate vertex-based colors depending on Z position
  const sphereColors = [];
  const len = sphereGeo.attributes.position.count;

  for (let i = 0; i < len; i++) {
    const z = -sphereGeo.attributes.position.getZ(i);
    const { r, g, b } = new THREE.Color().setHSL(hue, 1, z * lightnessMult);
    sphereColors.push(r, g, b);
  }

  // Apply vertex colors to the geometry
  sphereGeo.setAttribute("color", new THREE.Float32BufferAttribute(sphereColors, 3));

  // Return the final mesh
  return new THREE.Mesh(sphereGeo, sphereMat);
}
