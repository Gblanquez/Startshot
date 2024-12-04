import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class JourneyPath {
  constructor(journeyElement) {
    this.journeyElement = journeyElement;
    if (!this.journeyElement) {
      console.error('JourneyPath: journeyElement not found!');
      return;
    }
    this.init();
  }

  init() {
    // Create Scene
    this.scene = new THREE.Scene();

    // Create Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.journeyElement.clientWidth / this.journeyElement.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 40, 150); // Adjusted for vertical path
    this.camera.lookAt(0, 40, 0);

    // Create Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.journeyElement.clientWidth, this.journeyElement.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.journeyElement.appendChild(this.renderer.domElement);

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, 1);
    this.pointLight.position.set(2, 10, 5);
    this.scene.add(this.pointLight);

    // Postprocessing
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.journeyElement.clientWidth, this.journeyElement.clientHeight),
      1.5,
      0.4,
      0.85
    );
    this.composer.addPass(this.bloomPass);

    // Create the path
    this.createPath();

    // Attach resize listener
    window.addEventListener('resize', this.onResize.bind(this));

    // Start rendering
    this.animate();

    // Add ScrollTrigger
    this.setupScrollAnimations();
  }

  createPath() {
    // Define the path
    const points = [
      new THREE.Vector3(0, 80, 0), // Start high up
      new THREE.Vector3(10, 60, 0), // Pronounced curve to the right
      new THREE.Vector3(-5, 40, 0), // Gradual curve back to the left
      new THREE.Vector3(5, 20, 0), // Smooth transition downward
      new THREE.Vector3(0, 0, 0), // End at the bottom
    ];

    this.curve = new THREE.CatmullRomCurve3(points);

    // Tube Geometry
    const tubeGeometry = new THREE.TubeGeometry(this.curve, 200, 0.15, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    this.tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    this.tube.position.set(0, 0, 0);
    this.tube.scale.set(2, 0, 2); // Start with tube collapsed on Y-axis
    this.scene.add(this.tube);
  }

  setupScrollAnimations() {
    // Scroll-driven tube growth animation
    gsap.to(this.tube.scale, {
      y: 2, // Fully grow the path
      scrollTrigger: {
        trigger: '.story-grid-wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Sync with scroll
      },
    });

    // Scroll-driven camera follow
    gsap.to(this.camera.position, {
      y: 0, // Move camera downward as tube grows
      scrollTrigger: {
        trigger: '.story-grid-wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Sync with scroll
      },
      onUpdate: () => {
        this.camera.lookAt(0, 0, 0); // Ensure camera keeps looking at the tube center
      },
    });
  }

  onResize() {
    this.camera.aspect = this.journeyElement.clientWidth / this.journeyElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.journeyElement.clientWidth, this.journeyElement.clientHeight);
    this.composer.setSize(this.journeyElement.clientWidth, this.journeyElement.clientHeight);
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      this.composer.render();
    });
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) object.material.dispose();
    });
    this.renderer.dispose();
    this.journeyElement.removeChild(this.renderer.domElement);
  }
}

export default JourneyPath;