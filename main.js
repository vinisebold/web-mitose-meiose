/**
 * CellViz - Main Orchestrator
 * Initializes the application, manages scenes, UI, and navigation
 */
import { Router } from './router.js';
import { MitosisScene } from './mitosis/scene.js';
import { MeiosisScene } from './meiosis/scene.js';
import { Controls } from './ui/controls.js';
import { Labels } from './ui/labels.js';
import { Timeline } from './ui/timeline.js';
import { Quiz } from './ui/quiz.js';
import {
  mitosisPhases,
  meiosisIPhases,
  meiosisIIPhases,
} from './data/phases-data.js';

class App {
  constructor() {
    this.router = new Router();
    this.controls = new Controls();
    this.labels = new Labels();
    this.timeline = new Timeline();
    this.quiz = new Quiz();

    this.currentScene = null;
    this.currentProcess = null; // 'mitosis' | 'meiosis'
    this.animationFrame = null;
    this.phaseStartTime = 0;
    this.lastTimestamp = 0;

    this.allPhasesData = [];

    this.init();
  }

  init() {
    this.setupRouter();
    this.setupWelcomeButtons();
    this.setupNavButtons();
    this.setupControlCallbacks();

    this.router.init();
  }

  setupRouter() {
    this.router.onRouteChange = (route, state) => {
      switch (route) {
        case 'mitosis':
          this.startMitosis();
          break;
        case 'meiosis':
          this.startMeiosis();
          break;
        case 'home':
        default:
          this.showWelcome();
          break;
      }
    };
  }

