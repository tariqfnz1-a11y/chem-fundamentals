// simulations.js – All 3D simulation builders + 2D helper for Matter

import * as THREE from 'three';

export const simulationBuilders = {
    // ─── MATTER ──────────────────────────────────────────────────────
    matter: (scene, userData, segments, manager) => {
        const size = 4;
        const geo = new THREE.SphereGeometry(0.2, segments, segments);
        const mat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x1a3a6a, emissiveIntensity: 0.3 });
        const particles = [];
        for (let i = 0; i < 50; i++) {
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
        // Wireframe box
        const boxGeo = new THREE.BoxGeometry(size, size, size);
        const edges = new THREE.EdgesGeometry(boxGeo);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x2d5a9a, transparent: true, opacity: 0.3 });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        scene.add(wireframe);

        const speedDisplay = document.getElementById('speedDisplay');
        userData.updateParticles = (state, temp) => {
            const speed = 0.005 + (temp / 100) * 0.04;
            const half = size * 0.4;
            let totalSpeed = 0;
            particles.forEach(p => {
                let targetSpeed = speed;
                let damping = 0.98;
                if (state === 'solid') {
                    targetSpeed *= 0.1;
                    damping = 0.9;
                    p.position.x += (Math.random() - 0.5) * 0.05 * (temp / 100);
                    p.position.y += (Math.random() - 0.5) * 0.05 * (temp / 100);
                    p.position.z += (Math.random() - 0.5) * 0.05 * (temp / 100);
                    return;
                } else if (state === 'liquid') {
                    targetSpeed *= 0.4;
                } else if (state === 'gas') {
                    targetSpeed *= 1.0;
                } else if (state === 'plasma') {
                    targetSpeed *= 1.8;
                    p.material.color.setHSL(0.8, 0.9, 0.6 + Math.random() * 0.2);
                }
                const vel = p.userData.vel;
                vel.x += (Math.random() - 0.5) * 0.01 * targetSpeed * 2;
                vel.y += (Math.random() - 0.5) * 0.01 * targetSpeed * 2;
                vel.z += (Math.random() - 0.5) * 0.01 * targetSpeed * 2;
                vel.multiplyScalar(damping);
                p.position.x += vel.x;
                p.position.y += vel.y;
                p.position.z += vel.z;
                const bound = half;
                if (Math.abs(p.position.x) > bound) { p.position.x = Math.sign(p.position.x) * bound; vel.x *= -0.5; }
                if (Math.abs(p.position.y) > bound) { p.position.y = Math.sign(p.position.y) * bound; vel.y *= -0.5; }
                if (Math.abs(p.position.z) > bound) { p.position.z = Math.sign(p.position.z) * bound; vel.z *= -0.5; }
                totalSpeed += vel.length();
            });
            if (speedDisplay) speedDisplay.textContent = (totalSpeed / particles.length).toFixed(2);
        };
        userData._particles = particles;
    },

    // ─── ATOMS ──────────────────────────────────────────────────────
    atoms: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const protonMat = new THREE.MeshStandardMaterial({ color: 0xff4444, emissive: 0x661111 });
        const neutronMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
        const protonGeo = new THREE.SphereGeometry(0.5, segments, segments);
        const neutronGeo = new THREE.SphereGeometry(0.5, segments, segments);
        const electronMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x1a3a6a });
        const electronGeo = new THREE.SphereGeometry(0.15, segments, segments);

        function buildAtom(p, n) {
            while(group.children.length) group.remove(group.children[0]);
            const positions = [
                [0.8,0.8,0],[-0.8,-0.8,0],[0.8,-0.8,0.8],[-0.8,0.8,-0.8],
                [0,0,1.0],[0,0,-1.0],[0.6,0.6,-0.6],[-0.6,-0.6,-0.6],
                [0.6,-0.6,0.6],[-0.6,0.6,0.6],[1.0,0,0],[-1.0,0,0],
                [0,1.0,0],[0,-1.0,0],[0.7,0.7,0.7],[-0.7,-0.7,-0.7]
            ];
            let idx = 0;
            for (let i=0; i<p; i++) {
                const pos = positions[idx % positions.length];
                const mesh = new THREE.Mesh(protonGeo, protonMat);
                mesh.position.set(pos[0], pos[1], pos[2]);
                group.add(mesh);
                idx++;
            }
            for (let i=0; i<n; i++) {
                const pos = positions[idx % positions.length];
                const mesh = new THREE.Mesh(neutronGeo, neutronMat);
                mesh.position.set(pos[0], pos[1], pos[2]);
                group.add(mesh);
                idx++;
            }
            const electronGroup = new THREE.Group();
            for (let i=0; i<p; i++) {
                const angle = (i / p) * Math.PI * 2;
                const radius = 1.8 + (i % 2) * 0.5;
                const e = new THREE.Mesh(electronGeo, electronMat);
                e.position.set(Math.cos(angle)*radius, Math.sin(angle)*radius*0.6, Math.sin(angle+1.2)*0.6);
                e.userData = { angle, speed: 0.02 + i*0.005, radius, tilt: 1.2 };
                electronGroup.add(e);
            }
            group.add(electronGroup);
            const elemName = document.getElementById('atomElementName');
            if (elemName) {
                const names = ['Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminum','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium'];
                elemName.textContent = names[p-1] || 'Unknown';
            }
        }

        userData.buildAtom = buildAtom;
        scene.add(group);
        userData.group = group;

        // Attach sliders
        const protonSlider = document.getElementById('protonSlider');
        const neutronSlider = document.getElementById('neutronSlider');
        const protonCount = document.getElementById('protonCount');
        const neutronCount = document.getElementById('neutronCount');
        function update() {
            const p = parseInt(protonSlider.value);
            const n = parseInt(neutronSlider.value);
            protonCount.textContent = p;
            neutronCount.textContent = n;
            buildAtom(p, n);
        }
        protonSlider.addEventListener('input', update);
        neutronSlider.addEventListener('input', update);
        update();

        // Label toggle (CSS2DRenderer would be needed for proper labels, but we keep it simple)
        // We'll just store a reference to electron group for possible future use.
    },

    // ─── ELEMENTS ──────────────────────────────────────────────────
    elements: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        let showBonds = false;
        let currentElement = 'fe';
        const colorMap = { fe: 0x8899aa, cu: 0xcc8844, au: 0xffaa44 };

        function buildElement(type) {
            while(group.children.length) group.remove(group.children[0]);
            const color = colorMap[type] || 0x8899aa;
            const mat = new THREE.MeshStandardMaterial({ color, metalness:0.6, roughness:0.3 });
            const geo = new THREE.SphereGeometry(0.4, segments, segments);
            const size = 2.5, step = 0.9;
            const positions = [];
            for (let x=-size; x<=size; x+=step)
                for (let y=-size; y<=size; y+=step)
                    for (let z=-size; z<=size; z+=step)
                        positions.push([x,y,z]);
            positions.forEach(pos => {
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(pos[0], pos[1], pos[2]);
                group.add(mesh);
            });
            if (showBonds) {
                const bondMat = new THREE.MeshStandardMaterial({ color:0x888888, transparent:true, opacity:0.3 });
                const makeBond = (p1,p2) => {
                    const start = new THREE.Vector3(p1[0],p1[1],p1[2]);
                    const end = new THREE.Vector3(p2[0],p2[1],p2[2]);
                    const dir = new THREE.Vector3().subVectors(end,start);
                    const len = dir.length();
                    if (len > step*1.1) return null;
                    const mid = new THREE.Vector3().addVectors(start,end).multiplyScalar(0.5);
                    const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,len,6), bondMat);
                    bond.position.copy(mid);
                    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
                    return bond;
                };
                for (let i=0; i<positions.length; i++)
                    for (let j=i+1; j<positions.length; j++) {
                        const bond = makeBond(positions[i], positions[j]);
                        if (bond) group.add(bond);
                    }
            }
        }

        const select = document.getElementById('elementSelect');
        const toggleBtn = document.getElementById('toggleElementBonds');
        if (select) {
            select.addEventListener('change', () => { currentElement = select.value; buildElement(currentElement); });
        }
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                showBonds = !showBonds;
                toggleBtn.textContent = showBonds ? 'Hide Bonds' : 'Show Bonds';
                buildElement(currentElement);
            });
        }
        buildElement('fe');
        scene.add(group);
        userData.group = group;
    },

    // ─── MOLECULES ──────────────────────────────────────────────────
    molecules: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const bondMat = new THREE.MeshStandardMaterial({ color:0xaaaaaa, roughness:0.6 });
        const makeBond = (from,to) => {
            const start = new THREE.Vector3(from.x,from.y,from.z);
            const end = new THREE.Vector3(to.x,to.y,to.z);
            const dir = new THREE.Vector3().subVectors(end,start);
            const len = dir.length();
            const mid = new THREE.Vector3().addVectors(start,end).multiplyScalar(0.5);
            const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,len,6), bondMat);
            bond.position.copy(mid);
            bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
            return bond;
        };
        function buildMolecule(type) {
            while(group.children.length) group.remove(group.children[0]);
            if (type === 'water') {
                const o = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333, emissive:0x440000 }));
                o.position.set(0,0,0); group.add(o);
                const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h1.position.set(0.7,0.5,0.6); group.add(h1);
                const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h2.position.set(-0.7,0.5,-0.6); group.add(h2);
                group.add(makeBond(o.position, h1.position));
                group.add(makeBond(o.position, h2.position));
            } else if (type === 'co2') {
                const c = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0x888888 }));
                c.position.set(0,0,0); group.add(c);
                const o1 = new THREE.Mesh(new THREE.SphereGeometry(0.6, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o1.position.set(1.4,0,0); group.add(o1);
                const o2 = new THREE.Mesh(new THREE.SphereGeometry(0.6, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o2.position.set(-1.4,0,0); group.add(o2);
                group.add(makeBond(c.position, o1.position));
                group.add(makeBond(c.position, o2.position));
            } else if (type === 'oxygen') {
                const o1 = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o1.position.set(-0.7,0,0); group.add(o1);
                const o2 = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o2.position.set(0.7,0,0); group.add(o2);
                group.add(makeBond(o1.position, o2.position));
                const bond2 = makeBond(new THREE.Vector3(-0.7,0.2,0), new THREE.Vector3(0.7,0.2,0));
                group.add(bond2);
            } else if (type === 'methane') {
                const c = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0x666666 }));
                c.position.set(0,0,0); group.add(c);
                const hPos = [[0.9,0.9,0.9],[-0.9,-0.9,0.9],[0.9,-0.9,-0.9],[-0.9,0.9,-0.9]];
                hPos.forEach(pos => {
                    const h = new THREE.Mesh(new THREE.SphereGeometry(0.45, segments, segments),
                        new THREE.MeshStandardMaterial({ color:0xccccff }));
                    h.position.set(pos[0],pos[1],pos[2]); group.add(h);
                    group.add(makeBond(c.position, h.position));
                });
            }
        }
        const select = document.getElementById('moleculeSelect');
        if (select) select.addEventListener('change', () => buildMolecule(select.value));
        buildMolecule('water');
        scene.add(group);
        userData.group = group;
    },

    // ─── COMPOUNDS ──────────────────────────────────────────────────
    compounds: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const naMat = new THREE.MeshStandardMaterial({ color:0x6666ff, emissive:0x111144 });
        const clMat = new THREE.MeshStandardMaterial({ color:0x66ff66, emissive:0x114411 });
        const naGeo = new THREE.SphereGeometry(0.6, segments, segments);
        const clGeo = new THREE.SphereGeometry(0.8, segments, segments);
        const positions = [[0,0,0],[1.5,0,0],[-1.5,0,0],[0,1.5,0],[0,-1.5,0],[0,0,1.5],[0,0,-1.5]];
        positions.forEach((pos,i) => {
            const isNa = i===0 || i%2===0;
            const mesh = new THREE.Mesh(isNa ? naGeo : clGeo, isNa ? naMat : clMat);
            mesh.position.set(pos[0],pos[1],pos[2]);
            group.add(mesh);
        });
        scene.add(group);
        userData.group = group;

        let showBonds = false;
        const btn = document.getElementById('toggleBondsBtn');
        if (btn) {
            btn.addEventListener('click', () => {
                showBonds = !showBonds;
                btn.textContent = showBonds ? 'Hide Bonds' : 'Show Bonds';
                group.children.forEach(c => { if (c.isBond) group.remove(c); });
                if (showBonds) {
                    const bondMat = new THREE.MeshStandardMaterial({ color:0xffff88 });
                    const makeBond = (from,to) => {
                        const start = new THREE.Vector3(from.x,from.y,from.z);
                        const end = new THREE.Vector3(to.x,to.y,to.z);
                        const dir = new THREE.Vector3().subVectors(end,start);
                        const len = dir.length();
                        const mid = new THREE.Vector3().addVectors(start,end).multiplyScalar(0.5);
                        const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,len,6), bondMat);
                        bond.position.copy(mid);
                        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
                        bond.isBond = true;
                        return bond;
                    };
                    const naPos = new THREE.Vector3(0,0,0);
                    positions.forEach(pos => {
                        if (pos[0]!==0 || pos[1]!==0 || pos[2]!==0) {
                            const clPos = new THREE.Vector3(pos[0],pos[1],pos[2]);
                            group.add(makeBond(naPos, clPos));
                        }
                    });
                }
            });
        }
    },

    // ─── MIXTURES ──────────────────────────────────────────────────
    mixtures: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const boxSize = 3;
        const saltMat = new THREE.MeshStandardMaterial({ color:0x4488ff });
        const sandMat = new THREE.MeshStandardMaterial({ color:0xff8844 });
        const geo = new THREE.SphereGeometry(0.2, segments, segments);
        let saltParticles = [], sandParticles = [];
        let mode = 'saltwater';
        const resultSpan = document.getElementById('mixResult');

        function buildMixture(type) {
            while(group.children.length) group.remove(group.children[0]);
            saltParticles = []; sandParticles = [];
            const count = 30;
            const half = boxSize * 0.35;
            if (type === 'saltwater') {
                for (let i=0; i<count; i++) {
                    const mesh = new THREE.Mesh(geo, saltMat);
                    mesh.position.set((Math.random()-0.5)*half*2, (Math.random()-0.5)*half*2, (Math.random()-0.5)*half*2);
                    group.add(mesh); saltParticles.push(mesh);
                }
                const waterMat = new THREE.MeshStandardMaterial({ color:0x88ccff, transparent:true, opacity:0.3 });
                for (let i=0; i<20; i++) {
                    const w = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 6), waterMat);
                    w.position.set((Math.random()-0.5)*boxSize*0.8, (Math.random()-0.5)*boxSize*0.8, (Math.random()-0.5)*boxSize*0.8);
                    group.add(w);
                }
            } else {
                for (let i=0; i<count; i++) {
                    const mesh = new THREE.Mesh(geo, sandMat);
                    mesh.position.set((Math.random()-0.5)*half*2, (Math.random()-0.5)*half*2, (Math.random()-0.5)*half*2);
                    group.add(mesh); sandParticles.push(mesh);
                }
                const waterMat = new THREE.MeshStandardMaterial({ color:0x88ccff, transparent:true, opacity:0.3 });
                for (let i=0; i<20; i++) {
                    const w = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 6), waterMat);
                    w.position.set((Math.random()-0.5)*boxSize*0.8, (Math.random()-0.5)*boxSize*0.8, (Math.random()-0.5)*boxSize*0.8);
                    group.add(w);
                }
            }
            const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
            const edges = new THREE.EdgesGeometry(boxGeo);
            const lineMat = new THREE.LineBasicMaterial({ color:0x2d5a9a, transparent:true, opacity:0.3 });
            const wireframe = new THREE.LineSegments(edges, lineMat);
            group.add(wireframe);
        }

        document.getElementById('mixSaltBtn')?.addEventListener('click', () => {
            mode = 'saltwater'; buildMixture('saltwater'); if (resultSpan) resultSpan.textContent = 'Salt + Water mixture';
        });
        document.getElementById('mixSandBtn')?.addEventListener('click', () => {
            mode = 'sandwater'; buildMixture('sandwater'); if (resultSpan) resultSpan.textContent = 'Sand + Water mixture';
        });
        document.getElementById('filterBtn')?.addEventListener('click', () => {
            if (mode === 'sandwater') {
                sandParticles.forEach(p => group.remove(p));
                sandParticles = [];
                if (resultSpan) resultSpan.textContent = 'Filtered: sand removed, water left';
            } else {
                if (resultSpan) resultSpan.textContent = 'Filtration works for heterogeneous mixtures (sand+water)';
            }
        });
        document.getElementById('evaporateBtn')?.addEventListener('click', () => {
            if (mode === 'saltwater') {
                group.children.forEach(c => {
                    if (c.material && c.material.transparent && c.material.opacity < 0.5) {
                        group.remove(c);
                    }
                });
                if (resultSpan) resultSpan.textContent = 'Evaporated: water removed, salt remains';
            } else {
                if (resultSpan) resultSpan.textContent = 'Evaporation works for homogeneous mixtures (saltwater)';
            }
        });

        buildMixture('saltwater');
        scene.add(group);
        userData.group = group;
    },

    // ─── BONDS ──────────────────────────────────────────────────────
    bonds: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        function buildBond(type) {
            while(group.children.length) group.remove(group.children[0]);
            if (type === 'ionic') {
                const na = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0x6666ff, emissive:0x111144 }));
                na.position.set(-1.2,0,0); group.add(na);
                const cl = new THREE.Mesh(new THREE.SphereGeometry(0.9, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0x66ff66, emissive:0x114411 }));
                cl.position.set(1.2,0,0); group.add(cl);
                const arrow = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(-0.5,0,0), 1.0, 0xffaa00, 0.3, 0.2);
                group.add(arrow);
            } else if (type === 'covalent') {
                const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h1.position.set(-1.0,0,0); group.add(h1);
                const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h2.position.set(1.0,0,0); group.add(h2);
                const bondMat = new THREE.MeshStandardMaterial({ color:0x88aaff });
                const makeBond = (from,to) => {
                    const start = new THREE.Vector3(from.x,from.y,from.z);
                    const end = new THREE.Vector3(to.x,to.y,to.z);
                    const dir = new THREE.Vector3().subVectors(end,start);
                    const len = dir.length();
                    const mid = new THREE.Vector3().addVectors(start,end).multiplyScalar(0.5);
                    const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,len,6), bondMat);
                    bond.position.copy(mid);
                    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
                    return bond;
                };
                group.add(makeBond(h1.position, h2.position));
                const cloud = new THREE.Mesh(new THREE.SphereGeometry(0.3, segments, segments),
                    new THREE.MeshBasicMaterial({ color:0x88aaff, transparent:true, opacity:0.3 }));
                cloud.position.set(0,0,0); group.add(cloud);
            } else if (type === 'metallic') {
                for (let i=0; i<20; i++) {
                    const metal = new THREE.Mesh(new THREE.SphereGeometry(0.3, segments, segments),
                        new THREE.MeshStandardMaterial({ color:0x88aadd, metalness:0.8, roughness:0.2 }));
                    metal.position.set((Math.random()-0.5)*4, (Math.random()-0.5)*4, (Math.random()-0.5)*4);
                    group.add(metal);
                }
                for (let i=0; i<40; i++) {
                    const e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6),
                        new THREE.MeshBasicMaterial({ color:0xffdd44, transparent:true, opacity:0.6 }));
                    e.position.set((Math.random()-0.5)*5, (Math.random()-0.5)*5, (Math.random()-0.5)*5);
                    group.add(e);
                }
            }
        }
        const select = document.getElementById('bondSelect');
        if (select) select.addEventListener('change', () => buildBond(select.value));
        buildBond('ionic');
        scene.add(group);
        userData.group = group;
    },

    // ─── CHANGES ──────────────────────────────────────────────────
    changes: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const resultSpan = document.getElementById('changeResult');
        let intervalId = null;

        function buildChange(type) {
            while(group.children.length) group.remove(group.children[0]);
            if (intervalId) { clearInterval(intervalId); intervalId = null; }
            if (type === 'physical') {
                const o = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o.position.set(0,0,0); group.add(o);
                const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h1.position.set(0.7,0.5,0.6); group.add(h1);
                const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h2.position.set(-0.7,0.5,-0.6); group.add(h2);
                if (resultSpan) resultSpan.textContent = 'Physical: Melting – molecules vibrate more, but still H₂O';
                let t = 0;
                intervalId = setInterval(() => {
                    t += 0.02;
                    const amp = 0.05 + 0.05 * Math.sin(t);
                    [h1,h2].forEach(h => {
                        h.position.x += (Math.random()-0.5)*amp;
                        h.position.y += (Math.random()-0.5)*amp;
                        h.position.z += (Math.random()-0.5)*amp;
                    });
                }, 50);
            } else if (type === 'chemical') {
                const o = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o.position.set(0,0,0); group.add(o);
                const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h1.position.set(0.7,0.5,0.6); group.add(h1);
                const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h2.position.set(-0.7,0.5,-0.6); group.add(h2);
                for (let i=0; i<10; i++) {
                    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.05, 4, 4),
                        new THREE.MeshBasicMaterial({ color:0xff8800 }));
                    spark.position.set((Math.random()-0.5)*2, (Math.random()-0.5)*2+1, (Math.random()-0.5)*2);
                    group.add(spark);
                }
                if (resultSpan) resultSpan.textContent = 'Chemical: Burning – new substances formed (ash, CO₂, H₂O)';
            }
        }

        document.getElementById('changePhysical')?.addEventListener('click', () => buildChange('physical'));
        document.getElementById('changeChemical')?.addEventListener('click', () => buildChange('chemical'));
        buildChange('physical');
        scene.add(group);
        userData.group = group;
        userData._cleanup = () => { if (intervalId) clearInterval(intervalId); };
    },

    // ─── REACTIONS ──────────────────────────────────────────────────
    reactions: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        let animating = false;
        let startTime = 0;
        const duration = 1500;
        let atomData = [];
        const statusSpan = document.getElementById('reactionStatus');

        function buildReaction(type) {
            while(group.children.length) group.remove(group.children[0]);
            atomData = [];
            animating = false;
            if (type === 'synthesis') {
                const hMat = new THREE.MeshStandardMaterial({ color:0xccccff });
                const oMat = new THREE.MeshStandardMaterial({ color:0xff3333 });
                const hGeo = new THREE.SphereGeometry(0.4, segments, segments);
                const oGeo = new THREE.SphereGeometry(0.6, segments, segments);
                const reactantPos = [[-1.5,0.3,0],[-0.5,0.3,0],[0.5,-0.3,0],[1.5,-0.3,0]];
                const endPos = [[-0.7,0.5,0.6],[0.7,-0.5,-0.6],[-0.7,-0.5,-0.6],[0.7,0.5,0.6]];
                const mats = [hMat,hMat,oMat,oMat];
                const geos = [hGeo,hGeo,oGeo,oGeo];
                reactantPos.forEach((pos,i) => {
                    const mesh = new THREE.Mesh(geos[i], mats[i]);
                    mesh.position.set(pos[0],pos[1],pos[2]);
                    group.add(mesh);
                    atomData.push({
                        mesh,
                        start: new THREE.Vector3(pos[0],pos[1],pos[2]),
                        end: new THREE.Vector3(endPos[i][0],endPos[i][1],endPos[i][2])
                    });
                });
                if (statusSpan) statusSpan.textContent = 'Reactants: 2H₂ + O₂ → Products: 2H₂O';
            } else if (type === 'combustion') {
                // Simplified: CH4 + 2O2 -> CO2 + 2H2O
                const c = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0x666666 }));
                c.position.set(-1.5,0,0); group.add(c);
                const hPos = [[-1.5+0.9,0.9,0.9],[-1.5-0.9,-0.9,0.9],[-1.5+0.9,-0.9,-0.9],[-1.5-0.9,0.9,-0.9]];
                const hMat = new THREE.MeshStandardMaterial({ color:0xccccff });
                const hGeo = new THREE.SphereGeometry(0.45, segments, segments);
                hPos.forEach(pos => {
                    const h = new THREE.Mesh(hGeo, hMat);
                    h.position.set(pos[0],pos[1],pos[2]); group.add(h);
                });
                const oMat = new THREE.MeshStandardMaterial({ color:0xff3333 });
                const oGeo = new THREE.SphereGeometry(0.6, segments, segments);
                const oPos = [[0.5,0.5,0],[0.5,-0.5,0]];
                oPos.forEach(pos => {
                    const o = new THREE.Mesh(oGeo, oMat);
                    o.position.set(pos[0],pos[1],pos[2]); group.add(o);
                });
                if (statusSpan) statusSpan.textContent = 'Reactants: CH₄ + 2O₂ → Products: CO₂ + 2H₂O';
                // For simplicity, we won't animate combustion; just show the equation.
                // Could be extended similar to synthesis.
            }
        }

        function startAnimation() {
            if (animating || atomData.length === 0) return;
            animating = true;
            startTime = performance.now();
            atomData.forEach(d => d.mesh.position.copy(d.start));
            if (statusSpan) statusSpan.textContent = '⏳ Reacting...';
            function animateStep() {
                const elapsed = performance.now() - startTime;
                const t = Math.min(elapsed / duration, 1);
                const ease = t < 0.5 ? 2*t*t : -1 + (4-2*t)*t;
                atomData.forEach(d => {
                    d.mesh.position.lerpVectors(d.start, d.end, ease);
                });
                if (t < 1) {
                    requestAnimationFrame(animateStep);
                } else {
                    animating = false;
                    if (statusSpan) statusSpan.textContent = '✅ Reaction complete!';
                }
            }
            animateStep();
        }

        const select = document.getElementById('reactionSelect');
        const animateBtn = document.getElementById('animateReactionBtn');
        if (animateBtn) {
            animateBtn.addEventListener('click', () => {
                buildReaction(select ? select.value : 'synthesis');
                setTimeout(startAnimation, 300);
            });
        }
        buildReaction('synthesis');
        scene.add(group);
        userData.group = group;
        userData.startAnimation = startAnimation;
    },

    // ─── CONSERVATION ──────────────────────────────────────────────
    conservation: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const hMat = new THREE.MeshStandardMaterial({ color:0xccccff });
        const oMat = new THREE.MeshStandardMaterial({ color:0xff3333 });
        const hGeo = new THREE.SphereGeometry(0.4, segments, segments);
        const oGeo = new THREE.SphereGeometry(0.6, segments, segments);
        const positions = [[-2,0.5,0.5],[-1.5,-0.5,-0.5],[-1,0.5,-0.5],[-0.5,-0.5,0.5],[0.5,0,0.5],[1,0,-0.5]];
        const atoms = [];
        positions.forEach((pos,i) => {
            const isH = i < 4;
            const mesh = new THREE.Mesh(isH ? hGeo : oGeo, isH ? hMat : oMat);
            mesh.position.set(pos[0],pos[1],pos[2]);
            mesh.userData.orig = new THREE.Vector3(pos[0],pos[1],pos[2]);
            group.add(mesh);
            atoms.push(mesh);
        });
        // Box
        const boxGeo = new THREE.BoxGeometry(5,3,3);
        const edges = new THREE.EdgesGeometry(boxGeo);
        const lineMat = new THREE.LineBasicMaterial({ color:0x2d5a9a, transparent:true, opacity:0.2 });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        group.add(wireframe);

        const massDisplay = document.getElementById('massDisplay');
        let rearranged = false;
        document.getElementById('rearrangeBtn')?.addEventListener('click', () => {
            rearranged = !rearranged;
            if (rearranged) {
                const newPos = [[-1.5,0.5,0.5],[1.5,-0.5,-0.5],[-1.5,-0.5,-0.5],[1.5,0.5,0.5],[0,0.5,0],[0,-0.5,0]];
                atoms.forEach((atom,i) => atom.position.set(newPos[i][0],newPos[i][1],newPos[i][2]));
                if (massDisplay) massDisplay.textContent = 'Mass: 36 g (conserved)';
            } else {
                atoms.forEach((atom,i) => atom.position.copy(atom.userData.orig));
                if (massDisplay) massDisplay.textContent = 'Mass: 36 g (reactants)';
            }
        });
        scene.add(group);
        userData.group = group;
        if (massDisplay) massDisplay.textContent = 'Mass: 36 g (reactants)';
    },

    // ─── MOLE ──────────────────────────────────────────────────────
    mole: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const slider = document.getElementById('moleSlider');
        const countDisplay = document.getElementById('moleCount');
        const resetBtn = document.getElementById('moleResetBtn');
        const particleCountSpan = document.getElementById('particleCount');
        const massReadoutSpan = document.getElementById('massReadout');
        let particles = [];

        // Mapping substance -> molar mass (g/mol)
        const molarMassMap = {
            'H2O': 18.015,
            'NaCl': 58.44,
            'Fe': 55.85,
            'Au': 196.97
        };
        // Get current substance from select (if any)
        const substanceSelect = document.getElementById('moleSubstance');
        let currentSubstance = 'H2O';
        if (substanceSelect) {
            substanceSelect.addEventListener('change', () => {
                currentSubstance = substanceSelect.value;
                updateParticles(parseFloat(slider.value));
            });
            currentSubstance = substanceSelect.value;
        }

        function updateParticles(value) {
            const num = Math.round(value * 20);
            // Clear old
            particles.forEach(p => group.remove(p));
            particles = [];
            const mat = new THREE.MeshStandardMaterial({ color:0x60a5fa, emissive:0x1a3a6a });
            const geo = new THREE.SphereGeometry(0.15, segments, segments);
            for (let i=0; i<num; i++) {
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set((Math.random()-0.5)*3, (Math.random()-0.5)*3, (Math.random()-0.5)*3);
                group.add(mesh);
                particles.push(mesh);
            }
            if (countDisplay) countDisplay.textContent = `${value.toFixed(1)}×10²³`;
            // Compute number of particles and mass
            const moles = value / 10; // because slider 0-2 corresponds to 0-0.2? Actually value is 0-2 representing 10^23
            const particlesNum = moles * 6.022e23;
            const molarMass = molarMassMap[currentSubstance] || 18.015;
            const mass = moles * molarMass;
            if (particleCountSpan) particleCountSpan.textContent = particlesNum.toExponential(2);
            if (massReadoutSpan) massReadoutSpan.textContent = mass.toFixed(2);
        }

        if (slider) {
            slider.addEventListener('input', () => {
                const val = parseFloat(slider.value);
                updateParticles(val);
            });
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (slider) { slider.value = '1.0'; updateParticles(1.0); }
            });
        }
        updateParticles(0.6);
        scene.add(group);
        userData.group = group;
    },

    // ─── ACIDS & BASES ──────────────────────────────────────────────
    acids: (scene, userData, segments, manager) => {
        const group = new THREE.Group();
        const slider = document.getElementById('phSlider');
        const phValue = document.getElementById('phValue');
        const phLabel = document.getElementById('phLabel');
        const hConcentration = document.getElementById('hConcentration');

        function buildpH(pH) {
            while(group.children.length) group.remove(group.children[0]);
            const bondMat = new THREE.MeshStandardMaterial({ color:0xaaaaaa });
            const makeBond = (from,to) => {
                const start = new THREE.Vector3(from.x,from.y,from.z);
                const end = new THREE.Vector3(to.x,to.y,to.z);
                const dir = new THREE.Vector3().subVectors(end,start);
                const len = dir.length();
                const mid = new THREE.Vector3().addVectors(start,end).multiplyScalar(0.5);
                const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,len,6), bondMat);
                bond.position.copy(mid);
                bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
                return bond;
            };

            if (pH < 7) {
                // Acid: HCl
                const h = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h.position.set(-0.8,0,0); group.add(h);
                const cl = new THREE.Mesh(new THREE.SphereGeometry(0.8, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0x66ff66 }));
                cl.position.set(0.8,0,0); group.add(cl);
                group.add(makeBond(h.position, cl.position));
                const proton = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6),
                    new THREE.MeshBasicMaterial({ color:0xff8800 }));
                proton.position.set(0,0.8,0.8); group.add(proton);
                if (phLabel) phLabel.textContent = 'Acidic';
            } else if (pH > 7) {
                // Base: NaOH
                const na = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0x6666ff }));
                na.position.set(-1.0,0,0); group.add(na);
                const o = new THREE.Mesh(new THREE.SphereGeometry(0.6, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o.position.set(0,0,0); group.add(o);
                const h = new THREE.Mesh(new THREE.SphereGeometry(0.4, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h.position.set(0.8,0.5,0.5); group.add(h);
                group.add(makeBond(na.position, o.position));
                group.add(makeBond(o.position, h.position));
                const oh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6),
                    new THREE.MeshBasicMaterial({ color:0x00ff88 }));
                oh.position.set(0,-0.8,-0.8); group.add(oh);
                if (phLabel) phLabel.textContent = 'Basic';
            } else {
                // Neutral: water
                const o = new THREE.Mesh(new THREE.SphereGeometry(0.7, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xff3333 }));
                o.position.set(0,0,0); group.add(o);
                const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h1.position.set(0.7,0.5,0.6); group.add(h1);
                const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, segments, segments),
                    new THREE.MeshStandardMaterial({ color:0xccccff }));
                h2.position.set(-0.7,0.5,-0.6); group.add(h2);
                group.add(makeBond(o.position, h1.position));
                group.add(makeBond(o.position, h2.position));
                if (phLabel) phLabel.textContent = 'Neutral';
            }
            // Update H+ concentration
            if (hConcentration) {
                const conc = Math.pow(10, -pH);
                hConcentration.textContent = conc.toExponential(2) + ' M';
            }
        }

        if (slider) {
            slider.addEventListener('input', () => {
                const val = parseFloat(slider.value);
                if (phValue) phValue.textContent = val.toFixed(1);
                buildpH(val);
            });
        }
        buildpH(7);
        scene.add(group);
        userData.group = group;
    }
};

