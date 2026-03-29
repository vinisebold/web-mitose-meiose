/**
 * Spindle apparatus (fuso mitótico) for Three.js
 * Creates procedural spindle fibers with tension visualization
 */
import * as THREE from 'three';

export const SPINDLE_COLOR = 0x38bdf8;
export const ASTER_COLOR = 0x60a5fa;

/**
 * Creates a single spindle fiber from pole to chromosome
 * @param {THREE.Vector3} from - Pole position
 * @param {THREE.Vector3} to - Chromosome position
 * @param {number} color
 * @returns {THREE.Line}
 */
export function createSpindleFiber(from, to, color = SPINDLE_COLOR) {
  const points = [from.clone(), to.clone()];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5,
  });
  return new THREE.Line(geometry, material);
}

/**
 * Creates the full spindle apparatus
 * @param {object} options
 * @returns {THREE.Group}
 */
export function createSpindle({
  poleDistance = 3.0,
  fiberCount = 12,
  color = SPINDLE_COLOR,
} = {}) {
  const group = new THREE.Group();
  group.userData.type = 'spindle';

  // Poles
  const poleGeo = new THREE.SphereGeometry(0.15, 16, 16);
  const poleMat = new THREE.MeshPhongMaterial({
    color: ASTER_COLOR,
    emissive: ASTER_COLOR,
    emissiveIntensity: 0.4,
  });

  const topPole = new THREE.Mesh(poleGeo, poleMat);
  topPole.position.set(0, poleDistance / 2, 0);
  group.add(topPole);

  const bottomPole = new THREE.Mesh(poleGeo, poleMat);
  bottomPole.position.set(0, -poleDistance / 2, 0);
  group.add(bottomPole);

  group.userData.topPole = topPole;
  group.userData.bottomPole = bottomPole;

  // Aster rays
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    for (const pole of [topPole, bottomPole]) {
      const dir = new THREE.Vector3(
        Math.cos(angle) * 0.6,
        Math.sign(pole.position.y) * 0.3,
        Math.sin(angle) * 0.6
      );
      const end = pole.position.clone().add(dir);
      const fiber = createSpindleFiber(pole.position, end, ASTER_COLOR);
      fiber.material.opacity = 0.2;
      group.add(fiber);
    }
  }

  // Kinetochore fibers (will be updated to target chromosomes)
  for (let i = 0; i < fiberCount; i++) {
    const angle = (i / fiberCount) * Math.PI * 2;
    const target = new THREE.Vector3(
      Math.cos(angle) * 0.5,
      0,
      Math.sin(angle) * 0.5
    );

    const topFiber = createSpindleFiber(topPole.position, target, color);
    group.add(topFiber);

    const bottomFiber = createSpindleFiber(bottomPole.position, target, color);
    group.add(bottomFiber);
  }

  return group;
}

/**
 * Updates spindle fibers to track chromosome positions
 * @param {THREE.Group} spindle
 * @param {THREE.Vector3[]} chromosomePositions
 */
export function updateSpindleFibers(spindle, chromosomePositions) {
  let fiberIndex = 0;
  const topPole = spindle.userData.topPole;
  const bottomPole = spindle.userData.bottomPole;

  spindle.children.forEach(child => {
    if (child.isLine && child.material.color.getHex() === SPINDLE_COLOR) {
      const chrPos = chromosomePositions[fiberIndex % chromosomePositions.length];
      if (chrPos) {
        const positions = child.geometry.attributes.position.array;
        if (fiberIndex % 2 === 0) {
          positions[3] = chrPos.x;
          positions[4] = chrPos.y;
          positions[5] = chrPos.z;
        } else {
          positions[3] = chrPos.x;
          positions[4] = chrPos.y;
          positions[5] = chrPos.z;
        }
        child.geometry.attributes.position.needsUpdate = true;
      }
      fiberIndex++;
    }
  });
}

/**
 * Animates spindle fiber shortening (anaphase)
 * @param {THREE.Group} spindle
 * @param {number} progress - 0 to 1
 */
export function animateFiberShortening(spindle, progress) {
  spindle.children.forEach(child => {
    if (child.isLine) {
      child.material.opacity = 0.5 - progress * 0.2;
    }
  });
}
