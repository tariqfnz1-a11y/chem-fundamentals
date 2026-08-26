// data.js – Full station data for all 12 chemistry topics

export const stationData = [
  // ======================== 1. MATTER ========================
  {
    id: 'matter',
    emoji: '🧊',
    title: 'Matter',
    subtitle: 'States & Particle Nature',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🔬 What is Matter?</h4>
        <p>Matter is anything that has <strong>mass</strong> and occupies <strong>space</strong> (volume). Everything around us – from the air we breathe to the stars in the sky – is made of matter.</p>
      </div>
      <div class="note-block">
        <h4>🧊 The Four Common States</h4>
        <ul>
          <li><strong>Solid</strong> – fixed shape and volume. Particles are tightly packed in a regular arrangement and only vibrate in place.</li>
          <li><strong>Liquid</strong> – fixed volume but takes the shape of its container. Particles are close but can slide past each other.</li>
          <li><strong>Gas</strong> – no fixed shape or volume. Particles are far apart and move freely at high speeds.</li>
          <li><strong>Plasma</strong> – an ionised gas with free electrons and nuclei. Found in stars, lightning, and fluorescent lights.</li>
        </ul>
      </div>
      <div class="note-block">
        <h4>🌡️ Phase Changes</h4>
        <ul>
          <li><strong>Melting</strong> – solid → liquid (e.g., ice melting)</li>
          <li><strong>Freezing</strong> – liquid → solid (e.g., water freezing)</li>
          <li><strong>Evaporation/Boiling</strong> – liquid → gas (e.g., water boiling)</li>
          <li><strong>Condensation</strong> – gas → liquid (e.g., water vapour condensing on a cold surface)</li>
          <li><strong>Sublimation</strong> – solid → gas (e.g., dry ice)</li>
          <li><strong>Deposition</strong> – gas → solid (e.g., frost formation)</li>
        </ul>
      </div>
      <div class="note-block">
        <h4>🔑 Kinetic Molecular Theory</h4>
        <p>All matter is made of tiny particles (atoms, molecules, or ions) that are in constant motion. The <strong>temperature</strong> of a substance is a measure of the average kinetic energy of its particles. Higher temperature = faster motion.</p>
      </div>
    `,
    examples: [
      { emoji: '🧊', title: 'Ice', desc: 'Solid water – molecules locked in a crystal lattice' },
      { emoji: '💧', title: 'Liquid Water', desc: 'Molecules flow and take the shape of the container' },
      { emoji: '💨', title: 'Steam', desc: 'Water as a gas – molecules move freely' },
      { emoji: '⚡', title: 'Lightning', desc: 'Plasma – ionised gas with free electrons' },
      { emoji: '☕', title: 'Coffee', desc: 'Liquid – takes the shape of the cup' },
      { emoji: '🌬️', title: 'Air', desc: 'Gas mixture – no fixed shape or volume' }
    ],
    analogy: '💡 <strong>Think of matter like a crowd of people:</strong> In a solid, people are packed tightly and can only wiggle. In a liquid, they can move around but stay close. In a gas, they run freely in all directions. Plasma is like a crowd where everyone is charged and glowing!',
    interactive: `
      <div class="sim-container">
        <div class="sim-2d">
          <h4 style="color:#8db8f0;">🖥️ 2D Particle View</h4>
          <canvas id="sim2dCanvas" width="400" height="280"></canvas>
          <div class="sim-controls">
            <label>🌡️ Temp</label>
            <input type="range" id="tempSlider" min="0" max="100" value="50" />
            <span id="tempLabel" style="color:#b8d4ff;">50</span>
            <select id="stateSelect">
              <option value="auto">Auto</option>
              <option value="solid">Solid</option>
              <option value="liquid">Liquid</option>
              <option value="gas">Gas</option>
              <option value="plasma">Plasma</option>
            </select>
            <span class="state-badge" id="stateBadge">Solid</span>
          </div>
        </div>
        <div class="sim-3d">
          <h4 style="color:#8db8f0;">🌐 3D Particle Box</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div style="text-align:center;color:#8aa3c9;font-size:0.8rem;">🖱️ Drag to rotate · Scroll to zoom</div>
        </div>
      </div>
      <div class="sim-controls" style="border-top:1px solid #1e2d47;margin-top:10px;justify-content:space-between;">
        <span>🌡️ Temp: <span id="tempDisplay">50</span>°C</span>
        <span>⏱️ Avg Speed: <span id="speedDisplay">0.00</span> u/s</span>
      </div>
    `,
    quiz15: [
      { q: 'Which state of matter has a fixed shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 0, explanation: 'Solids have a definite shape and volume because particles are rigidly held in place.' },
      { q: 'What happens to the particles of a substance when it melts?', options: ['They gain energy and move faster', 'They lose energy and slow down', 'They stop moving', 'They break apart into atoms'], answer: 0, explanation: 'Melting adds energy, allowing particles to overcome attractive forces and move more freely.' },
      { q: 'Which state of matter has particles that are far apart and move very fast?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 2, explanation: 'In gases, particles have high kinetic energy and are widely separated.' },
      { q: 'The process of a gas changing into a liquid is called:', options: ['Evaporation', 'Condensation', 'Sublimation', 'Freezing'], answer: 1, explanation: 'Condensation is the reverse of vaporisation, where gas loses energy to become liquid.' },
      { q: 'What is plasma?', options: ['A type of liquid', 'An ionised gas', 'A solid with a fixed shape', 'A mixture of gases'], answer: 1, explanation: 'Plasma is a high‑energy state where atoms are ionised, forming a sea of charged particles.' },
      { q: 'In which state do particles vibrate in fixed positions?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 0, explanation: 'Solid particles are tightly bound and only vibrate around their equilibrium positions.' },
      { q: 'Which phase change is the reverse of condensation?', options: ['Evaporation', 'Freezing', 'Sublimation', 'Deposition'], answer: 0, explanation: 'Evaporation (liquid → gas) is the direct opposite of condensation (gas → liquid).' },
      { q: 'The kinetic molecular theory states that particles are in constant:', options: ['Motion', 'Rest', 'Collision', 'Expansion'], answer: 0, explanation: 'All particles are constantly moving; motion increases with temperature.' },
      { q: 'When you increase the temperature of a gas, the particles move:', options: ['Faster', 'Slower', 'The same speed', 'They stop'], answer: 0, explanation: 'Temperature is a measure of average kinetic energy; higher temperature = faster movement.' },
      { q: 'Which of the following is NOT a state of matter?', options: ['Solid', 'Liquid', 'Energy', 'Gas'], answer: 2, explanation: 'Energy is not a state of matter; it is a property that matter can possess.' },
      { q: 'The process of a solid changing directly to a gas is called:', options: ['Sublimation', 'Deposition', 'Evaporation', 'Melting'], answer: 0, explanation: 'Sublimation is a direct phase transition from solid to gas without passing through liquid.' },
      { q: 'What is the main difference between a liquid and a gas?', options: ['Liquids have a fixed volume; gases do not', 'Gases have a fixed shape; liquids do not', 'Liquids are always hot; gases are cold', 'There is no difference'], answer: 0, explanation: 'Liquids maintain a constant volume but take the container’s shape; gases expand to fill any volume.' },
      { q: 'Which state of matter is most commonly found in stars?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 3, explanation: 'Stars are composed of plasma – ionised gas at extremely high temperatures.' },
      { q: 'When water freezes, the particles:', options: ['Lose energy and become more ordered', 'Gain energy and move faster', 'Break apart into hydrogen and oxygen', 'Turn into gas'], answer: 0, explanation: 'Freezing removes energy, causing particles to arrange into a fixed, ordered lattice.' },
      { q: 'The measure of average kinetic energy of particles is called:', options: ['Temperature', 'Pressure', 'Volume', 'Mass'], answer: 0, explanation: 'Temperature is directly proportional to the average kinetic energy of the particles.' }
    ]
  },

  // ======================== 2. ATOMS ========================
  {
    id: 'atoms',
    emoji: '⚛️',
    title: 'Atoms',
    subtitle: 'Building Blocks of Elements',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🔬 What is an Atom?</h4>
        <p>An atom is the smallest unit of an element that retains its chemical properties. It consists of a nucleus (protons + neutrons) and electrons orbiting around it.</p>
      </div>
      <div class="note-block">
        <h4>⚛️ Subatomic Particles</h4>
        <ul>
          <li><strong>Proton</strong> (+1) – in nucleus; determines element (atomic number).</li>
          <li><strong>Neutron</strong> (0) – in nucleus; contributes to mass.</li>
          <li><strong>Electron</strong> (−1) – orbits nucleus; determines chemical reactivity.</li>
        </ul>
      </div>
      <div class="note-block">
        <h4>🔑 Atomic Number and Mass Number</h4>
        <p>Atomic number = number of protons. Mass number = protons + neutrons. Isotopes have same protons but different neutrons.</p>
      </div>
    `,
    examples: [
      { emoji: '💧', title: 'Hydrogen', desc: '1 proton, 0 neutrons, 1 electron' },
      { emoji: '🌬️', title: 'Helium', desc: '2 protons, 2 neutrons, 2 electrons' },
      { emoji: '⚡', title: 'Carbon', desc: '6 protons, 6 neutrons, 6 electrons' },
      { emoji: '🔴', title: 'Oxygen', desc: '8 protons, 8 neutrons, 8 electrons' },
      { emoji: '🔩', title: 'Iron', desc: '26 protons, 30 neutrons, 26 electrons' },
      { emoji: '🌟', title: 'Gold', desc: '79 protons, 118 neutrons, 79 electrons' }
    ],
    analogy: '🎯 <strong>Atom = solar system:</strong> nucleus is the sun, electrons are planets orbiting in shells.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Atom Model</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <label>⚛️ Element: <span id="atomElementName" style="color:#b8d4ff;">Carbon</span></label>
            <label>Protons: <span id="protonCount">6</span></label>
            <input type="range" id="protonSlider" min="1" max="20" value="6" />
            <label>Neutrons: <span id="neutronCount">6</span></label>
            <input type="range" id="neutronSlider" min="0" max="20" value="6" />
            <button id="toggleAtomLabels">🔖 Show Labels</button>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'Which particle determines the element?', options: ['Proton', 'Neutron', 'Electron', 'All of them'], answer: 0, explanation: 'The number of protons defines the atomic number and thus the element.' },
      { q: 'What is the charge of a neutron?', options: ['+1', '0', '-1', '+2'], answer: 1, explanation: 'Neutrons are electrically neutral (no charge).' },
      { q: 'Where are electrons located?', options: ['In the nucleus', 'Orbiting the nucleus', 'Inside protons', 'Between neutrons'], answer: 1, explanation: 'Electrons exist in electron clouds/shells around the nucleus.' },
      { q: 'The atomic number is the number of:', options: ['Protons', 'Neutrons', 'Electrons', 'Protons + Neutrons'], answer: 0, explanation: 'Atomic number is always equal to the proton count.' },
      { q: 'Isotopes have same number of ____ but different number of ____.', options: ['Protons; neutrons', 'Neutrons; protons', 'Electrons; protons', 'Protons; electrons'], answer: 0, explanation: 'Isotopes have the same atomic number (protons) but different mass number (neutrons).' },
      { q: 'What is the mass number of an atom with 6 protons and 6 neutrons?', options: ['6', '12', '18', '0'], answer: 1, explanation: 'Mass number = protons + neutrons = 6 + 6 = 12.' },
      { q: 'Which subatomic particle has a negative charge?', options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], answer: 2, explanation: 'Electrons carry a fundamental negative charge.' },
      { q: 'The nucleus of an atom contains:', options: ['Protons and electrons', 'Protons and neutrons', 'Neutrons and electrons', 'Only protons'], answer: 1, explanation: 'The nucleus is composed of protons and neutrons (nucleons).' },
      { q: 'If an atom has 8 protons, how many electrons does it have in a neutral state?', options: ['6', '8', '10', '16'], answer: 1, explanation: 'In a neutral atom, the number of electrons equals the number of protons.' },
      { q: 'Which element has atomic number 1?', options: ['Hydrogen', 'Helium', 'Lithium', 'Carbon'], answer: 0, explanation: 'Hydrogen has 1 proton, so atomic number = 1.' },
      { q: 'What is the charge of an electron?', options: ['+1', '0', '-1', '+2'], answer: 2, explanation: 'Electrons have a charge of −1 elementary charge.' },
      { q: 'Who proposed the nuclear model of the atom?', options: ['Dalton', 'Thomson', 'Rutherford', 'Bohr'], answer: 2, explanation: 'Rutherford’s gold‑foil experiment revealed the nucleus.' },
      { q: 'What does the atomic number represent?', options: ['Number of neutrons', 'Number of protons', 'Number of electrons', 'Total mass'], answer: 1, explanation: 'Atomic number is the count of protons in the nucleus.' },
      { q: 'An atom with 11 protons is:', options: ['Sodium', 'Magnesium', 'Aluminum', 'Silicon'], answer: 0, explanation: 'Sodium has atomic number 11.' },
      { q: 'The electron shell closest to the nucleus can hold up to how many electrons?', options: ['2', '8', '18', '32'], answer: 0, explanation: 'The first shell (n=1) can hold a maximum of 2 electrons.' }
    ]
  },

  // ======================== 3. ELEMENTS ========================
  {
    id: 'elements',
    emoji: '📊',
    title: 'Elements',
    subtitle: 'Pure Substances',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🔬 What is an Element?</h4>
        <p>An element is a pure substance composed of only one type of atom. There are 118 known elements, each with unique properties.</p>
      </div>
      <div class="note-block">
        <h4>📊 Periodic Table</h4>
        <p>Elements are arranged by increasing atomic number into periods (rows) and groups (columns). Elements in the same group have similar chemical properties.</p>
      </div>
      <div class="note-block">
        <h4>🔑 Element Categories</h4>
        <ul>
          <li><strong>Metals</strong> – shiny, conductive, malleable (e.g., Fe, Cu, Au).</li>
          <li><strong>Nonmetals</strong> – dull, poor conductors (e.g., O, C, N).</li>
          <li><strong>Metalloids</strong> – properties of both (e.g., Si, B).</li>
        </ul>
      </div>
    `,
    examples: [
      { emoji: '💨', title: 'Hydrogen', desc: 'Lightest element, atomic number 1' },
      { emoji: '🌿', title: 'Oxygen', desc: 'Essential for life, atomic number 8' },
      { emoji: '✏️', title: 'Carbon', desc: 'Basis of organic chemistry, atomic number 6' },
      { emoji: '🔩', title: 'Iron', desc: 'Strong magnetic metal, atomic number 26' },
      { emoji: '🌟', title: 'Gold', desc: 'Precious, unreactive metal, atomic number 79' },
      { emoji: '🧂', title: 'Sodium', desc: 'Soft, reactive metal, atomic number 11' }
    ],
    analogy: '🔢 <strong>Elements = letters of the alphabet.</strong> Just as letters combine to form words, elements combine to form compounds.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Crystal Lattice</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <label>Select element:</label>
            <select id="elementSelect">
              <option value="fe">Iron (Fe)</option>
              <option value="cu">Copper (Cu)</option>
              <option value="au">Gold (Au)</option>
            </select>
            <button id="toggleElementBonds">Toggle Bonds</button>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'How many elements are currently known?', options: ['92', '108', '118', '126'], answer: 2, explanation: 'As of 2026, 118 elements have been officially discovered and named.' },
      { q: 'Which element is the lightest?', options: ['Helium', 'Hydrogen', 'Lithium', 'Oxygen'], answer: 1, explanation: 'Hydrogen has the lowest atomic mass (≈1 u).' },
      { q: 'Elements in the same group have:', options: ['Same atomic number', 'Similar chemical properties', 'Same mass', 'Same number of electron shells'], answer: 1, explanation: 'Group elements have the same number of valence electrons, giving similar reactivity.' },
      { q: 'Which is a metal?', options: ['Oxygen', 'Iron', 'Carbon', 'Nitrogen'], answer: 1, explanation: 'Iron is a transition metal; the others are nonmetals.' },
      { q: 'Which is a nonmetal?', options: ['Sodium', 'Gold', 'Chlorine', 'Calcium'], answer: 2, explanation: 'Chlorine is a halogen and a nonmetal.' },
      { q: 'What is the symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], answer: 0, explanation: 'Gold symbol comes from Latin "aurum".' },
      { q: 'The periodic table is arranged by increasing:', options: ['Atomic mass', 'Atomic number', 'Number of neutrons', 'Density'], answer: 1, explanation: 'Modern periodic table is ordered by atomic number (proton count).' },
      { q: 'Which element is a noble gas?', options: ['Oxygen', 'Nitrogen', 'Helium', 'Carbon'], answer: 2, explanation: 'Helium is a noble gas (Group 18).' },
      { q: 'What is the most abundant element in the universe?', options: ['Oxygen', 'Carbon', 'Hydrogen', 'Helium'], answer: 2, explanation: 'Hydrogen makes up about 75% of the universe’s mass.' },
      { q: 'Which element is a metalloid?', options: ['Silicon', 'Sodium', 'Chlorine', 'Iron'], answer: 0, explanation: 'Silicon has properties intermediate between metals and nonmetals.' },
      { q: 'The symbol for potassium is:', options: ['K', 'P', 'Po', 'Pt'], answer: 0, explanation: 'Potassium symbol comes from Latin "kalium".' },
      { q: 'Elements are classified into periods based on:', options: ['Number of electron shells', 'Number of valence electrons', 'Atomic mass', 'Density'], answer: 0, explanation: 'Periods correspond to the principal quantum number (shells).' },
      { q: 'Which element is liquid at room temperature?', options: ['Mercury', 'Bromine', 'Both', 'None'], answer: 2, explanation: 'Mercury (metal) and Bromine (nonmetal) are liquids at 25°C.' },
      { q: 'What is the atomic number of carbon?', options: ['4', '6', '8', '12'], answer: 1, explanation: 'Carbon has 6 protons.' },
      { q: 'Which group contains the most reactive metals?', options: ['Group 1 (alkali metals)', 'Group 2 (alkaline earth)', 'Group 17 (halogens)', 'Group 18 (noble gases)'], answer: 0, explanation: 'Alkali metals (Group 1) are highly reactive due to one valence electron.' }
    ]
  },

  // ======================== 4. MOLECULES ========================
  {
    id: 'molecules',
    emoji: '🔗',
    title: 'Molecules',
    subtitle: 'Atoms Bonded Together',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🔗 What is a Molecule?</h4>
        <p>A molecule is a group of two or more atoms held together by chemical bonds. Molecules can be of the same element (e.g., O₂) or different elements (e.g., H₂O).</p>
      </div>
      <div class="note-block">
        <h4>🧪 Types of Molecules</h4>
        <ul>
          <li><strong>Diatomic</strong> – two atoms (e.g., H₂, O₂, N₂).</li>
          <li><strong>Polyatomic</strong> – more than two atoms (e.g., H₂O, CO₂, CH₄).</li>
          <li><strong>Organic</strong> – contain carbon (e.g., C₆H₁₂O₆).</li>
        </ul>
      </div>
    `,
    examples: [
      { emoji: '💨', title: 'O₂', desc: 'Oxygen molecule – diatomic' },
      { emoji: '💧', title: 'H₂O', desc: 'Water molecule – triatomic' },
      { emoji: '🌿', title: 'CO₂', desc: 'Carbon dioxide – linear triatomic' },
      { emoji: '🍬', title: 'C₆H₁₂O₆', desc: 'Glucose – organic molecule' },
      { emoji: '🧪', title: 'CH₄', desc: 'Methane – tetrahedral' },
      { emoji: '🌫️', title: 'NH₃', desc: 'Ammonia – trigonal pyramidal' }
    ],
    analogy: '🧩 <strong>Molecules = words.</strong> Atoms are letters; molecules are words formed by combining letters.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Molecule Viewer</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <label>Select molecule:</label>
            <select id="moleculeSelect">
              <option value="water">Water (H₂O)</option>
              <option value="co2">Carbon Dioxide (CO₂)</option>
              <option value="oxygen">Oxygen (O₂)</option>
              <option value="methane">Methane (CH₄)</option>
            </select>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'How many atoms are in a water molecule (H₂O)?', options: ['2', '3', '4', '5'], answer: 1, explanation: 'H₂O has 2 hydrogen atoms + 1 oxygen atom = 3 atoms total.' },
      { q: 'Which is a diatomic molecule?', options: ['H₂O', 'CO₂', 'O₂', 'CH₄'], answer: 2, explanation: 'O₂ is a diatomic molecule (two oxygen atoms).' },
      { q: 'What is the chemical formula for methane?', options: ['CH₄', 'C₂H₆', 'CH₃OH', 'C₆H₁₂O₆'], answer: 0, explanation: 'Methane is CH₄ – one carbon with four hydrogens.' },
      { q: 'Which molecule contains only one type of atom?', options: ['H₂O', 'O₂', 'CO₂', 'NH₃'], answer: 1, explanation: 'O₂ is a molecule of the same element (oxygen).' },
      { q: 'How many oxygen atoms are in CO₂?', options: ['1', '2', '3', '4'], answer: 1, explanation: 'CO₂ has two oxygen atoms per molecule.' },
      { q: 'What is the shape of a water molecule?', options: ['Linear', 'Bent', 'Trigonal planar', 'Tetrahedral'], answer: 1, explanation: 'Water has a bent (V‑shaped) geometry due to lone pairs on oxygen.' },
      { q: 'Which molecule is a greenhouse gas?', options: ['O₂', 'N₂', 'CO₂', 'H₂'], answer: 2, explanation: 'CO₂ is a potent greenhouse gas that traps heat in the atmosphere.' },
      { q: 'The formula for glucose is:', options: ['C₆H₁₂O₆', 'C₆H₁₀O₅', 'C₅H₁₀O₅', 'C₆H₁₂O₅'], answer: 0, explanation: 'Glucose is C₆H₁₂O₆, a simple sugar.' },
      { q: 'Which molecule is polar?', options: ['H₂O', 'CO₂', 'O₂', 'N₂'], answer: 0, explanation: 'Water is polar due to its bent shape and electronegativity difference.' },
      { q: 'What is the molecular mass of water (H=1, O=16)?', options: ['16', '17', '18', '20'], answer: 2, explanation: '2×1 + 16 = 18 g/mol.' },
      { q: 'Which molecule is used in respiration?', options: ['CO₂', 'O₂', 'H₂O', 'N₂'], answer: 1, explanation: 'Oxygen is the final electron acceptor in aerobic respiration.' },
      { q: 'What type of bond holds atoms in a molecule?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], answer: 1, explanation: 'Covalent bonds (electron sharing) hold atoms together within a molecule.' },
      { q: 'How many hydrogen atoms are in ammonia (NH₃)?', options: ['1', '2', '3', '4'], answer: 2, explanation: 'Ammonia has three hydrogen atoms.' },
      { q: 'Which molecule is linear?', options: ['H₂O', 'CO₂', 'NH₃', 'CH₄'], answer: 1, explanation: 'CO₂ is a linear molecule (O=C=O).' },
      { q: 'What is the total number of atoms in a molecule of glucose?', options: ['12', '18', '24', '30'], answer: 2, explanation: 'C₆H₁₂O₆ has 6+12+6 = 24 atoms.' }
    ]
  },

  // ======================== 5. COMPOUNDS ========================
  {
    id: 'compounds',
    emoji: '🧬',
    title: 'Compounds',
    subtitle: 'Different Elements Combined',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🧪 What is a Compound?</h4>
        <p>A compound is a pure substance formed when two or more different elements chemically combine in a fixed ratio. Compounds have properties different from their constituent elements.</p>
      </div>
      <div class="note-block">
        <h4>🔗 Types of Compounds</h4>
        <ul>
          <li><strong>Ionic</strong> – formed by transfer of electrons (e.g., NaCl).</li>
          <li><strong>Covalent</strong> – formed by sharing electrons (e.g., H₂O).</li>
        </ul>
      </div>
      <div class="note-block">
        <h4>🔑 Fixed Ratio</h4>
        <p>Compounds have a definite composition. For example, water is always H₂O, never H₂O₂.</p>
      </div>
    `,
    examples: [
      { emoji: '🧂', title: 'NaCl', desc: 'Sodium chloride (table salt) – ionic' },
      { emoji: '💧', title: 'H₂O', desc: 'Water – covalent' },
      { emoji: '🍚', title: 'CO₂', desc: 'Carbon dioxide – covalent' },
      { emoji: '🧪', title: 'C₆H₁₂O₆', desc: 'Glucose – covalent' },
      { emoji: '🔩', title: 'Fe₂O₃', desc: 'Iron oxide (rust) – ionic' },
      { emoji: '🧼', title: 'NaOH', desc: 'Sodium hydroxide – ionic' }
    ],
    analogy: '🥘 <strong>Compounds = recipes.</strong> Combine ingredients (elements) in specific amounts to create something new.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Compound Model (Ionic: NaCl)</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <label>Show bonds:</label>
            <button id="toggleBondsBtn">Show Bonds</button>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'Which is a compound?', options: ['O₂', 'NaCl', 'Fe', 'N₂'], answer: 1, explanation: 'NaCl is a compound made of sodium and chlorine in fixed ratio.' },
      { q: 'What is the formula of table salt?', options: ['KCl', 'NaCl', 'CaCl₂', 'Na₂O'], answer: 1, explanation: 'Table salt is sodium chloride, NaCl.' },
      { q: 'How many elements make up water?', options: ['1', '2', '3', '4'], answer: 1, explanation: 'Water is composed of hydrogen and oxygen (two elements).' },
      { q: 'Which compound is formed by ionic bonding?', options: ['H₂O', 'CO₂', 'NaCl', 'CH₄'], answer: 2, explanation: 'NaCl is ionic (transfer of electrons from Na to Cl).' },
      { q: 'What is the ratio of hydrogen to oxygen in water?', options: ['2:1', '1:2', '1:1', '2:2'], answer: 0, explanation: 'Water has two hydrogen atoms for every one oxygen atom.' },
      { q: 'Which compound is also known as rust?', options: ['FeO', 'Fe₂O₃', 'Fe₃O₄', 'FeCl₂'], answer: 1, explanation: 'Rust is hydrated iron(III) oxide, typically Fe₂O₃·nH₂O.' },
      { q: 'What is the chemical formula for glucose?', options: ['C₆H₁₂O₆', 'C₆H₁₀O₅', 'C₅H₁₀O₅', 'C₆H₁₂O₅'], answer: 0, explanation: 'Glucose is C₆H₁₂O₆.' },
      { q: 'Which compound is a covalent compound?', options: ['NaCl', 'MgO', 'H₂O', 'CaCl₂'], answer: 2, explanation: 'Water (H₂O) is covalent; the others are ionic.' },
      { q: 'What is the formula for carbon dioxide?', options: ['CO', 'CO₂', 'C₂O₄', 'C₂O₂'], answer: 1, explanation: 'Carbon dioxide is CO₂.' },
      { q: 'Which element is common to all organic compounds?', options: ['Carbon', 'Oxygen', 'Hydrogen', 'Nitrogen'], answer: 0, explanation: 'Organic compounds are defined by the presence of carbon.' },
      { q: 'What is the formula for sodium hydroxide?', options: ['NaOH', 'NaCl', 'Na₂O', 'Na₂CO₃'], answer: 0, explanation: 'Sodium hydroxide is NaOH.' },
      { q: 'Which compound is used to neutralize stomach acid?', options: ['NaCl', 'NaHCO₃', 'HCl', 'NaOH'], answer: 1, explanation: 'Sodium bicarbonate (NaHCO₃) is an antacid.' },
      { q: 'What is the formula for ammonia?', options: ['NH₃', 'NH₄', 'N₂H₄', 'NO₂'], answer: 0, explanation: 'Ammonia is NH₃.' },
      { q: 'Which compound contains carbon, hydrogen, and oxygen?', options: ['NaCl', 'H₂O', 'C₆H₁₂O₆', 'CO₂'], answer: 2, explanation: 'Glucose (C₆H₁₂O₆) contains all three.' },
      { q: 'What is the fixed ratio of elements in a compound called?', options: ['Empirical formula', 'Molecular formula', 'Structural formula', 'Chemical equation'], answer: 0, explanation: 'The empirical formula gives the simplest whole‑number ratio of atoms.' }
    ]
  },

  // ======================== 6. MIXTURES ========================
  {
    id: 'mixtures',
    emoji: '🌀',
    title: 'Mixtures',
    subtitle: 'Physically Combined',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🌀 What is a Mixture?</h4>
        <p>A mixture is a combination of two or more substances that are physically mixed, not chemically bonded. The components retain their individual properties.</p>
      </div>
      <div class="note-block">
        <h4>🔬 Types of Mixtures</h4>
        <ul>
          <li><strong>Homogeneous</strong> – uniform composition (e.g., saltwater, air).</li>
          <li><strong>Heterogeneous</strong> – non‑uniform composition (e.g., sand and water, oil and water).</li>
        </ul>
      </div>
      <div class="note-block">
        <h4>⚗️ Separation Methods</h4>
        <ul>
          <li><strong>Filtration</strong> – separates solids from liquids.</li>
          <li><strong>Evaporation</strong> – removes liquid to leave dissolved solids.</li>
          <li><strong>Distillation</strong> – separates based on boiling points.</li>
          <li><strong>Chromatography</strong> – separates based on solubility.</li>
        </ul>
      </div>
    `,
    examples: [
      { emoji: '🌊', title: 'Saltwater', desc: 'Homogeneous mixture' },
      { emoji: '🌬️', title: 'Air', desc: 'Homogeneous mixture of gases' },
      { emoji: '🏖️', title: 'Sand + Water', desc: 'Heterogeneous mixture' },
      { emoji: '🍵', title: 'Tea', desc: 'Homogeneous mixture (water + tea compounds)' },
      { emoji: '🛢️', title: 'Oil + Water', desc: 'Heterogeneous mixture' },
      { emoji: '🧪', title: 'Alloy (Brass)', desc: 'Homogeneous mixture of metals' }
    ],
    analogy: '🥗 <strong>Mixtures = salad.</strong> You can pick out individual ingredients; they are not chemically changed.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Mixture Separation</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <button id="mixSaltBtn">🧂 Salt + 💧 Water</button>
            <button id="mixSandBtn">🏖️ Sand + 💧 Water</button>
            <button id="filterBtn">🧪 Filter</button>
            <button id="evaporateBtn">🔥 Evaporate</button>
            <span id="mixResult" style="color:#9bb4d9;">Ready</span>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'Which is a homogeneous mixture?', options: ['Saltwater', 'Sand and water', 'Oil and water', 'Soil'], answer: 0, explanation: 'Saltwater is homogeneous; salt is uniformly dissolved.' },
      { q: 'What method separates solids from liquids?', options: ['Filtration', 'Evaporation', 'Distillation', 'Chromatography'], answer: 0, explanation: 'Filtration uses a porous barrier to trap solids.' },
      { q: 'Which mixture is heterogeneous?', options: ['Air', 'Brass', 'Saltwater', 'Sand and water'], answer: 3, explanation: 'Sand and water have visible separate phases.' },
      { q: 'How can you separate salt from saltwater?', options: ['Filtration', 'Evaporation', 'Distillation', 'Both B and C'], answer: 3, explanation: 'Evaporation leaves salt; distillation also works by boiling and condensing water.' },
      { q: 'What is the composition of a mixture?', options: ['Fixed ratio', 'Variable ratio', 'Only one substance', 'Always homogeneous'], answer: 1, explanation: 'Mixtures have variable ratios of components.' },
      { q: 'Which method separates liquids based on boiling point?', options: ['Filtration', 'Evaporation', 'Distillation', 'Chromatography'], answer: 2, explanation: 'Distillation vaporises and condenses based on boiling point differences.' },
      { q: 'Air is a mixture of:', options: ['Nitrogen, oxygen, and others', 'Only oxygen and nitrogen', 'Only nitrogen', 'Only oxygen'], answer: 0, explanation: 'Air is about 78% N₂, 21% O₂, and trace gases.' },
      { q: 'What type of mixture is a solution?', options: ['Homogeneous', 'Heterogeneous', 'Colloid', 'Suspension'], answer: 0, explanation: 'Solutions are homogeneous at the molecular level.' },
      { q: 'Which is an example of a colloid?', options: ['Milk', 'Saltwater', 'Sand in water', 'Air'], answer: 0, explanation: 'Milk is a colloid with fat droplets dispersed in water.' },
      { q: 'What is the process of separating a mixture by differences in solubility called?', options: ['Filtration', 'Evaporation', 'Distillation', 'Chromatography'], answer: 3, explanation: 'Chromatography separates based on differential solubility in a mobile phase.' },
      { q: 'Which mixture can be separated by filtration?', options: ['Saltwater', 'Sand and water', 'Sugar solution', 'All of the above'], answer: 1, explanation: 'Sand is insoluble and can be filtered out.' },
      { q: 'What is the main difference between a compound and a mixture?', options: ['Compounds have fixed ratios; mixtures do not', 'Mixtures have fixed ratios; compounds do not', 'Both have fixed ratios', 'Neither has fixed ratios'], answer: 0, explanation: 'Compounds have a definite composition; mixtures do not.' },
      { q: 'Which method is used to separate crude oil?', options: ['Filtration', 'Evaporation', 'Distillation', 'Chromatography'], answer: 2, explanation: 'Fractional distillation separates crude oil into fractions by boiling point.' },
      { q: 'What is the solvent in a saltwater solution?', options: ['Salt', 'Water', 'Both', 'Neither'], answer: 1, explanation: 'In saltwater, water is the solvent (dissolves salt).' },
      { q: 'What type of mixture is an alloy?', options: ['Homogeneous mixture of metals', 'Heterogeneous mixture', 'Compound', 'Solution'], answer: 0, explanation: 'Alloys are homogeneous solid mixtures of metals.' }
    ]
  },

  // ======================== 7. BONDS ========================
  {
    id: 'bonds',
    emoji: '🔗',
    title: 'Chemical Bonds',
    subtitle: 'How Atoms Join',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🔗 What is a Chemical Bond?</h4>
        <p>A chemical bond is a force that holds atoms together in a molecule or compound. Bonds form to achieve a more stable electron configuration (usually noble gas configuration).</p>
      </div>
      <div class="note-block">
        <h4>⚡ Types of Bonds</h4>
        <ul>
          <li><strong>Ionic Bond</strong> – transfer of electrons; formed between metal and nonmetal (e.g., NaCl).</li>
          <li><strong>Covalent Bond</strong> – sharing of electrons; formed between nonmetals (e.g., H₂O).</li>
          <li><strong>Metallic Bond</strong> – sea of delocalised electrons; formed between metals (e.g., Fe).</li>
        </ul>
      </div>
    `,
    examples: [
      { emoji: '🧂', title: 'Ionic', desc: 'NaCl – electron transfer' },
      { emoji: '💧', title: 'Covalent', desc: 'H₂O – electron sharing' },
      { emoji: '🔩', title: 'Metallic', desc: 'Iron – sea of electrons' },
      { emoji: '🌿', title: 'Covalent', desc: 'CO₂ – electron sharing' },
      { emoji: '🧪', title: 'Ionic', desc: 'MgO – magnesium oxide' },
      { emoji: '🔗', title: 'Covalent', desc: 'CH₄ – methane' }
    ],
    analogy: '🤝 <strong>Bonds = relationships.</strong> Ionic = gift (transfer), covalent = sharing a pizza, metallic = community pool.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Bond Visualisation</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <label>Bond type:</label>
            <select id="bondSelect">
              <option value="ionic">Ionic (NaCl)</option>
              <option value="covalent">Covalent (H₂O)</option>
              <option value="metallic">Metallic (Fe)</option>
            </select>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'In an ionic bond, electrons are:', options: ['Shared', 'Transferred', 'Destroyed', 'Created'], answer: 1, explanation: 'Ionic bonds involve the transfer of electrons from one atom to another.' },
      { q: 'Which type of bond involves a sea of delocalised electrons?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], answer: 2, explanation: 'Metallic bonds consist of a "sea" of free electrons surrounding metal cations.' },
      { q: 'Which bond is formed between a metal and a nonmetal?', options: ['Ionic', 'Covalent', 'Metallic', 'Polar covalent'], answer: 0, explanation: 'Ionic bonds typically form between a metal (loses electrons) and a nonmetal (gains electrons).' },
      { q: 'What is the bond in O₂?', options: ['Single covalent', 'Double covalent', 'Triple covalent', 'Ionic'], answer: 1, explanation: 'O₂ has a double covalent bond (two shared pairs).' },
      { q: 'Which compound has ionic bonds?', options: ['H₂O', 'CO₂', 'NaCl', 'CH₄'], answer: 2, explanation: 'NaCl is ionic; the others are covalent.' },
      { q: 'What is the bond angle in a water molecule?', options: ['104.5°', '109.5°', '120°', '180°'], answer: 0, explanation: 'Water has a bent shape with a bond angle of about 104.5°.' },
      { q: 'Which bond is the strongest?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], answer: 1, explanation: 'Covalent bonds (especially multiple bonds) are generally stronger than ionic bonds.' },
      { q: 'What holds the atoms together in a metallic bond?', options: ['Electron transfer', 'Shared electrons', 'Delocalised electrons', 'Van der Waals forces'], answer: 2, explanation: 'Delocalised electrons surrounding metal cations create the metallic bond.' },
      { q: 'Which element is likely to form a covalent bond with oxygen?', options: ['Sodium', 'Carbon', 'Potassium', 'Calcium'], answer: 1, explanation: 'Carbon (nonmetal) forms covalent bonds with oxygen (e.g., CO₂).' },
      { q: 'What is the difference between a polar and nonpolar covalent bond?', options: ['Unequal sharing vs. equal sharing of electrons', 'Transfer vs. sharing', 'Metal vs. nonmetal', 'No difference'], answer: 0, explanation: 'Polar covalent bonds have unequal electron distribution; nonpolar have equal sharing.' },
      { q: 'Which molecule is nonpolar?', options: ['H₂O', 'CO₂', 'NH₃', 'HCl'], answer: 1, explanation: 'CO₂ is linear and symmetrical, making it nonpolar despite polar bonds.' },
      { q: 'What type of bond is formed between two nonmetals?', options: ['Ionic', 'Covalent', 'Metallic', 'Ionic or covalent'], answer: 1, explanation: 'Nonmetals share electrons to form covalent bonds.' },
      { q: 'Which compound contains both ionic and covalent bonds?', options: ['NaCl', 'NaOH', 'H₂O', 'CO₂'], answer: 1, explanation: 'NaOH has ionic Na⁺‑OH⁻ and covalent O‑H bonds.' },
      { q: 'What is the number of covalent bonds in a nitrogen molecule (N₂)?', options: ['1', '2', '3', '4'], answer: 2, explanation: 'N₂ has a triple covalent bond (three shared pairs).' },
      { q: 'Which bond is directional?', options: ['Ionic', 'Covalent', 'Metallic', 'All are directional'], answer: 1, explanation: 'Covalent bonds are directional because they form specific spatial arrangements.' }
    ]
  },

  // ======================== 8. CHANGES ========================
  {
    id: 'changes',
    emoji: '🔄',
    title: 'Physical & Chemical Changes',
    subtitle: 'Change Types',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🔄 Physical Change</h4>
        <p>A change in which the substance remains chemically the same. Examples: melting, boiling, cutting, dissolving.</p>
      </div>
      <div class="note-block">
        <h4>🧪 Chemical Change</h4>
        <p>A change in which new substances are formed. Examples: burning, rusting, cooking, fermentation.</p>
      </div>
      <div class="note-block">
        <h4>🔑 Signs of Chemical Change</h4>
        <ul>
          <li>Colour change</li>
          <li>Gas evolution (bubbles)</li>
          <li>Formation of precipitate</li>
          <li>Energy change (heat, light)</li>
        </ul>
      </div>
    `,
    examples: [
      { emoji: '🧊', title: 'Melting', desc: 'Physical – ice to water' },
      { emoji: '🔥', title: 'Burning', desc: 'Chemical – wood to ash' },
      { emoji: '🔩', title: 'Rusting', desc: 'Chemical – iron to iron oxide' },
      { emoji: '✂️', title: 'Cutting', desc: 'Physical – paper cut' },
      { emoji: '🍳', title: 'Cooking egg', desc: 'Chemical – protein denaturation' },
      { emoji: '💧', title: 'Boiling water', desc: 'Physical – water to steam' }
    ],
    analogy: '🎨 <strong>Physical = rearranging LEGO bricks; Chemical = baking a cake.</strong>',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Change Simulation</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <button id="changePhysical">🧊 Physical (Melt)</button>
            <button id="changeChemical">🔥 Chemical (Burn)</button>
            <span id="changeResult" style="color:#9bb4d9;">Click to see change</span>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'Which is a physical change?', options: ['Rusting', 'Melting', 'Burning', 'Cooking'], answer: 1, explanation: 'Melting is a phase change; no new substance is formed.' },
      { q: 'Which is a chemical change?', options: ['Cutting paper', 'Boiling water', 'Rusting iron', 'Freezing water'], answer: 2, explanation: 'Rusting forms new substances (iron oxides).' },
      { q: 'What is a sign of a chemical change?', options: ['Colour change', 'Change of state', 'Dissolving', 'Cutting'], answer: 0, explanation: 'A colour change often indicates a new substance is formed.' },
      { q: 'Burning wood is a:', options: ['Physical change', 'Chemical change', 'Both physical and chemical', 'Neither'], answer: 1, explanation: 'Burning produces new substances (ash, gases).' },
      { q: 'Which process is chemical?', options: ['Evaporation', 'Sublimation', 'Digestion', 'Condensation'], answer: 2, explanation: 'Digestion breaks down food into new substances through chemical reactions.' },
      { q: 'What type of change is fermentation?', options: ['Physical', 'Chemical', 'Both physical and chemical', 'Neither'], answer: 1, explanation: 'Fermentation converts sugars into alcohol and CO₂ – chemical change.' },
      { q: 'Which change is reversible?', options: ['Chemical change', 'Physical change', 'Both are reversible', 'Neither is reversible'], answer: 1, explanation: 'Physical changes (like melting) are often reversible; chemical changes usually are not.' },
      { q: 'Is dissolving salt in water a chemical change?', options: ['Yes', 'No', 'Sometimes', 'Only if heated'], answer: 1, explanation: 'Dissolving is a physical change because no new substance is formed.' },
      { q: 'Which is a chemical property?', options: ['Density', 'Flammability', 'Boiling point', 'Solubility'], answer: 1, explanation: 'Flammability describes how a substance reacts with oxygen – a chemical property.' },
      { q: 'What happens in a chemical change?', options: ['New substances form', 'Substance changes state', 'Mass is lost', 'Only physical properties change'], answer: 0, explanation: 'The defining feature of a chemical change is the formation of new substances.' },
      { q: 'Which is an example of a chemical change in daily life?', options: ['Ice melting', 'Milk turning sour', 'Water evaporating', 'Sugar dissolving'], answer: 1, explanation: 'Souring involves bacterial fermentation producing new compounds.' },
      { q: 'What is the difference between a physical and chemical change?', options: ['Chemical change produces new substances; physical change does not', 'Physical change produces new substances; chemical change does not', 'Both produce new substances', 'Neither produces new substances'], answer: 0, explanation: 'Chemical changes create new substances; physical changes do not.' },
      { q: 'Which change is exothermic?', options: ['Melting', 'Boiling', 'Burning', 'Evaporation'], answer: 2, explanation: 'Burning (combustion) releases energy as heat and light.' },
      { q: 'Is photosynthesis a physical or chemical change?', options: ['Physical', 'Chemical', 'Both', 'Neither'], answer: 1, explanation: 'Photosynthesis converts CO₂ and water into glucose and oxygen – chemical change.' },
      { q: 'Which of these is a sign of a chemical change?', options: ['Change in temperature', 'Change in shape', 'Change in size', 'Change in state'], answer: 0, explanation: 'An energy change (heat release/absorption) often accompanies chemical reactions.' }
    ]
  },

  // ======================== 9. REACTIONS ========================
  {
    id: 'reactions',
    emoji: '⚗️',
    title: 'Chemical Reactions',
    subtitle: 'Reactants → Products',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>⚗️ What is a Chemical Reaction?</h4>
        <p>A chemical reaction is a process in which reactants are transformed into products. Bonds are broken and formed.</p>
      </div>
      <div class="note-block">
        <h4>🧪 Types of Reactions</h4>
        <ul>
          <li><strong>Synthesis</strong> – A + B → AB (e.g., 2H₂ + O₂ → 2H₂O).</li>
          <li><strong>Decomposition</strong> – AB → A + B (e.g., 2H₂O → 2H₂ + O₂).</li>
          <li><strong>Single Replacement</strong> – A + BC → AC + B.</li>
          <li><strong>Double Replacement</strong> – AB + CD → AD + CB.</li>
          <li><strong>Combustion</strong> – hydrocarbon + O₂ → CO₂ + H₂O.</li>
        </ul>
      </div>
    `,
    examples: [
      { emoji: '💧', title: 'Synthesis', desc: '2H₂ + O₂ → 2H₂O' },
      { emoji: '🔥', title: 'Combustion', desc: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
      { emoji: '🔩', title: 'Rusting', desc: '4Fe + 3O₂ → 2Fe₂O₃' },
      { emoji: '🧪', title: 'Acid-Base', desc: 'HCl + NaOH → NaCl + H₂O' },
      { emoji: '⚡', title: 'Photosynthesis', desc: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂' },
      { emoji: '🧬', title: 'Decomposition', desc: '2H₂O₂ → 2H₂O + O₂' }
    ],
    analogy: '🍳 <strong>Reactions = cooking.</strong> Mix ingredients (reactants) and apply heat to get a dish (products).',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Reaction Animation</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <select id="reactionSelect">
              <option value="synthesis">Synthesis: 2H₂+O₂→2H₂O</option>
              <option value="combustion">Combustion: CH₄+2O₂→CO₂+2H₂O</option>
            </select>
            <button id="animateReactionBtn">▶️ Animate</button>
            <span id="reactionStatus" style="color:#9bb4d9;">Ready</span>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'In the reaction 2H₂ + O₂ → 2H₂O, what are the reactants?', options: ['H₂O', 'H₂ and O₂', 'H₂ only', 'O₂ only'], answer: 1, explanation: 'Reactants are the starting substances: hydrogen and oxygen.' },
      { q: 'What type of reaction is CH₄ + 2O₂ → CO₂ + 2H₂O?', options: ['Synthesis', 'Decomposition', 'Combustion', 'Neutralization'], answer: 2, explanation: 'This is a combustion reaction (hydrocarbon + oxygen → CO₂ + H₂O).' },
      { q: 'Which reaction is a decomposition?', options: ['2H₂ + O₂ → 2H₂O', '2H₂O → 2H₂ + O₂', 'HCl + NaOH → NaCl + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O'], answer: 1, explanation: 'Decomposition breaks a compound into simpler substances.' },
      { q: 'What are the products in the reaction HCl + NaOH → NaCl + H₂O?', options: ['HCl and NaOH', 'NaCl and H₂O', 'H₂ and O₂', 'Na and Cl'], answer: 1, explanation: 'The products are sodium chloride (salt) and water.' },
      { q: 'Which reaction is a synthesis?', options: ['2H₂ + O₂ → 2H₂O', '2H₂O → 2H₂ + O₂', 'HCl + NaOH → NaCl + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O'], answer: 0, explanation: 'Synthesis combines two or more reactants to form one product.' },
      { q: 'What is the balanced equation for the reaction of hydrogen and oxygen?', options: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + 2O₂ → H₂O', '2H₂ + 2O₂ → 2H₂O'], answer: 1, explanation: 'The balanced equation is 2H₂ + O₂ → 2H₂O.' },
      { q: 'Which type of reaction produces heat and light?', options: ['Synthesis', 'Decomposition', 'Combustion', 'Neutralization'], answer: 2, explanation: 'Combustion is an exothermic reaction that releases heat and light.' },
      { q: 'What is the product of the reaction between sodium and chlorine?', options: ['NaCl', 'Na₂Cl', 'NaCl₂', 'Na₂Cl₂'], answer: 0, explanation: 'Sodium and chlorine form sodium chloride, NaCl.' },
      { q: 'Which reaction is used in batteries?', options: ['Oxidation‑reduction', 'Acid‑base neutralization', 'Precipitation', 'Decomposition'], answer: 0, explanation: 'Batteries use redox reactions to generate electrical energy.' },
      { q: 'What is the catalyst in many biological reactions?', options: ['Enzymes', 'Acids', 'Bases', 'Salts'], answer: 0, explanation: 'Enzymes are biological catalysts that speed up reactions.' },
      { q: 'Which reaction is endothermic?', options: ['Combustion', 'Photosynthesis', 'Neutralization', 'Rusting'], answer: 1, explanation: 'Photosynthesis absorbs light energy, making it endothermic.' },
      { q: 'What is the general form of a double replacement reaction?', options: ['A + B → AB', 'AB → A + B', 'A + BC → AC + B', 'AB + CD → AD + CB'], answer: 3, explanation: 'Double replacement: ions exchange partners.' },
      { q: 'Which reaction produces a precipitate?', options: ['Combustion', 'Neutralization', 'Precipitation reaction', 'Synthesis'], answer: 2, explanation: 'A precipitation reaction forms an insoluble solid (precipitate).' },
      { q: 'What is the coefficient of oxygen in the balanced combustion of methane?', options: ['1', '2', '3', '4'], answer: 1, explanation: 'CH₄ + 2O₂ → CO₂ + 2H₂O – coefficient of O₂ is 2.' },
      { q: 'Which reaction is used in the production of ammonia (Haber process)?', options: ['Synthesis', 'Decomposition', 'Single replacement', 'Double replacement'], answer: 0, explanation: 'Haber process: N₂ + 3H₂ → 2NH₃ (synthesis).' }
    ]
  },

  // ======================== 10. CONSERVATION ========================
  {
    id: 'conservation',
    emoji: '⚖️',
    title: 'Conservation of Mass',
    subtitle: 'Mass is Neither Created Nor Destroyed',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>⚖️ Law of Conservation of Mass</h4>
        <p>In a chemical reaction, the total mass of reactants equals the total mass of products. Atoms are rearranged, not lost or gained.</p>
      </div>
      <div class="note-block">
        <h4>🔑 Importance</h4>
        <p>This law ensures that chemical equations must be balanced. The number of each type of atom must be the same on both sides of the equation.</p>
      </div>
    `,
    examples: [
      { emoji: '⚖️', title: 'Balanced Equation', desc: 'Same atoms on both sides' },
      { emoji: '📐', title: 'Mass', desc: 'Total mass remains constant' },
      { emoji: '🧮', title: 'Counting', desc: 'Atoms are conserved' },
      { emoji: '🔁', title: 'Rearrangement', desc: 'Atoms change partners' },
      { emoji: '🧪', title: 'Experiment', desc: 'Mass before = mass after' },
      { emoji: '📊', title: 'Stoichiometry', desc: 'Used for calculations' }
    ],
    analogy: '🧱 <strong>Conservation = LEGO bricks.</strong> You can build different structures, but the number of bricks stays the same.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Atom Rearrangement</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <button id="rearrangeBtn">🔁 Rearrange Atoms</button>
            <span id="massDisplay" style="color:#b8d4ff;">Mass: 36 g</span>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'What does the law of conservation of mass state?', options: ['Mass is created in reactions', 'Mass is destroyed in reactions', 'Mass is neither created nor destroyed', 'Mass can change form'], answer: 2, explanation: 'Mass is conserved in chemical reactions; atoms are rearranged.' },
      { q: 'In a chemical reaction, atoms are:', options: ['Created', 'Destroyed', 'Rearranged', 'Transmuted'], answer: 2, explanation: 'Atoms are simply rearranged into new substances.' },
      { q: 'Why must chemical equations be balanced?', options: ['To show conservation of mass', 'To show conservation of energy', 'To show the reaction type', 'To make it look neat'], answer: 0, explanation: 'Balancing ensures the same number of atoms on both sides (mass conserved).' },
      { q: 'If 10 g of hydrogen reacts with 80 g of oxygen, what is the mass of water produced?', options: ['70 g', '80 g', '90 g', '10 g'], answer: 2, explanation: 'Total mass reactants = 10 + 80 = 90 g; products must also be 90 g.' },
      { q: 'What is the total mass of reactants in the reaction 2H₂ + O₂ → 2H₂O if 2 moles of H₂ (4 g) react with 1 mole of O₂ (32 g)?', options: ['4 g', '32 g', '36 g', '18 g'], answer: 2, explanation: '4 g + 32 g = 36 g total reactant mass.' },
      { q: 'Which scientist is credited with the law of conservation of mass?', options: ['Dalton', 'Lavoisier', 'Boyle', 'Avogadro'], answer: 1, explanation: 'Antoine Lavoisier established the law through careful experiments.' },
      { q: 'In a closed system, the mass before and after a reaction is:', options: ['Different', 'The same', 'Increased', 'Decreased'], answer: 1, explanation: 'In a closed system, mass is conserved; it remains constant.' },
      { q: 'What happens to the atoms in a chemical reaction?', options: ['They are rearranged', 'They are destroyed', 'They are created', 'They change into energy'], answer: 0, explanation: 'Atoms are rearranged but not created or destroyed.' },
      { q: 'If you burn 12 g of carbon in 32 g of oxygen, how much carbon dioxide is formed?', options: ['12 g', '32 g', '44 g', '20 g'], answer: 2, explanation: '12 + 32 = 44 g of CO₂ produced.' },
      { q: 'What is the mass of the products in a reaction where the reactants have a total mass of 50 g?', options: ['25 g', '50 g', '100 g', 'Cannot be determined'], answer: 1, explanation: 'By conservation of mass, products = 50 g.' },
      { q: 'Which of the following is a consequence of the conservation of mass?', options: ['Balanced chemical equations', 'Energy is also conserved', 'Reactions are always exothermic', 'Products have different properties'], answer: 0, explanation: 'Balanced equations are a direct result of mass conservation.' },
      { q: 'In the reaction 2Mg + O₂ → 2MgO, what is the mass of MgO if 48 g of Mg reacts with 32 g of O₂?', options: ['48 g', '32 g', '80 g', '96 g'], answer: 2, explanation: '48 + 32 = 80 g of MgO.' },
      { q: 'What is the mass of oxygen needed to react completely with 12 g of carbon to form CO₂?', options: ['12 g', '16 g', '32 g', '44 g'], answer: 2, explanation: 'C (12) + O₂ (32) → CO₂ (44); so 32 g oxygen needed.' },
      { q: 'Does the conservation of mass apply to nuclear reactions?', options: ['Yes', 'No', 'Only in some cases', 'It is the same'], answer: 1, explanation: 'Nuclear reactions involve conversion of mass to energy (E=mc²), so mass is not conserved.' },
      { q: 'What is the mass of water formed when 4 g of hydrogen reacts with 32 g of oxygen?', options: ['36 g', '28 g', '18 g', '40 g'], answer: 0, explanation: '4 + 32 = 36 g water.' }
    ]
  },

  // ======================== 11. MOLE ========================
  {
    id: 'mole',
    emoji: '🔢',
    title: 'The Mole',
    subtitle: 'Counting Unit',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🔢 What is a Mole?</h4>
        <p>A mole is the SI unit for amount of substance. It is defined as the number of atoms in exactly 12 g of carbon‑12.</p>
      </div>
      <div class="note-block">
        <h4>🔑 Avogadro's Number</h4>
        <p>1 mole = 6.022 × 10²³ particles (atoms, molecules, ions). This allows chemists to count particles by weighing.</p>
      </div>
      <div class="note-block">
        <h4>🧮 Molar Mass</h4>
        <p>The mass of one mole of a substance (in grams) is numerically equal to its atomic or molecular mass in u.</p>
      </div>
    `,
    examples: [
      { emoji: '🧮', title: 'Avogadro\'s Number', desc: '6.022 × 10²³ particles per mole' },
      { emoji: '⚖️', title: 'Molar Mass', desc: 'Mass of 1 mole of substance' },
      { emoji: '💧', title: 'Water', desc: '1 mol H₂O = 18.015 g' },
      { emoji: '🧂', title: 'Salt', desc: '1 mol NaCl = 58.44 g' },
      { emoji: '🔩', title: 'Iron', desc: '1 mol Fe = 55.85 g' },
      { emoji: '🌟', title: 'Gold', desc: '1 mol Au = 196.97 g' }
    ],
    analogy: '🥚 <strong>Mole = dozen.</strong> Just as a dozen means 12, a mole means 6.022×10²³ of something.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Particle Counter</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <label>Number of particles (x10²³): <input type="range" id="moleSlider" min="0" max="2" step="0.1" value="0.6" /></label>
            <span id="moleCount" style="color:#b8d4ff;">0.6×10²³</span>
            <button id="moleResetBtn">Reset to 1 mole</button>
            <span>Particles: <span id="particleCount">0</span></span>
            <span>Mass: <span id="massReadout">0.00</span> g</span>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'How many particles are in 1 mole?', options: ['6.022 × 10²³', '6.022 × 10²⁴', '6.022 × 10²²', '6.022 × 10²⁵'], answer: 0, explanation: 'Avogadro\'s number is 6.022 × 10²³ particles per mole.' },
      { q: 'What is the molar mass of water (H=1, O=16)?', options: ['16 g/mol', '17 g/mol', '18 g/mol', '20 g/mol'], answer: 2, explanation: 'H₂O: 2×1 + 16 = 18 g/mol.' },
      { q: 'How many moles of NaCl are in 58.44 g of NaCl? (molar mass = 58.44 g/mol)', options: ['0.5', '1', '2', '3'], answer: 1, explanation: 'Moles = mass / molar mass = 58.44 / 58.44 = 1 mol.' },
      { q: 'What is Avogadro\'s number?', options: ['6.022 × 10²³', '6.022 × 10²⁴', '6.022 × 10²²', '6.022 × 10²⁵'], answer: 0, explanation: 'Avogadro\'s number is defined as 6.022 × 10²³.' },
      { q: 'If you have 2 moles of water, how many molecules do you have?', options: ['1.2044 × 10²⁴', '6.022 × 10²³', '3.011 × 10²³', '2 × 10²³'], answer: 0, explanation: '2 × 6.022 × 10²³ = 1.2044 × 10²⁴ molecules.' },
      { q: 'What is the mass of 0.5 mole of carbon (atomic mass = 12 u)?', options: ['6 g', '12 g', '24 g', '3 g'], answer: 0, explanation: '0.5 × 12 = 6 g.' },
      { q: 'How many moles are in 36 g of water?', options: ['1', '2', '3', '4'], answer: 1, explanation: '36 g / 18 g/mol = 2 mol.' },
      { q: 'What is the molar mass of CO₂ (C=12, O=16)?', options: ['28 g/mol', '44 g/mol', '32 g/mol', '40 g/mol'], answer: 1, explanation: '12 + 2×16 = 44 g/mol.' },
      { q: 'How many atoms are in 1 mole of iron?', options: ['6.022 × 10²³', '1', '2 × 6.022 × 10²³', '6.022 × 10²⁴'], answer: 0, explanation: '1 mole contains Avogadro\'s number of atoms.' },
      { q: 'What is the mass of 1 mole of sodium (Na = 23)?', options: ['23 g', '46 g', '11.5 g', '12 g'], answer: 0, explanation: 'Molar mass of Na is 23 g/mol.' },
      { q: 'How many moles of oxygen (O₂) are in 32 g of O₂? (molar mass = 32 g/mol)', options: ['0.5', '1', '2', '4'], answer: 1, explanation: '32 g / 32 g/mol = 1 mol.' },
      { q: 'What is the mass of 0.25 mol of gold (Au = 197)?', options: ['49.25 g', '98.5 g', '24.6 g', '197 g'], answer: 0, explanation: '0.25 × 197 = 49.25 g.' },
      { q: 'Which quantity is measured in moles?', options: ['Mass', 'Volume', 'Number of particles', 'Temperature'], answer: 2, explanation: 'Moles count the number of particles (atoms, molecules, etc.).' },
      { q: 'What is the molar mass of NaCl (Na=23, Cl=35.5)?', options: ['58.5 g/mol', '35.5 g/mol', '23 g/mol', '59.5 g/mol'], answer: 0, explanation: '23 + 35.5 = 58.5 g/mol.' },
      { q: 'How many molecules are in 2 moles of CO₂?', options: ['1.2044 × 10²⁴', '6.022 × 10²³', '3.011 × 10²³', '4 × 10²³'], answer: 0, explanation: '2 × 6.022 × 10²³ = 1.2044 × 10²⁴ molecules.' }
    ]
  },

  // ======================== 12. ACIDS & BASES ========================
  {
    id: 'acids',
    emoji: '🧪',
    title: 'Acids, Bases & pH',
    subtitle: 'The pH Scale',
    has3D: true,
    notes: `
      <div class="note-block">
        <h4>🧪 Acids and Bases</h4>
        <p><strong>Acids</strong> – substances that donate protons (H⁺) and have pH < 7. <strong>Bases</strong> – substances that accept protons and have pH > 7.</p>
      </div>
      <div class="note-block">
        <h4>🔑 The pH Scale</h4>
        <p>pH = -log[H⁺]. Range 0–14. Neutral = 7 (pure water). Acidic < 7, basic > 7.</p>
      </div>
      <div class="note-block">
        <h4>🔬 Indicators</h4>
        <p>Substances like litmus, phenolphthalein change colour in acids/bases.</p>
      </div>
    `,
    examples: [
      { emoji: '🍋', title: 'Lemon juice', desc: 'Acidic (pH ~2)' },
      { emoji: '💧', title: 'Pure water', desc: 'Neutral (pH 7)' },
      { emoji: '🧼', title: 'Soap solution', desc: 'Basic (pH ~9)' },
      { emoji: '☕', title: 'Coffee', desc: 'Acidic (pH ~5)' },
      { emoji: '🧪', title: 'Ammonia', desc: 'Basic (pH ~11)' },
      { emoji: '🍅', title: 'Tomato', desc: 'Acidic (pH ~4)' }
    ],
    analogy: '🌡️ <strong>pH scale = thermometer.</strong> 0 = most acidic, 14 = most basic, 7 = neutral.',
    interactive: `
      <div class="sim-container">
        <div class="sim-3d" style="flex:1;">
          <h4 style="color:#8db8f0;">🌐 3D Acid-Base Model</h4>
          <div id="three-container-sim" style="position:relative;height:320px;">
            <div class="spinner" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;">
              <div class="loader"></div>
            </div>
          </div>
          <div class="sim-controls">
            <label>pH: <input type="range" id="phSlider" min="0" max="14" value="7" step="0.1" style="width:180px;" /></label>
            <span id="phValue" style="font-weight:bold;color:#b8d4ff;">7.0</span>
            <span id="phLabel" style="background:#1e3a6b;padding:4px 16px;border-radius:30px;">Neutral</span>
            <span>H⁺: <span id="hConcentration">1.00×10⁻⁷</span> M</span>
          </div>
        </div>
      </div>
    `,
    quiz15: [
      { q: 'What is the pH of pure water at 25°C?', options: ['0', '5', '7', '14'], answer: 2, explanation: 'Pure water is neutral with pH = 7.' },
      { q: 'Which pH indicates a basic solution?', options: ['2', '5', '8', '14'], answer: 2, explanation: 'pH > 7 indicates basic; pH 8 and 14 are basic, but 8 is the first basic option.' },
      { q: 'What is the pH of lemon juice (~0.1 M H⁺)?', options: ['1', '3', '5', '7'], answer: 0, explanation: '0.1 M H⁺ gives pH = 1 (since pH = -log(0.1) = 1).' },
      { q: 'Which is a strong acid?', options: ['Acetic acid', 'Hydrochloric acid', 'Citric acid', 'Carbonic acid'], answer: 1, explanation: 'HCl is a strong acid; it fully dissociates in water.' },
      { q: 'Which is a strong base?', options: ['Ammonia', 'Sodium hydroxide', 'Calcium hydroxide', 'Potassium hydroxide'], answer: 1, explanation: 'NaOH is a strong base (fully dissociates).' },
      { q: 'What is the colour of litmus in acid?', options: ['Red', 'Blue', 'Purple', 'Colourless'], answer: 0, explanation: 'Litmus turns red in acidic solution.' },
      { q: 'What is the pH range of acids?', options: ['0–6.9', '7', '7.1–14', '0–14'], answer: 0, explanation: 'Acids have pH less than 7 (0 to 6.9).' },
      { q: 'What is the concentration of H⁺ ions at pH 3?', options: ['1×10⁻³ M', '1×10⁻⁷ M', '1×10⁻¹⁰ M', '1×10⁻¹⁴ M'], answer: 0, explanation: 'pH = 3 → [H⁺] = 10⁻³ M.' },
      { q: 'Which substance is a base?', options: ['Vinegar', 'Lemon juice', 'Soap', 'Coffee'], answer: 2, explanation: 'Soap is basic (contains NaOH or KOH).' },
      { q: 'What is the pH of a solution with [H⁺] = 1×10⁻⁵ M?', options: ['3', '5', '7', '9'], answer: 1, explanation: 'pH = -log(10⁻⁵) = 5.' },
      { q: 'Which indicator turns pink in base?', options: ['Phenolphthalein', 'Litmus', 'Methyl orange', 'Bromothymol blue'], answer: 0, explanation: 'Phenolphthalein is colourless in acid, pink in base.' },
      { q: 'What is the neutralisation reaction between an acid and a base?', options: ['Acid + Base → Salt + Water', 'Acid + Base → Salt + Hydrogen', 'Acid + Base → Water + Oxygen', 'Acid + Base → Salt + Acid'], answer: 0, explanation: 'Neutralisation produces a salt and water.' },
      { q: 'What is the pH of stomach acid (HCl)?', options: ['~1.5', '~4', '~7', '~9'], answer: 0, explanation: 'Stomach acid is highly acidic, pH ~1.5.' },
      { q: 'Which of the following is a base?', options: ['H₂SO₄', 'HCl', 'NaOH', 'HNO₃'], answer: 2, explanation: 'NaOH is sodium hydroxide – a strong base.' },
      { q: 'What is the colour of universal indicator at pH 4?', options: ['Red', 'Yellow', 'Green', 'Blue'], answer: 0, explanation: 'At pH 4, universal indicator turns red/orange (acidic).' }
    ]
  }
];
