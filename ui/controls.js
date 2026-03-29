/**
 * Playback controls for phase animation
 * Play/Pause, step forward/backward, speed control
 */
const SPEEDS = [0.25, 0.5, 1, 2, 4];

export class Controls {
  constructor() {
    this.isPlaying = false;
    this.speedIndex = 2; // default 1x
    this.speed = SPEEDS[this.speedIndex];
    this.onPlayPause = null;
    this.onPrev = null;
    this.onNext = null;
    this.onReset = null;
    this.onSpeedChange = null;

    this.btnPlay = document.getElementById('btn-play');
    this.btnPrev = document.getElementById('btn-prev');
    this.btnNext = document.getElementById('btn-next');
    this.btnReset = document.getElementById('btn-reset');
    this.btnSpeed = document.getElementById('btn-speed');

    this.bindEvents();
  }

  bindEvents() {
    this.btnPlay.addEventListener('click', () => this.togglePlay());
    this.btnPrev.addEventListener('click', () => {
      if (this.onPrev) this.onPrev();
    });
    this.btnNext.addEventListener('click', () => {
      if (this.onNext) this.onNext();
    });
    this.btnReset.addEventListener('click', () => {
      this.isPlaying = false;
      this.updatePlayButton();
      if (this.onReset) this.onReset();
    });
    this.btnSpeed.addEventListener('click', () => this.cycleSpeed());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowLeft':
          if (this.onPrev) this.onPrev();
          break;
        case 'ArrowRight':
          if (this.onNext) this.onNext();
          break;
        case 'KeyS':
          document.getElementById('sidebar').classList.toggle('sidebar--collapsed');
          break;
      }
    });
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.updatePlayButton();
    if (this.onPlayPause) this.onPlayPause(this.isPlaying);
  }

  updatePlayButton() {
    this.btnPlay.textContent = this.isPlaying ? '⏸' : '▶';
    this.btnPlay.title = this.isPlaying ? 'Pausar (Espaco)' : 'Reproduzir (Espaco)';
  }

  cycleSpeed() {
    this.speedIndex = (this.speedIndex + 1) % SPEEDS.length;
    this.speed = SPEEDS[this.speedIndex];
    this.btnSpeed.textContent = `${this.speed}x`;
    if (this.onSpeedChange) this.onSpeedChange(this.speed);
  }

  setSpeed(speed) {
    const idx = SPEEDS.indexOf(speed);
    if (idx !== -1) {
      this.speedIndex = idx;
      this.speed = speed;
      this.btnSpeed.textContent = `${speed}x`;
    }
  }

  show() {
    document.getElementById('controls-hud').style.display = 'flex';
    document.getElementById('keyboard-hint').style.display = 'flex';
  }

  hide() {
    document.getElementById('controls-hud').style.display = 'none';
    document.getElementById('keyboard-hint').style.display = 'none';
  }
}