// ─── 2D Canvas helper for Matter ──────────────────────────────
export function init2DParticles(canvasId, tempSliderId, stateSelectId, stateBadgeId, tempLabelId, onStateChange) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const container = canvas.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const w = rect.width - 24;
        const h = Math.min(280, w * 0.7);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        canvas._logicalWidth = w;
        canvas._logicalHeight = h;
    }
    resizeCanvas();

    const container = canvas.parentElement;
    let resizeObserver = null;
    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => resizeCanvas());
        resizeObserver.observe(container);
    } else {
        window.addEventListener('resize', resizeCanvas);
    }

    const numParticles = 60;
    let particles = [];
    for (let i=0; i<numParticles; i++) {
        particles.push({
            x: Math.random() * (canvas._logicalWidth || 400),
            y: Math.random() * (canvas._logicalHeight || 280),
            vx: (Math.random()-0.5)*2,
            vy: (Math.random()-0.5)*2,
            radius: 3 + Math.random()*4,
            color: `hsl(${200 + Math.random()*60}, 70%, 60%)`
        });
    }

    const tempSlider = document.getElementById(tempSliderId);
    const stateSelect = document.getElementById(stateSelectId);
    const stateBadge = document.getElementById(stateBadgeId);
    const tempLabel = document.getElementById(tempLabelId);
    let state = 'solid';
    let temp = 50;

    function getStateFromTemp(t) {
        if (t < 25) return 'solid';
        if (t < 60) return 'liquid';
        if (t < 85) return 'gas';
        return 'plasma';
    }

    function updateStateTemp() {
        state = stateSelect.value === 'auto' ? getStateFromTemp(temp) : stateSelect.value;
        stateBadge.textContent = state.charAt(0).toUpperCase() + state.slice(1);
        if (typeof onStateChange === 'function') onStateChange(state, temp);
    }

    if (tempSlider) {
        tempSlider.addEventListener('input', () => {
            temp = parseInt(tempSlider.value);
            tempLabel.textContent = temp;
            if (stateSelect.value === 'auto') updateStateTemp();
            else {
                state = stateSelect.value;
                stateBadge.textContent = state.charAt(0).toUpperCase() + state.slice(1);
                if (typeof onStateChange === 'function') onStateChange(state, temp);
            }
        });
    }
    if (stateSelect) {
        stateSelect.addEventListener('change', updateStateTemp);
    }
    updateStateTemp();

    let running = true;
    let paused = false;

    function draw() {
        if (!running) return;
        requestAnimationFrame(draw);
        if (paused) return;

        const w = canvas._logicalWidth || 400;
        const h = canvas._logicalHeight || 280;
        ctx.clearRect(0, 0, w, h);
        const speed = 0.5 + (temp/100)*3;
        const factor = state === 'solid' ? 0.1 : state === 'liquid' ? 0.4 : state === 'gas' ? 1.0 : 1.8;

        particles.forEach(p => {
            p.x += p.vx * speed * factor * 0.5;
            p.y += p.vy * speed * factor * 0.5;
            if (p.x < p.radius || p.x > w - p.radius) { p.vx *= -0.8; p.x = Math.min(Math.max(p.x, p.radius), w - p.radius); }
            if (p.y < p.radius || p.y > h - p.radius) { p.vy *= -0.8; p.y = Math.min(Math.max(p.y, p.radius), h - p.radius); }
            p.vx += (Math.random()-0.5) * 0.1 * factor;
            p.vy += (Math.random()-0.5) * 0.1 * factor;
            const sp = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
            const maxSp = 2 * factor;
            if (sp > maxSp) { p.vx = (p.vx/sp)*maxSp; p.vy = (p.vy/sp)*maxSp; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2*Math.PI);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        ctx.strokeStyle = '#2d5a9a';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, w, h);
    }
    draw();

    return {
        pause: () => { paused = true; },
        resume: () => { paused = false; },
        dispose: () => {
            running = false;
            if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
            else { window.removeEventListener('resize', resizeCanvas); }
        },
        resize: resizeCanvas
    };
}
