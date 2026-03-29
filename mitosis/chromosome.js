/**
 * Chromosome parametric geometry for Three.js
 * Creates 3D chromosome models with arms and centromere
 */
import * as THREE from 'three';

export const CHROMOSOME_COLOR = 0xf43f5e;
export const CHROMATID_COLOR = 0xf97316;
export const HOMOLOGOUS_COLOR = 0x3b82f6;
export const CENTROMERE_COLOR = 0xfbbf24;

/**
 * Creates a single chromatid as a bent cylinder
 * @param {number} length - Total length of the chromatid
 * @param {number} radius - Radius of the arms
 * @param {number} color - Hex color
 * @returns {THREE.Group}
 */
export function createChromatid(length = 1.2, radius = 0.06, color = CHROMOSOME_COLOR) {
  const group = new THREE.Group();

  const armLength = length * 0.45;
  const material = new THREE.MeshPhongMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.15,
    shininess: 40,
  });

  // Long arm
  const longArmGeo = new THREE.CylinderGeometry(radius, radius * 0.9, armLength, 8);
  const longArm = new THREE.Mesh(longArmGeo, material);
  longArm.position.y = -armLength / 2;
  group.add(longArm);

  // Short arm
  const shortArmGeo = new THREE.CylinderGeometry(radius, radius * 0.9, armLength * 0.7, 8);
  const shortArm = new THREE.Mesh(shortArmGeo, material);
  shortArm.position.y = armLength * 0.7 / 2;
  group.add(shortArm);

  // Centromere
  const centromereGeo = new THREE.SphereGeometry(radius * 1.5, 12, 12);
  const centromereMat = new THREE.MeshPhongMaterial({
    color: CENTROMERE_COLOR,
    emissive: CENTROMERE_COLOR,
    emissiveIntensity: 0.3,
    shininess: 60,
  });
  const centromere = new THREE.Mesh(centromereGeo, centromereMat);
  group.add(centromere);

  return group;
}

/**
 * Creates a chromosome with two sister chromatids joined at centromere
 * @param {object} options
 * @returns {THREE.Group}
 */
export function createChromosome({
  armLength = 1.2,
  armRadius = 0.06,
  color = CHROMOSOME_COLOR,
  chromatidGap = 0.12,
  condensed = false,
} = {}) {
  const group = new THREE.Group();
  group.userData.type = 'chromosome';
  group.userData.condensed = condensed;

  const chromatid1 = createChromatid(armLength, armRadius, color);
  chromatid1.position.x = -chromatidGap / 2;
  chromatid1.rotation.z = 0.05;
  group.add(chromatid1);

  const chromatid2 = createChromatid(armLength, armRadius, color);
  chromatid2.position.x = chromatidGap / 2;
  chromatid2.rotation.z = -0.05;
  group.add(chromatid2);

  // Scale down if not condensed
  if (!condensed) {
    group.scale.setScalar(0.3);
    group.userData.targetScale = 0.3;
  } else {
    group.userData.targetScale = 1.0;
  }

  return group;
}

/**
 * Creates a set of chromosomes for a cell
 * @param {number} count - Number of chromosome pairs (diploid = 2*count)
 * @returns {THREE.Group}
 */
export function createChromosomeSet(count = 4) {
  const group = new THREE.Group();
  const colors = [0xf43f5e, 0x8b5cf6, 0x3b82f6, 0x10b981, 0xf59e0b, 0xec4899];

  for (let i = 0; i < count; i++) {
    const chr = createChromosome({
      color: colors[i % colors.length],
      armLength: 0.8 + Math.random() * 0.6,
      condensed: true,
    });

    const angle = (i / count) * Math.PI * 2;
    const radius = 0.3 + Math.random() * 0.4;
    chr.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 0.8,
      Math.sin(angle) * radius
    );
    chr.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI * 0.3
    );

    group.add(chr);
  }

  return group;
}

/**
 * Animates chromosome condensation
 * @param {THREE.Group} chromosome
 * @param {number} progress - 0 to 1
 */
export function animateCondensation(chromosome, progress) {
  const targetScale = 0.3 + progress * 0.7;
  chromosome.scale.setScalar(THREE.MathUtils.lerp(chromosome.scale.x, targetScale, 0.1));
}
