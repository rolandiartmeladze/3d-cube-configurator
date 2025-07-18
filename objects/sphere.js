// This component is adapted from a public code sample by another developer.
// It's used in my project for learning how 3D animation and vertex color logic works.

import * as THREE from "three";

// Create a background sphere using IcosahedronGeometry
export function sphere({ hue = 0.565, lightnessMult = 0.015 } = {}) {
  const startAnimation = document.getElementById("reset");

  const sphereGeo = new THREE.IcosahedronGeometry(3.5, 4);
  const initialPositions = sphereGeo.attributes.position.array.slice();

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

  const mesh = new THREE.Mesh(sphereGeo, sphereMat);

  let currentHue = hue;
  let isAnimating = true;

  startAnimation.addEventListener("click", () => {
    startAnimation.classList.remove("bg-red-600/60");
      startAnimation.classList.add("bg-gray-600/60");    
      isAnimating = true;
  });

  //stop animation and apply a final hue with gradient
  mesh.userData.setHue = (newHue) => {
    currentHue = newHue;
    isAnimating = false;
    const colorAttr = mesh.geometry.attributes.color;
    const colorArr = colorAttr.array;

    for (let i = 0; i < len; i++) {
      const z = -sphereGeo.attributes.position.getZ(i);
      const { r, g, b } = new THREE.Color().setHSL(currentHue, 1, z * lightnessMult);
      const j = i * 3;
      colorArr[j] = r;
      colorArr[j + 1] = g;
      colorArr[j + 2] = b;
    }

    colorAttr.needsUpdate = true;
  };

  //animation (only runs if isAnimating = true)
  mesh.userData.update = (time) => {
    if (!isAnimating) return;

    const posAttr = mesh.geometry.attributes.position;
    const arr = posAttr.array;
    const colorAttr = mesh.geometry.attributes.color;
    const colorArr = colorAttr.array;

    // Animate vertex positions (wave motion)
    for (let i = 0; i < arr.length; i += 3) {
      const x = initialPositions[i];
      const y = initialPositions[i + 1];
      const z = initialPositions[i + 2];

      arr[i + 1] = y + Math.sin(time * 0.006 + x * 2 + z * 2) * 0.1;
    }
    posAttr.needsUpdate = true;

    const animatedHue = (currentHue + time * 0.0001) % 1;
    for (let i = 0; i < len; i++) {
      const z = -sphereGeo.attributes.position.getZ(i);
      const { r, g, b } = new THREE.Color().setHSL(animatedHue, 1, z * lightnessMult);
      const j = i * 3;
      colorArr[j] = r;
      colorArr[j + 1] = g;
      colorArr[j + 2] = b;
    }

    colorAttr.needsUpdate = true;
  };

  // Return the final mesh
  return mesh;
}
