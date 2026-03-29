/**
 * Reduction division logic for meiosis
 * Handles the ploidy reduction from 2n to n
 */
import * as THREE from 'three';

/**
 * Creates visual indicator for ploidy change
 * @param {number} ploidy - 2 (diploid) or 1 (haploid)
 * @param {THREE.Vector3} position
 * @returns {THREE.Group}
 */
export function createPloidyIndicator(ploidy, position = new THREE.Vector3()) {
  const group = new THREE.Group();
  group.userData.type = 'ploidy-indicator';
  group.userData.ploidy = ploidy;

  const color = ploidy === 2 ? 0x3b82f6 : 0x8b5cf6;

  // Outer ring
  const ringGeo = new THREE.RingGeometry(0.25, 0.3, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  group.add(ring);

  // Inner text would be CSS overlay
  group.position.copy(position);
  return group;
}

/**
 * Animates the separation of homologous chromosomes (Meiosis I)
 * @param {THREE.Group[]} homologPairs
 * @param {number} progress - 0 to 1
 */
export function animateHomologSeparation(homologPairs, progress) {
  homologPairs.forEach((pair, i) => {
    if (pair.children.length >= 2) {
      const chrA = pair.children[0];
      const chrB = pair.children[1];

      const separation = progress * 1.5;
      chrA.position.y = -separation;
      chrB.position.y = separation;
    }
  });
}

/**
 * Creates two daughter cells after division
 * @param {THREE.Group} parentCell
 * @returns {THREE.Group[]}
 */
export function createDaughterCells(parentCell) {
  const cells = [];

  for (let i = 0; i < 2; i++) {
    const cell = new THREE.Group();
    cell.userData.type = 'daughter-cell';

    const membraneGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const membraneMat = new THREE.MeshPhongMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const membrane = new THREE.Mesh(membraneGeo, membraneMat);
    cell.add(membrane);

    cell.position.y = i === 0 ? 1.8 : -1.8;
    cells.push(cell);
  }

  return cells;
}
