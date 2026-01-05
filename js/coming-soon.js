// Coming Soon Page JavaScript

// Initialize Three.js Background
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 50;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0xa78bfa,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;

        // Mouse interaction
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Countdown Timer
function startCountdown() {
    const launchDate = new Date(config.comingSoon.launchDate).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-grid').innerHTML = '<h2>We are live!</h2>';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Generate Roadmap Steps
function generateRoadmap() {
    const roadmapSteps = document.getElementById('roadmapSteps');
    const currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
    const roadmap = config.comingSoon.roadmap;

    // Calculate plane position based on completed steps
    const completedSteps = roadmap.filter(step => step.status === 'completed').length;
    const totalSteps = roadmap.length;
    const planePosition = (completedSteps / totalSteps) * 100;
    
    // Update plane position
    const plane = document.getElementById('plane');
    setTimeout(() => {
        plane.style.left = `${planePosition}%`;
    }, 500);

    // Custom Step Icons SVG
    const stepIcons = {
        1: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
        2: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16" stroke="currentColor" stroke-width="2"/>
            </svg>`,
        3: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="10" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                <circle cx="9" cy="16" r="1.5" fill="currentColor"/>
                <circle cx="15" cy="16" r="1.5" fill="currentColor"/>
                <path d="M8 10V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 13V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>`,
        4: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M8 21H16M12 17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M7 7L12 12L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="7" cy="7" r="1" fill="currentColor"/>
                <circle cx="17" cy="7" r="1" fill="currentColor"/>
            </svg>`,
        5: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 7V12L15 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
        6: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 8.5L21 9L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9L9.5 8.5L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M12 9V12L14 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>`
    };

    // Subtask status icons
    const statusIcons = {
        completed: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.2"/>
                        <path d="M5 8.5L7 10.5L11 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`,
        'in-progress': `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                            <path d="M8 4v4l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>`,
        upcoming: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
                        <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.4"/>
                    </svg>`
    };

    roadmapSteps.innerHTML = '';

    roadmap.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'roadmap-step';
        stepDiv.style.animationDelay = `${index * 0.1}s`;

        // Count subtasks by status
        const totalSubtasks = step.subtasks.length;
        const completedCount = step.subtasks.filter(s => s.status === 'completed').length;

        const subtasksHTML = step.subtasks.map(subtask => `
            <div class="subtask ${subtask.status}">
                <div class="subtask-icon ${subtask.status}">
                    ${statusIcons[subtask.status]}
                </div>
                <div class="subtask-text">${currentLang === 'de' ? subtask.titleDE : subtask.title}</div>
            </div>
        `).join('');

        stepDiv.innerHTML = `
            <div class="step-header">
                <div class="step-header-top">
                    <span class="step-stage">Stage ${index + 1}</span>
                    <span class="step-count">${completedCount}/${totalSubtasks}</span>
                </div>
                <div class="step-icon-container">
                    <div class="step-icon ${step.status}">
                        ${stepIcons[step.id] || stepIcons[1]}
                    </div>
                    <div class="step-title-group">
                        <h3 class="step-title ${step.status}">${currentLang === 'de' ? step.titleDE : step.title}</h3>
                        <p class="step-description">${currentLang === 'de' ? step.descriptionDE : step.description}</p>
                    </div>
                </div>
            </div>
            <div class="subtasks">
                ${subtasksHTML}
            </div>
        `;

        roadmapSteps.appendChild(stepDiv);
    });
}

// Language Switcher
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update all text elements
            document.querySelectorAll('[data-de][data-en]').forEach(elem => {
                if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                    elem.placeholder = elem.getAttribute(`data-${lang}`);
                } else {
                    elem.textContent = elem.getAttribute(`data-${lang}`);
                }
            });
            
            // Regenerate roadmap with new language
            generateRoadmap();
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    startCountdown();
    generateRoadmap();
    initLanguageSwitcher();
});
