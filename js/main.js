// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'de';

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.dataset.lang;
        updateLanguage();
    });
});

function updateLanguage() {
    document.querySelectorAll('[data-de]').forEach(element => {
        const text = element.dataset[currentLang];
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update glitch effect
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        const text = el.dataset[currentLang] || el.textContent;
        el.setAttribute('data-text', text);
        el.textContent = text;
    });
}

// Discord Member Count
async function fetchDiscordStats() {
    try {
        const response = await fetch('https://discord.com/api/v10/invites/PbsUptpm7Y?with_counts=true');
        const data = await response.json();
        
        if (data.approximate_presence_count) {
            const memberCount = data.approximate_presence_count.toLocaleString('de-DE');
            const memberCountEl = document.getElementById('memberCount');
            if (memberCountEl) {
                memberCountEl.textContent = memberCount;
            }
        }
    } catch (error) {
        console.error('Error fetching Discord stats:', error);
        const memberCountEl = document.getElementById('memberCount');
        if (memberCountEl) {
            memberCountEl.textContent = '50+';
        }
    }
}

// Bot Statistics API Call
async function fetchBotStats() {
    const offlineNotice = document.getElementById('statsOfflineNotice');
    try {
        // API URL für Bot-Statistiken
        const response = await fetch('http://192.168.178.25:3000/stats');
        const data = await response.json();
        
        // Verstecke Offline-Notice
        if (offlineNotice) {
            offlineNotice.style.display = 'none';
        }
        
        // Animiere die Zahlen
        animateCounter('serverCount', data.servers);
        animateCounter('userCount', data.users);
        
        // Uptime formatieren und anzeigen
        const uptimeEl = document.getElementById('uptime');
        if (uptimeEl && data.uptime) {
            uptimeEl.textContent = formatUptime(data.uptime);
        }
    } catch (error) {
        console.error('Error fetching bot stats:', error);
        
        // Zeige Offline-Notice
        if (offlineNotice) {
            offlineNotice.style.display = 'flex';
        }
        
        // Fallback Werte bei Fehler
        document.getElementById('serverCount').textContent = 'Offline';
        document.getElementById('userCount').textContent = 'Offline';
        document.getElementById('uptime').textContent = 'Offline';
    }
}

// Counter Animation
function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000; // 2 Sekunden
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('de-DE');
    }, 16);
}

// Uptime Formatter (erwartet Millisekunden oder Sekunden)
function formatUptime(uptimeMs) {
    // Wenn uptime in Sekunden ist, multipliziere mit 1000
    const ms = uptimeMs > 10000000000 ? uptimeMs : uptimeMs * 1000;
    
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
        return `${days}d ${hours}h`;
    } else {
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
});

// Three.js Background Animation
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 30;

    // Create connection lines
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending
    });

    const lines = [];
    const maxConnections = 50;

    function createConnections() {
        // Clear old lines
        lines.forEach(line => scene.remove(line));
        lines.length = 0;

        const positions = particlesGeometry.attributes.position.array;
        let connectionCount = 0;

        for (let i = 0; i < particlesCount && connectionCount < maxConnections; i += 3) {
            const x1 = positions[i * 3];
            const y1 = positions[i * 3 + 1];
            const z1 = positions[i * 3 + 2];

            for (let j = i + 3; j < particlesCount && connectionCount < maxConnections; j += 3) {
                const x2 = positions[j * 3];
                const y2 = positions[j * 3 + 1];
                const z2 = positions[j * 3 + 2];

                const distance = Math.sqrt(
                    Math.pow(x2 - x1, 2) + 
                    Math.pow(y2 - y1, 2) + 
                    Math.pow(z2 - z1, 2)
                );

                if (distance < 10) {
                    const lineGeometry = new THREE.BufferGeometry();
                    const linePositions = new Float32Array([x1, y1, z1, x2, y2, z2]);
                    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                    
                    const line = new THREE.Line(lineGeometry, linesMaterial);
                    scene.add(line);
                    lines.push(line);
                    connectionCount++;
                }
            }
        }
    }

    createConnections();

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        // Follow mouse
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Recreate connections periodically
    setInterval(createConnections, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and pricing cards
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Load Discord avatars via backend
async function loadDiscordAvatars() {
    const avatarElements = document.querySelectorAll('.discord-avatar');
    
    for (const img of avatarElements) {
        const userId = img.getAttribute('data-discord-id');
        if (!userId) continue;
        
        try {
            const response = await fetch(`http://192.168.178.25:3000/avatar/${userId}`);
            
            if (response.ok) {
                const data = await response.json();
                if (data.avatarUrl) {
                    img.src = data.avatarUrl;
                    continue;
                }
            }
        } catch (error) {
            console.log('Avatar-Abruf fehlgeschlagen:', error);
        }
        
        // Fallback: Default Discord Avatar
        const defaultAvatarIndex = (parseInt(userId) >> 22) % 6;
        img.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
    }
}

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchDiscordStats();
    fetchBotStats(); // Bot Stats abrufen
    loadDiscordAvatars(); // Discord Avatare laden
    initThreeJS();
});