  setupWelcomeButtons() {
    document.getElementById('btn-start-mitosis').addEventListener('click', () => {
      this.router.navigate('mitosis');
    });

    document.getElementById('btn-start-meiosis').addEventListener('click', () => {
      this.router.navigate('meiosis');
    });

    document.getElementById('btn-start-compare').addEventListener('click', () => {
      this.router.navigate('mitosis');
    });

    document.getElementById('logo-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate('home');
    });
  }

  setupNavButtons() {
    document.getElementById('nav-mitosis').addEventListener('click', () => {
      this.router.navigate('mitosis');
    });

    document.getElementById('nav-meiosis').addEventListener('click', () => {
      this.router.navigate('meiosis');
    });
  }

  setupControlCallbacks() {
    this.controls.onPlayPause = (isPlaying) => {
      if (isPlaying) {
        this.phaseStartTime = performance.now() - (this.lastTimestamp || 0);
      }
    };

    this.controls.onNext = () => {
      if (!this.currentScene) return;
      const pm = this.currentScene.phaseManager;
      if (pm.nextPhase()) {
        this.phaseStartTime = performance.now();
        this.updateUI();
        this.controls.isPlaying = false;
        this.controls.updatePlayButton();
      }
    };

    this.controls.onPrev = () => {
      if (!this.currentScene) return;
      const pm = this.currentScene.phaseManager;
      if (pm.prevPhase()) {
        this.phaseStartTime = performance.now();
        this.updateUI();
        this.controls.isPlaying = false;
        this.controls.updatePlayButton();
      }
    };

    this.controls.onReset = () => {
      if (!this.currentScene) return;
      this.currentScene.phaseManager.reset();
      this.phaseStartTime = performance.now();
      this.updateUI();
    };

    this.timeline.onPhaseClick = (index) => {
      if (!this.currentScene) return;
      const pm = this.currentScene.phaseManager;
      pm.currentIndex = index;
      pm.progress = 0;
      this.phaseStartTime = performance.now();
      this.updateUI();
      this.controls.isPlaying = false;
      this.controls.updatePlayButton();
    };
  }

  showWelcome() {
    this.stopAnimation();
    this.hideAllUI();

    document.getElementById('welcome-screen').classList.remove('welcome--hidden');
    document.getElementById('welcome-screen').style.display = 'flex';

    // Update nav buttons
    this.updateNavActive(null);
  }

  hideWelcome() {
    document.getElementById('welcome-screen').style.display = 'none';
  }

  startMitosis() {
    this.stopAnimation();
    this.hideWelcome();
    this.currentProcess = 'mitosis';
    this.updateNavActive('mitosis');

    // Setup data
    this.allPhasesData = mitosisPhases;

    // Setup scene
    const container = document.getElementById('canvas-container');
    this.currentScene = new MitosisScene(container);

    // Setup UI
    this.timeline.build(this.allPhasesData);
    this.showAllUI();

    // Start
    this.phaseStartTime = performance.now();
    this.updateUI();
    this.startAnimation();
  }

  startMeiosis() {
    this.stopAnimation();
    this.hideWelcome();
    this.currentProcess = 'meiosis';
    this.updateNavActive('meiosis');

    // Setup data
    this.allPhasesData = [...meiosisIPhases, ...meiosisIIPhases];

    // Setup scene
    const container = document.getElementById('canvas-container');
    this.currentScene = new MeiosisScene(container);

    // Setup UI
    this.timeline.build(this.allPhasesData);
    this.showAllUI();

    // Start
    this.phaseStartTime = performance.now();
    this.updateUI();
    this.startAnimation();
  }

  updateNavActive(process) {
    const navMitosis = document.getElementById('nav-mitosis');
    const navMeiosis = document.getElementById('nav-meiosis');

    navMitosis.classList.remove('app-header__nav-btn--active');
    navMeiosis.classList.remove('app-header__nav-btn--active');

    if (process === 'mitosis') {
      navMitosis.classList.add('app-header__nav-btn--active');
    } else if (process === 'meiosis') {
      navMeiosis.classList.add('app-header__nav-btn--active');
    }
  }

  showAllUI() {
    document.getElementById('app-header').style.display = 'flex';
    this.labels.show();
    this.timeline.show();
    this.controls.show();
  }

  hideAllUI() {
    document.getElementById('app-header').style.display = 'none';
    this.labels.hide();
    this.timeline.hide();
    this.controls.hide();
  }

  updateUI() {
    if (!this.currentScene) return;
    const pm = this.currentScene.phaseManager;
    const phaseData = this.allPhasesData[pm.currentIndex];

    this.labels.updatePhase(
      phaseData,
      pm.currentIndex,
      pm.phaseCount,
      pm.progress
    );

    this.timeline.update(pm.currentIndex, pm.progress);
  }

  startAnimation() {
    const animate = (timestamp) => {
      this.animationFrame = requestAnimationFrame(animate);

      if (!this.currentScene) return;

      const pm = this.currentScene.phaseManager;
      const phaseData = this.allPhasesData[pm.currentIndex];

      let elapsed = 0;
      const duration = phaseData ? phaseData.duration : 5000;

      if (this.controls.isPlaying) {
        elapsed = (timestamp - this.phaseStartTime) * this.controls.speed;
        this.lastTimestamp = elapsed;

        // Check if phase completed
        if (elapsed >= duration) {
          const canAdvance = pm.nextPhase();
          if (canAdvance) {
            this.phaseStartTime = timestamp;

            // Show quiz at end of phase
            if (phaseData && phaseData.quizQuestion) {
              this.controls.isPlaying = false;
              this.controls.updatePlayButton();

              this.quiz.show(phaseData.quizQuestion, () => {
                this.updateUI();
              });
            }
          } else {
            // Finished all phases
            this.controls.isPlaying = false;
            this.controls.updatePlayButton();
          }
        }
      }

      // Update scene
      pm.updatePhase(elapsed, duration);
      this.currentScene.update(elapsed);

      // Update UI periodically
      if (Math.floor(timestamp / 100) !== Math.floor((timestamp - 16) / 100)) {
        this.updateUI();
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  stopAnimation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    if (this.currentScene) {
      this.currentScene.dispose();
      this.currentScene = null;
    }

    // Clear canvas container
    const container = document.getElementById('canvas-container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

// Initialize
const app = new App();
