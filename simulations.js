// simulations.js – Optimised (lower particle counts, fewer segments)
import * as THREE from 'three';

export const simulationBuilders = {
    matter: (scene, userData, segments, manager) => {
        const size = 4;
        const geo = new THREE.SphereGeometry(0.2, segments, segments);
        const mat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x1a3a6a, emissiveIntensity: 0.3 });
        const particles = [];
        // Reduced from 50 to 30
        for (let i = 0; i < 30; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            const pos = new THREE.Vector3(
                (Math.random() - 0.5) * size,
                (Math.random() - 0.5) * size,
                (Math.random() - 0.5) * size
            );
            mesh.position.copy(pos);
            mesh.userData.vel = new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
            scene.add(mesh);
            particles.push(mesh);
        }
        // ... rest same
    },
    // ... other stations (unchanged but inherit lower segments)
};

// 2D Canvas helper – reduced particles and removed shadow blur
export function init2DParticles(canvasId, tempSliderId, stateSelectId, stateBadgeId, tempLabelId, onStateChange) {
    // ... same setup, but reduce numParticles to 40
    const numParticles = 40; // was 60
    // Inside draw loop, remove shadowBlur to improve performance
    // Instead of ctx.shadowBlur = 10, just fill without shadow.
    // So we remove ctx.shadowColor and ctx.shadowBlur lines.
    // ...
}
