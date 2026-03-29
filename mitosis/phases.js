/**
 * Mitosis phase logic and state management
 */
import { createChromosomeSet, animateCondensation } from './chromosome.js';

export const MITOSIS_PHASES = [
  'interphase', 'prophase', 'metaphase', 'anaphase', 'telophase', 'cytokinesis'
];

/**
 * Manages the state and transitions of all mitosis phases
 */
export class MitosisPhaseManager {
  constructor(scene) {
    this.scene = scene;
    this.currentIndex = 0;
    this.progress = 0;
    this.isPlaying = false;
    this.speed = 1.0;
    this.phaseStartTime = 0;

    this.chromosomes = null;
    this.cellMembrane = null;
    this.nucleus = null;
    this.spindle = null;

    this.setupInitialState();
  }

  setupInitialState() {
    this.chromosomes = createChromosomeSet(4);
    this.chromosomes.visible = false;
    this.scene.add(this.chromosomes);
  }

  get currentPhaseId() {
    return MITOSIS_PHASES[this.currentIndex];
  }

  get phaseCount() {
    return MITOSIS_PHASES.length;
  }

  /**
   * Executes the animation logic for the current phase
   * @param {number} elapsed - ms since phase start
   * @param {number} duration - ms duration of phase
   */
  updatePhase(elapsed, duration) {
    const progress = Math.min(elapsed / duration, 1);
    this.progress = progress;

    switch (this.currentPhaseId) {
      case 'interphase':
        this.updateInterphase(progress);
        break;
      case 'prophase':
        this.updateProphase(progress);
        break;
      case 'metaphase':
        this.updateMetaphase(progress);
        break;
      case 'anaphase':
        this.updateAnaphase(progress);
        break;
      case 'telophase':
        this.updateTelophase(progress);
        break;
      case 'cytokinesis':
        this.updateCytokinesis(progress);
        break;
    }
  }

  updateInterphase(p) {
    this.chromosomes.visible = true;
    this.chromosomes.children.forEach(chr => {
      const s = 0.2 + p * 0.3;
      chr.scale.setScalar(s);
    });
  }

  updateProphase(p) {
    this.chromosomes.visible = true;
    this.chromosomes.children.forEach((chr, i) => {
      const scale = 0.5 + p * 0.5;
      chr.scale.setScalar(scale);
      chr.rotation.y += 0.003;
    });
  }

  updateMetaphase(p) {
    this.chromosomes.children.forEach((chr, i) => {
      const total = this.chromosomes.children.length;
      const angle = (i / total) * Math.PI * 2;
      const targetX = Math.cos(angle) * 0.8;
      const targetZ = Math.sin(angle) * 0.8;

      chr.position.x += (targetX - chr.position.x) * 0.05;
      chr.position.y += (0 - chr.position.y) * 0.05;
      chr.position.z += (targetZ - chr.position.z) * 0.05;

      chr.rotation.x += 0.002;
      chr.scale.setScalar(1.0);
    });
  }

  updateAnaphase(p) {
    this.chromosomes.children.forEach((chr, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      const targetY = direction * (0.5 + p * 1.5);
      chr.position.y += (targetY - chr.position.y) * 0.04;

      // Separate chromatids
      if (chr.children.length >= 2) {
        const sep = p * 0.3;
        chr.children[0].position.x = -0.06 - sep;
        chr.children[1].position.x = 0.06 + sep;
      }
    });
  }

  updateTelophase(p) {
    this.chromosomes.children.forEach(chr => {
      const scale = 1.0 - p * 0.5;
      chr.scale.setScalar(Math.max(scale, 0.3));
      chr.rotation.y += 0.001;
    });
  }

  updateCytokinesis(p) {
    // Move chromosome groups to form two cells
    const midpoint = Math.floor(this.chromosomes.children.length / 2);
    this.chromosomes.children.forEach((chr, i) => {
      const targetGroup = i < midpoint ? 1 : -1;
      const targetY = targetGroup * 1.5;
      chr.position.y += (targetY - chr.position.y) * 0.03;
      chr.scale.setScalar(0.4);
    });
  }

  nextPhase() {
    if (this.currentIndex < MITOSIS_PHASES.length - 1) {
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
    this.setupInitialState();
  }

  getChromosomePositions() {
    return this.chromosomes.children.map(c => c.position.clone());
  }
}
