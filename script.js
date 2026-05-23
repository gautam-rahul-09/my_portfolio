'use strict';

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = pct + '%';
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
        ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.85)';

    // Active link
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

navLinks.forEach(l => l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
}));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isLight = false;
themeToggle.addEventListener('click', () => {
    isLight = !isLight;
    document.body.classList.toggle('light', isLight);
    themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
});

// ===== HERO CANVAS PARTICLES =====
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '0,194,255' : '139,92,246';
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0,194,255,${0.06 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ===== TYPING ANIMATION =====
const phrases = [
    'AI-powered systems',
    'Generative AI apps',
    'Data Analytics tools',
    'intelligent solutions',
    'ML models'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex--);
    } else {
        typedEl.textContent = current.substring(0, charIndex++);
    }
    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length + 1) {
        delay = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }
    setTimeout(typeWriter, delay);
}
typeWriter();

// ===== STATS COUNTER =====
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + '+';
        if (count >= target) clearInterval(timer);
    }, 50);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(animateCounter);
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.w + '%';
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !show);
        });
    });
});

// ===== CONTACT FORM WITH EMAILJS =====
// Credentials loaded from emailjs-config.js
const EJSID = { pub: 'mSNkhi4iVm1QGey2U', svc: 'service_2f7lysf', tpl: 'template_pm9vr2r' };
emailjs.init(EJSID.pub);

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Please enter a valid email address.', 'error'); return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-submit-text').style.display = 'none';
    submitBtn.querySelector('.btn-submit-loading').style.display = 'inline';

    try {
        await emailjs.send(EJSID.svc, EJSID.tpl, {
            from_name:  name,
            from_email: email,
            subject:    subject,
            message:    message,
            reply_to:   email
        });
        showStatus('✅ Message sent! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (err) {
        console.error(err);
        showStatus('❌ Failed to send. Email me at gautamrahul2905@gmail.com', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-submit-text').style.display = 'inline';
        submitBtn.querySelector('.btn-submit-loading').style.display = 'none';
    }
});

function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => { formStatus.className = 'form-status'; }, 6000);
}

// Floating label fix for textarea
document.querySelectorAll('.form-group textarea, .form-group input').forEach(el => {
    el.addEventListener('input', () => {
        el.setAttribute('data-filled', el.value ? 'true' : '');
    });
});
