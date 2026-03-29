/**
 * Crossing-over animation for meiosis Prophase I
 * Handles the visual exchange of genetic material between homologous chromosomes
 */
import * as THREE from 'three';

export const CROSSOVER_COLOR_A = 0xf43f5e;
export const CROSSOVER_COLOR_B = 0x3b82f6;

/**
 * Creates crossing-over visualization between two homologous chromosomes
 * @param {THREE.Vector3} posA - Position of first chromosome
 * @param {THREE.Vector3} posB - Position of second chromosome
 * @returns {THREE.Group}
 */
export function createCrossoverPair(posA, posB) {
  const group = new THREE.Group();
  group.userData.type = 'crossover-pair';

  // First chromatid pair (red)
  const chrA = createSimpleChromatidPair(CROSSOVER_COLOR_A);
  chrA.position.copy(posA);
  group.add(chrA);

  // Second chromatid pair (blue - homologous)
  const chrB = createSimpleChromatidPair(CROSSOVER_COLOR_B);
  chrB.position.copy(posB);
  group.add(chrB);

  // Chiasma connection points
  const chiasmaCount = 2;
  const chiasmaGroup = new THREE.Group();
  chiasmaGroup.userData.type = 'chiasma';

  for (let i = 0; i < chiasmaCount; i++) {
    const midPoint = new THREE.Vector3().lerpVectors(posA, posB, 0.3 + i * 0.4);
    const chiasmaGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const chiasmaMat = new THREE.MeshPhongMaterial({
      color: 0xfbbf24,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0,
    });
    const chiasma = new THREE.Mesh(chiasmaGeo, chiasmaMat);
    chiasma.position.copy(midPoint);
    chiasmaGroup.add(chiasma);
  }
  group.add(chiasmaGroup);

  return group;
}

function createSimpleChromatidPair(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshPhongMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.2,
    shininess: 40,
  });

  const armGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.6, 8);

  // Long arm
  const longArm = new THREE.Mesh(armGeo, mat);
  longArm.position.y = -0.3;
  group.add(longArm);

  // Short arm
  const shortArmGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.4, 8);
  const shortArm = new THREE.Mesh(shortArmGeo, mat);
  shortArm.position.y = 0.2;
  group.add(shortArm);

  // Centromere
  const centGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const centMat = new THREE.MeshPhongMaterial({
    color: 0xfbbf24,
    emissive: 0xfbbf24,
    emissiveIntensity: 0.3,
  });
  group.add(new THREE.Mesh(centGeo, centMat));

  return group;
}

/**
 * Animates the crossing-over event
 * @param {THREE.Group} crossoverPair
 * @param {number} progress - 0 to 1
 */
export function animateCrossingOver(crossoverPair, progress) {
  if (!crossoverPair) return;

  // Phase 1: chromosomes approach (0-0.3)
  // Phase 2: chiasma appear (0.3-0.5)
  // Phase 3: exchange segments (0.5-0.8)
  // Phase 4: separate (0.8-1.0)

  const chiasmaGroup = crossoverPair.children.find(c => c.userData.type === 'chiasma');
  if (chiasmaGroup) {
    chiasmaGroup.children.forEach(chiasma => {
      if (progress > 0.3 && progress < 0.8) {
        chiasma.material.opacity = Math.min((progress - 0.3) / 0.1, 1);
        chiasma.scale.setScalar(1 + Math.sin(progress * 20) * 0.2);
      } else if (progress >= 0.8) {
        chiasma.material.opacity = Math.max(1 - (progress - 0.8) / 0.2, 0);
      }
    });
  }

  // Animate color exchange on chromatids
  if (progress > 0.5 && progress < 0.8) {
    const exchangeProgress = (progress - 0.5) / 0.3;
    crossoverPair.children.forEach(child => {
      if (child.userData.type !== 'chiasma') {
        child.children.forEach(part => {
          if (part.material && part.material.emissive) {
            part.material.emissiveIntensity = 0.2 + exchangeProgress * 0.4;
          }
        });
      }
    });
  }

  // Separate chromosomes
  if (progress > 0.8) {
    const sep = (progress - 0.8) / 0.2;
    if (crossoverPair.children[0]) {
      crossoverPair.children[0].position.x = -0.15 - sep * 0.5;
    }
    if (crossoverPair.children[1]) {
      crossoverPair.children[1].position.x = 0.15 + sep * 0.5;
    }
  }
}
