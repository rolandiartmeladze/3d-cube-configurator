import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

export function createTextOutlines({ font, message = "Roland", size = 1 }) {

    const group = new THREE.Group();
    const shapes = font.generateShapes(message, size);

    const material = new LineMaterial({
        color: 0xffffff,
        linewidth: 0.005,
        dashed: true,
        dashSize: 1,
        gapSize: 1,
    })
    const strokeMeshes = [];
    
};