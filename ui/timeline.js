/**
 * Timeline bar showing phase progress
 * Allows clicking to jump between phases
 */

export class Timeline {
  constructor() {
    this.container = document.getElementById('timeline');
    this.phases = [];
    this.onPhaseClick = null;
    this.currentPhaseIndex = 0;
    this.progress = 0;
  }

  /**
   * Builds the timeline from phase data
   * @param {object[]} phasesData - Array of phase objects from phases-data.js
   * @param {function} onPhaseClick - Callback when a phase is clicked
   */
  build(phasesData, onPhaseClick) {
    this.container.innerHTML = '';
    this.phases = [];
    this.onPhaseClick = onPhaseClick;

    phasesData.forEach((phase, i) => {
      const segment = document.createElement('div');
      segment.className = 'timeline__phase';
      if (i === 0) segment.classList.add('timeline__phase--active');

      const fill = document.createElement('div');
      fill.className = 'timeline__phase-fill';
      segment.appendChild(fill);

      const label = document.createElement('div');
      label.className = 'timeline__phase-label';
      label.textContent = phase.name;
      segment.appendChild(label);

      segment.addEventListener('click', () => {
        if (this.onPhaseClick) this.onPhaseClick(i);
      });

      this.container.appendChild(segment);
      this.phases.push({ segment, fill });
    });
  }

  /**
   * Updates the progress bar for the current phase
   * @param {number} phaseIndex
   * @param {number} progress - 0 to 1
   */
  update(phaseIndex, progress) {
    this.currentPhaseIndex = phaseIndex;
    this.progress = progress;

    this.phases.forEach((p, i) => {
      p.segment.classList.remove('timeline__phase--active');

      if (i < phaseIndex) {
        p.fill.style.width = '100%';
      } else if (i === phaseIndex) {
        p.segment.classList.add('timeline__phase--active');
        p.fill.style.width = `${progress * 100}%`;
      } else {
        p.fill.style.width = '0%';
      }
    });
  }

  show() {
    this.container.style.display = 'flex';
  }

  hide() {
    this.container.style.display = 'none';
  }

  destroy() {
    this.container.innerHTML = '';
    this.phases = [];
  }
}
