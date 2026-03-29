/**
 * Mitosis 3D scene manager
 * Handles Three.js scene setup, camera, lighting, and cell rendering
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSpindle } from './spindle.js';
import { MitosisPhaseManager, MITOSIS_PHASES } from './phases.js';

export class MitosisScene {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.phaseManager = null;
    this.clock = new THREE.Clock();

    this.cellMembrane = null;
    this.nucleus = null;
    this.nucleolus = null;
    this.spindle = null;

    this.init();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a1a);
    this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.08);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 2, 6);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 15;
    this.controls.autoRotate = false;

    this.setupLighting();
    this.setupCell();
    this.setupSpindle();

    // Phase manager
    this.phaseManager = new MitosisPhaseManager(this.scene);

    // Resize handler
    window.addEventListener('resize', () => this.onResize());
  }

  setupLighting() {
    const ambient = new THREE.AmbientLight(0x4466aa, 0.4);
    this.scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    this.scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x6688cc, 0.3);
    fillLight.position.set(-3, -2, -4);
    this.scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x3b82f6, 0.5, 20);
    rimLight.position.set(0, 0, -5);
    this.scene.add(rimLight);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 40, 0x1a1a3e, 0x1a1a3e);
    gridHelper.position.y = -3;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
  }

  setupCell() {
    // Cell membrane
    const membraneGeo = new THREE.SphereGeometry(2, 64, 64);
    const membraneMat = new THREE.MeshPhongMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      shininess: 80,
    });
    this.cellMembrane = new THREE.Mesh(membraneGeo, membraneMat);
    this.scene.add(this.cellMembrane);

    // Cell membrane wireframe
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const wireframe = new THREE.Mesh(membraneGeo.clone(), wireframeMat);
    this.scene.add(wireframe);

    // Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    this.nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    this.scene.add(this.nucleus);

    // Nucleolus
    const nucleolusGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const nucleolusMat = new THREE.MeshPhongMaterial({
      color: 0xc4b5fd,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.3,
    });
    this.nucleolus = new THREE.Mesh(nucleolusGeo, nucleolusMat);
    this.nucleolus.position.set(0.2, 0.1, 0.1);
    this.scene.add(this.nucleolus);
  }

  setupSpindle() {
    this.spindle = createSpindle({ poleDistance: 3.5 });
    this.spindle.visible = false;
    this.scene.add(this.spindle);
  }

  update(currentTime) {
    const pm = this.phaseManager;
    if (!pm) return;

    pm.updatePhase(currentTime, 5000);

    // Phase-specific scene updates
    switch (pm.currentPhaseId) {
      case 'interphase':
        this.nucleus.material.opacity = 0.25 - pm.progress * 0.05;
        this.nucleolus.material.opacity = 1;
        this.spindle.visible = false;
        break;

      case 'prophase':
        this.nucleus.material.opacity = 0.2 - pm.progress * 0.2;
        this.nucleus.scale.setScalar(1 - pm.progress * 0.3);
        this.nucleolus.material.opacity = 1 - pm.progress;
        this.spindle.visible = pm.progress > 0.5;
        break;

      case 'metaphase':
        this.nucleus.visible = false;
        this.nucleolus.visible = false;
        this.spindle.visible = true;
        this.cellMembrane.scale.set(1, 1 + pm.progress * 0.05, 1);
        break;

      case 'anaphase':
        this.spindle.visible = true;
        this.cellMembrane.scale.set(1, 1.05 + pm.progress * 0.15, 1);
        break;

      case 'telophase':
        this.spindle.visible = false;
        this.nucleus.visible = true;
        this.nucleus.material.opacity = pm.progress * 0.25;
        this.nucleolus.visible = true;
        this.nucleolus.material.opacity = pm.progress;
        break;

      case 'cytokinesis':
        this.cellMembrane.scale.set(1 + pm.progress * 0.3, 1.2, 1);
        break;
    }

    // Rotate cell membrane slowly
    this.cellMembrane.rotation.y += 0.001;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  dispose() {
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', () => this.onResize());
  }
}
