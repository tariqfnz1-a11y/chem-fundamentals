// three-manager.js – Reusable Three.js scene manager

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class ThreeManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.container = null;
        this.active = false;
        this.animId = null;
        this.userData = {};
        this.paused = false;
        this.intervals = [];
    }

    /**
     * Initialise the 3D scene inside the given container.
     * @param {string} containerId – DOM id of the container element.
     * @param {Function} builderFn – function(scene, userData, segments, manager) to add custom objects.
     * @param {Object} options – { segments: number } for geometry quality.
     * @returns {boolean} – true if success.
     */
    init(containerId, builderFn, options = {}) {
        try {
            const container = document.getElementById(containerId);
            if (!container) throw new Error(`Container #${containerId} not found.`);
            this.container = container;

            // Show spinner if present
            const spinner = container.querySelector('.spinner');
            if (spinner) spinner.style.display = 'flex';

            // Use lower polygon count by default (performance)
            const segments = options.segments || 12;

            const w = container.clientWidth || 400;
            const h = container.clientHeight || 300;

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0a0e1a);
            this.scene = scene;

            const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
            camera.position.set(5, 3, 7);
            camera.lookAt(0, 0, 0);
            this.camera = camera;

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);
            this.renderer = renderer;

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.0;
            controls.target.set(0, 0, 0);
            controls.update();
            this.controls = controls;

            // Lighting
            const ambient = new THREE.AmbientLight(0x404060);
            scene.add(ambient);
            const dir = new THREE.DirectionalLight(0xffffff, 1.2);
            dir.position.set(10, 10, 10);
            scene.add(dir);
            const fill = new THREE.DirectionalLight(0x4488ff, 0.6);
            fill.position.set(-10, 0, 5);
            scene.add(fill);

            // Stars background (low poly points)
            const starsGeo = new THREE.BufferGeometry();
            const starsCount = 300;
            const starPos = new Float32Array(starsCount * 3);
            for (let i = 0; i < starsCount * 3; i++) {
                starPos[i] = (Math.random() - 0.5) * 80;
            }
            starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
            const starsMat = new THREE.PointsMaterial({
                color: 0x8888ff,
                size: 0.06,
                transparent: true,
            });
            const stars = new THREE.Points(starsGeo, starsMat);
            scene.add(stars);

            // Build custom content; pass segments and manager reference
            if (typeof builderFn === 'function') {
                builderFn(scene, this.userData, segments, this);
            }

            // Hide spinner
            if (spinner) spinner.style.display = 'none';

            this.active = true;
            this.animate();
            return true;
        } catch (error) {
            console.error('ThreeManager init error:', error);
            const container = document.getElementById(containerId);
            if (container) {
                const spinner = container.querySelector('.spinner');
                if (spinner) spinner.style.display = 'none';
                container.innerHTML = `<div style="color:#f87171;padding:20px;text-align:center;">⚠️ 3D scene could not load. Check console.</div>`;
            }
            return false;
        }
    }

    /**
     * Main animation loop – called automatically.
     * Pauses if this.paused is true.
     */
    animate() {
        if (!this.active || this.paused) {
            // Keep the loop running even when paused (so we can resume later)
            this.animId = requestAnimationFrame(() => this.animate());
            return;
        }
        this.animId = requestAnimationFrame(() => this.animate());

        // Rotate main group if present
        if (this.userData.group) {
            this.userData.group.rotation.y += 0.005;
        }

        // Custom update hook (e.g., for particles)
        if (this.userData.update) {
            this.userData.update();
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    /** Pause the animation loop (saves CPU when tab is hidden). */
    pause() {
        this.paused = true;
    }

    /** Resume the animation loop. */
    resume() {
        this.paused = false;
    }

    /** Resize renderer and camera when container changes size. */
    resize() {
        if (!this.container || !this.renderer || !this.camera) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.renderer.setSize(w, h);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }

    /**
     * Register an interval that will be automatically cleared on dispose.
     * @param {Function} fn – function to execute.
     * @param {number} ms – milliseconds between executions.
     * @returns {number} – interval ID.
     */
    addInterval(fn, ms) {
        const id = setInterval(fn, ms);
        this.intervals.push(id);
        return id;
    }

    /** Clear all registered intervals. */
    clearIntervals() {
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];
    }

    /** Completely dispose the scene, renderer, controls, and intervals. */
    dispose() {
        this.active = false;
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        }
        this.clearIntervals();

        if (this.controls) {
            this.controls.dispose();
            this.controls = null;
        }

        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
            this.renderer = null;
        }

        // Clear scene (optional – Three.js will garbage collect)
        if (this.scene) {
            this.scene.clear();
            this.scene = null;
        }

        this.camera = null;
        this.userData = {};
        this.container = null;
    }
}
