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
    const isDark = body.classList.contains('dark-mode');
    toggleButton.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load Theme Preference on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';
    } else {
        toggleButton.textContent = '🌙';
    }
});

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

// Typewriter Effect for Name
const nameElement = document.getElementById('typed-name');
const fullName = "Ashwith Reddy";
let i = 0;

function typeWriter() {
    if (i < fullName.length) {
        nameElement.textContent += fullName.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    }
}
setTimeout(typeWriter, 500);

// Hero Particle Background (Universe Theme)
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
    const numParticles = 150;
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
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

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
});

// Enhanced Scroll Animations for Sections
const sections = document.querySelectorAll('.container, .contact');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transition = 'transform 1s ease, opacity 1s ease';
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
        } else {
            entry.target.style.transform = 'scale(0.95)';
            entry.target.style.opacity = '0.7';
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.style.transform = 'scale(0.95)';
    section.style.opacity = '0.7';
    sectionObserver.observe(section);
});

// Page Load Fade
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Email Obfuscation and Click Handler
document.addEventListener('DOMContentLoaded', () => {
    const email = 'saiashwith' + '@' + 'gmail.com';
    const emailLink = document.getElementById('email-link');
    const heroEmailLink = document.getElementById('hero-email-link');

    if (emailLink && heroEmailLink) {
        // Set email for Contact section
        emailLink.href = 'mailto:' + email;
        emailLink.textContent = email;

        // Set email for Hero section "Connect Now" button
        heroEmailLink.href = 'mailto:' + email;

        // Debugging logs
        console.log('Email set for Contact link:', emailLink.href);
        console.log('Email set for Hero link:', heroEmailLink.href);

        // Fallback: Force mailto link to open if click doesn’t work automatically
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:' + email;
            console.log('Contact email clicked');
        });

        heroEmailLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:' + email;
            console.log('Hero email clicked');
        });
    } else {
        console.error('Email link elements not found in DOM');
    }
});