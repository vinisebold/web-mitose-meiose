/**
 * Meiosis phase logic and state management
 * Covers Meiosis I (reductional) and Meiosis II (equational)
 */
import { createChromosomeSet } from '../mitosis/chromosome.js';
import { createCrossoverPair, animateCrossingOver } from './crossing-over.js';

export const MEIOSIS_I_PHASES = ['prophase-i', 'metaphase-i', 'anaphase-i', 'telophase-i'];
export const MEIOSIS_II_PHASES = ['prophase-ii', 'metaphase-ii', 'anaphase-ii', 'telophase-ii'];
export const ALL_MEIOSIS_PHASES = [...MEIOSIS_I_PHASES, ...MEIOSIS_II_PHASES];

/**
 * Manages state and transitions of all meiosis phases
 */
export class MeiosisPhaseManager {
  constructor(scene) {
    this.scene = scene;
    this.currentIndex = 0;
    this.progress = 0;
    this.isPlaying = false;
    this.speed = 1.0;

    this.chromosomes = null;
    this.crossoverPair = null;
    this.daughterCells = [];
    this.spindle = null;

    this.setupInitialState();
  }

  setupInitialState() {
    this.chromosomes = createChromosomeSet(4);
    this.scene.add(this.chromosomes);

    // Create crossover pair for Prophase I visualization
    this.crossoverPair = createCrossoverPair(
      new THREE.Vector3(-0.3, 0, 0),
      new THREE.Vector3(0.3, 0, 0)
    );
    this.crossoverPair.visible = false;
    this.scene.add(this.crossoverPair);
  }

  get currentPhaseId() {
    return ALL_MEIOSIS_PHASES[this.currentIndex];
  }

  get phaseCount() {
    return ALL_MEIOSIS_PHASES.length;
  }

  get isInMeiosisII() {
    return this.currentIndex >= MEIOSIS_I_PHASES.length;
  }

  updatePhase(elapsed, duration) {
    const progress = Math.min(elapsed / duration, 1);
    this.progress = progress;

    switch (this.currentPhaseId) {
      case 'prophase-i':
        this.updateProphaseI(progress);
        break;
      case 'metaphase-i':
        this.updateMetaphaseI(progress);
        break;
      case 'anaphase-i':
        this.updateAnaphaseI(progress);
        break;
      case 'telophase-i':
        this.updateTelophaseI(progress);
        break;
      case 'prophase-ii':
        this.updateProphaseII(progress);
        break;
      case 'metaphase-ii':
        this.updateMetaphaseII(progress);
        break;
      case 'anaphase-ii':
        this.updateAnaphaseII(progress);
        break;
      case 'telophase-ii':
        this.updateTelophaseII(progress);
        break;
    }
  }

  updateProphaseI(p) {
    // Condense chromosomes
    this.chromosomes.visible = true;
    this.chromosomes.children.forEach(chr => {
      const scale = 0.3 + p * 0.7;
      chr.scale.setScalar(scale);
      chr.rotation.y += 0.002;
    });

    // Show crossing-over animation mid-phase
    if (p > 0.3 && p < 0.8) {
      this.crossoverPair.visible = true;
      const coProgress = (p - 0.3) / 0.5;
      animateCrossingOver(this.crossoverPair, coProgress);
    } else if (p >= 0.8) {
      this.crossoverPair.visible = false;
    }
  }

  updateMetaphaseI(p) {
    this.crossoverPair.visible = false;
    // Bivalentes align at equatorial plate
    this.chromosomes.children.forEach((chr, i) => {
      const total = this.chromosomes.children.length;
      const angle = (i / total) * Math.PI * 2;
      const pairOffset = i % 2 === 0 ? -0.15 : 0.15;

      chr.position.x += (Math.cos(angle) * 0.8 - chr.position.x) * 0.05;
      chr.position.y += (pairOffset - chr.position.y) * 0.05;
      chr.position.z += (Math.sin(angle) * 0.8 - chr.position.z) * 0.05;
      chr.scale.setScalar(1.0);
    });
  }

  updateAnaphaseI(p) {
    // Homologous chromosomes separate (NOT sister chromatids)
    this.chromosomes.children.forEach((chr, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      const targetY = direction * (0.3 + p * 1.8);
      chr.position.y += (targetY - chr.position.y) * 0.04;
    });
  }

  updateTelophaseI(p) {
    // Two groups form, each with n chromosomes
    this.chromosomes.children.forEach(chr => {
      const scale = 1.0 - p * 0.4;
      chr.scale.setScalar(Math.max(scale, 0.4));
    });
  }

  updateProphaseII(p) {
    this.chromosomes.children.forEach(chr => {
      chr.scale.setScalar(0.4 + p * 0.3);
      chr.rotation.y += 0.002;
    });
  }

  updateMetaphaseII(p) {
    // Align at equatorial plate in each daughter cell
    this.chromosomes.children.forEach((chr, i) => {
      const group = i < this.chromosomes.children.length / 2 ? 1 : -1;
      const groupIndex = group > 0 ? i : i - this.chromosomes.children.length / 2;
      const groupTotal = this.chromosomes.children.length / 2;
      const angle = (groupIndex / groupTotal) * Math.PI * 2;

      chr.position.x += (Math.cos(angle) * 0.5 - chr.position.x) * 0.05;
      chr.position.y += (group * 1.5 - chr.position.y) * 0.05;
      chr.position.z += (Math.sin(angle) * 0.5 - chr.position.z) * 0.05;
      chr.scale.setScalar(0.8);
    });
  }

  updateAnaphaseII(p) {
    // Sister chromatids separate
    this.chromosomes.children.forEach((chr, i) => {
      const group = i < this.chromosomes.children.length / 2 ? 1 : -1;
      const subDir = i % 2 === 0 ? 1 : -1;
      const targetY = group * 1.5 + subDir * p * 0.6;
      chr.position.y += (targetY - chr.position.y) * 0.04;

      // Separate chromatids
      if (chr.children.length >= 2) {
        chr.children[0].position.x = -0.06 - p * 0.2;
        chr.children[1].position.x = 0.06 + p * 0.2;
      }
    });
  }

  updateTelophaseII(p) {
    // Four haploid cells form
    this.chromosomes.children.forEach(chr => {
      chr.scale.setScalar(0.5 - p * 0.2);
    });
  }

  nextPhase() {
    if (this.currentIndex < ALL_MEIOSIS_PHASES.length - 1) {
      this.currentIndex++;
      this.progress = 0;
      return true;
    }
    return false;
  }

  prevPhase() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.progress = 0;
      return true;
    }
    return false;
  }

  reset() {
    this.currentIndex = 0;
    this.progress = 0;
    this.isPlaying = false;
    this.scene.remove(this.chromosomes);
    this.scene.remove(this.crossoverPair);
    this.setupInitialState();
  }

  getChromosomePositions() {
    return this.chromosomes.children.map(c => c.position.clone());
  }
}
