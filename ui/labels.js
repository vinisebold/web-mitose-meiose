/**
 * Floating labels and annotations for 3D scene
 * Displays dynamic scientific labels based on phase events
 */

export class Labels {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.phaseName = document.getElementById('phase-name');
    this.phaseNumber = document.getElementById('phase-number');
    this.phaseDescription = document.getElementById('phase-description');
    this.phaseEvents = document.getElementById('phase-events');

    this.currentPhaseIndex = 0;
    this.currentEvents = [];

    this.bindEvents();
  }

  bindEvents() {
    const toggle = document.getElementById('sidebar-toggle');
    toggle.addEventListener('click', () => {
      this.sidebar.classList.toggle('sidebar--collapsed');
      toggle.textContent = this.sidebar.classList.contains('sidebar--collapsed') ? '▶' : '◀';
    });
  }

  /**
   * Updates the sidebar with current phase data
   * @param {object} phaseData - Phase data from phases-data.js
   * @param {number} phaseIndex
   * @param {number} totalPhases
   * @param {number} progress - 0 to 1
   */
  updatePhase(phaseData, phaseIndex, totalPhases, progress) {
    if (!phaseData) return;

    this.currentPhaseIndex = phaseIndex;
    this.phaseName.textContent = phaseData.name;
    this.phaseNumber.textContent = `${phaseIndex + 1} / ${totalPhases}`;
    this.phaseDescription.textContent = phaseData.description;
    this.currentEvents = phaseData.keyEvents || [];

    // Render events
    this.phaseEvents.innerHTML = '';
    this.currentEvents.forEach((event, i) => {
      const div = document.createElement('div');
      div.className = 'sidebar__event';

      const isActive = progress >= event.time;
      if (isActive) div.classList.add('sidebar__event--active');

      div.innerHTML = `
        <div class="sidebar__event-dot"></div>
        <div class="sidebar__event-label">${event.label}</div>
      `;
      this.phaseEvents.appendChild(div);
    });
  }

  show() {
    this.sidebar.style.display = 'flex';
    this.sidebar.classList.remove('sidebar--collapsed');
  }

  hide() {
    this.sidebar.style.display = 'none';
  }
}
