// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animations with Reverse
const animateElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('out');
        } else if (entry.boundingClientRect.top > 0) {
            // Only reverse when scrolling up past the element
            entry.target.classList.remove('visible');
            entry.target.classList.add('out');
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => observer.observe(el));

// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleButton.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load Theme Preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = '☀️';
}

// Mobile Nav Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Skill Card Interactions
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.05) rotate(1deg)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotate(0)';
    });
    card.addEventListener('click', () => {
        const skill = card.getAttribute('data-skill');
        const expIndex = { python: 1, cloud: 1, ml: 3, data: 2, devops: 3 }[skill];
        const relatedExp = document.querySelector(`#experience .timeline-item:nth-child(${expIndex})`);
        if (relatedExp) relatedExp.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hero Animation
const heroTitle = document.querySelector('.hero-content h1');
const heroTagline = document.querySelector('.tagline');
const heroSubTag = document.querySelector('.sub-tag');
[heroTitle, heroTagline, heroSubTag].forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, i * 400);
});

// Timeline Dots
document.querySelectorAll('.timeline-item').forEach(item => {
    const dot = document.createElement('div');
    dot.classList.add('timeline-dot');
    dot.style.position = 'absolute';
    dot.style.width = '16px';
    dot.style.height = '16px';
    dot.style.background = '#00d4ff';
    dot.style.borderRadius = '50%';
    dot.style.top = '35px';
    dot.style.zIndex = '10';
    dot.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.7)';
    if (item.style.textAlign === 'right') {
        dot.style.right = '-38px';
    } else {
        dot.style.left = '-38px';
    }
    item.appendChild(dot);
});

// Hero Particle Background (Simulated Canvas Effect)
const hero = document.querySelector('.hero');
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0';
hero.prepend(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
}

function initParticles() {
    particles = [];
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
initParticles();
animateParticles();

// Page Load Fade
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});