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

    init(containerId, builderFn, options = {}) {
        try {
            const container = document.getElementById(containerId);
            if (!container) throw new Error(`Container #${containerId} not found.`);
            this.container = container;
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

            const ambient = new THREE.AmbientLight(0x404060);
            scene.add(ambient);
            const dir = new THREE.DirectionalLight(0xffffff, 1.2);
            dir.position.set(10, 10, 10);
            scene.add(dir);
            const fill = new THREE.DirectionalLight(0x4488ff, 0.6);
            fill.position.set(-10, 0, 5);
            scene.add(fill);

            const starsGeo = new THREE.BufferGeometry();
            const starsCount = 300;
            const starPos = new Float32Array(starsCount * 3);
            for (let i = 0; i < starsCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 80;
            starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
            const starsMat = new THREE.PointsMaterial({ color: 0x8888ff, size: 0.06, transparent: true });
            const stars = new THREE.Points(starsGeo, starsMat);
            scene.add(stars);

            if (typeof builderFn === 'function') {
                builderFn(scene, this.userData, segments, this);
            }

            this.active = true;
            this.animate();
            return true;
        } catch (error) {
            console.error('ThreeManager init error:', error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `<div style="color:#f87171;padding:20px;text-align:center;">⚠️ 3D scene could not load.</div>`;
            }
            return false;
        }
    }

    animate() {
        if (!this.active || this.paused) {
            this.animId = requestAnimationFrame(() => this.animate());
            return;
        }
        this.animId = requestAnimationFrame(() => this.animate());
        if (this.userData.group) {
            this.userData.group.rotation.y += 0.005;
        }
        if (this.userData.update) {
            this.userData.update();
        }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    pause() { this.paused = true; }
    resume() { this.paused = false; }

    resize() {
        if (!this.container || !this.renderer || !this.camera) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.renderer.setSize(w, h);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }

    addInterval(fn, ms) {
        const id = setInterval(fn, ms);
        this.intervals.push(id);
        return id;
    }

    clearIntervals() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
    }

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
        this.scene = null;
        this.camera = null;
        this.userData = {};
        this.container = null;
    }
}
