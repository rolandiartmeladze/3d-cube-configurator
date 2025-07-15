import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { createTextOutlines } from './textOutline';

export function Text3D({ message = "Roland", fontUrl = "../fonts/ChakraPetch-Bold.typeface.json", onLoad }) {

    const group = new THREE.Group();

    const loader = new FontLoader();
    loader.load(fontUrl, (font) => {
        const props = {
            font,
            size: 1,
            depth: 0.1,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.08,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 2,
        };

        const textGeo = new TextGeometry(message, props);
        textGeo.computeBoundingBox();
        const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 1.0,
            thickness: 1.0,
            roughness: 0.1,
            metalness: 0.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            ior: 1.45,
            specularIntensity: 1.0,
            transparent: true,
        });

        const textMesh = new THREE.Mesh(textGeo, material);
        textMesh.position.x = centerOffset;
        group.add(textMesh);

        const outlineGroup = createTextOutlines({ font, message, size });
        outlineGroup.position.set(centerOffset, 0, 0.15);
        group.add(outlineGroup);

        group.userData.update = (t) => {
            outlineGroup.userData.update?.(t);
        };

        onLoad?.(group);
    });

    return group;
}
