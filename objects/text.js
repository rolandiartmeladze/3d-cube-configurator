import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { createTextOutlines } from './textOutline.js';

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
            color: 0xaaaaaa,
            transmission: 1.0,
            thickness: 1.0,
            roughness: 0.1,
            metalness: 0.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            ior: 1.45,
            specularIntensity: 1.0,
            transparent: true,
            emissive: new THREE.Color(0xaaaaaa),
            emissiveIntensity: 1,
        });

        const textMesh = new THREE.Mesh(textGeo, material);
        textMesh.position.x = centerOffset;
        group.add(textMesh);

        const outlineGroup = createTextOutlines({ font, message, size: props.size });
        outlineGroup.position.set(centerOffset, 0, 0.20);
        group.add(outlineGroup);

        const initialDisplayDuration = 2000;
        const fadeOutDuration = 1500;
        const pauseDuration = 1000;
        const fadeInDuration = 2500;
        const finalPauseDuration = 1000;

        const fullCycle = initialDisplayDuration + fadeOutDuration + pauseDuration + fadeInDuration + finalPauseDuration;

        group.userData.update = (time) => {
            const t = time % fullCycle;

            if (t < initialDisplayDuration) {
                outlineGroup.visible = true;
                outlineGroup.userData.update?.(1);
                textMesh.material.emissiveIntensity = 1;

            } else if (t < initialDisplayDuration + fadeOutDuration) {
                const progress = (t - initialDisplayDuration) / fadeOutDuration;
                outlineGroup.visible = true;
                outlineGroup.userData.update?.(1 - progress);
                textMesh.material.emissiveIntensity = 1 - progress;

            } else if (t < initialDisplayDuration + fadeOutDuration + pauseDuration) {
                outlineGroup.visible = false;
                textMesh.material.emissiveIntensity = 0;

            } else if (t < initialDisplayDuration + fadeOutDuration + pauseDuration + fadeInDuration) {
                const progress = (t - initialDisplayDuration - fadeOutDuration - pauseDuration) / fadeInDuration;
                outlineGroup.visible = true;
                outlineGroup.userData.update?.(progress);
                textMesh.material.emissiveIntensity = progress;

            } else {
                outlineGroup.visible = true;
                outlineGroup.userData.update?.(1);
                textMesh.material.emissiveIntensity = 1;
            }
        };

        onLoad?.(group);
    });

    return group;
}
