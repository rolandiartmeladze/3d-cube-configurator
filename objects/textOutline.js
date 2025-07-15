import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

export function createTextOutlines({ font, message = "Roland", size = 3 }) {
    const group = new THREE.Group();
    const shapes = font.generateShapes(message, size);
    const canvas = document.querySelector('#text');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const strokeMeshes = [];

    shapes.forEach((shape, index) => {
        let totalDist = 1.0;

        const lineMaterial = new LineMaterial({
            color: 0xffffff,
            linewidth: 1,
            dashed: true,
            dashSize: totalDist * 2,
            gapSize: totalDist * 2,
            dashOffset: Math.random() * totalDist,
            depthTest: false,
            transparent: true,
            opacity: 1,
        });
        lineMaterial.resolution.set(width, height);

        const points = shape.getPoints(64);
        const positions = points.flatMap(p => [p.x, p.y, 0]);

        const lineGeo = new LineGeometry();
        lineGeo.setPositions(positions);

        const line = new Line2(lineGeo, lineMaterial);
        line.computeLineDistances();

        const offset = index * 0.05;
        line.userData.update = (time) => {
            line.material.dashOffset = time * (totalDist * 0.001) + offset;
        };

        group.add(line);
        strokeMeshes.push(line);

        if (shape.holes?.length > 0) {
            shape.holes.forEach((hole) => {
                const holePoints = hole.getPoints(64);
                const holePos = holePoints.flatMap(p => [p.x, p.y, 0]);

                const holeGeo = new LineGeometry();
                holeGeo.setPositions(holePos);

                const holeMaterial = lineMaterial.clone();
                holeMaterial.resolution.set(width, height);

                const holeLine = new Line2(holeGeo, holeMaterial);
                holeLine.computeLineDistances();

                const holeLength = hole.getLength();
                const holeOffset = index * 0.05;

                holeLine.userData.update = (time) => {
                    holeLine.material.dashOffset = time * (holeLength * 0.001) + holeOffset;
                };

                group.add(holeLine);
                strokeMeshes.push(holeLine);
            });
        }
    });

    group.userData.update = (time) => {
        strokeMeshes.forEach(mesh => mesh.userData.update?.(time));
    };

    return group;
}
