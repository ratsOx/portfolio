// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});
navLinks.forEach(link => link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}));

// ===== Typing Effect =====
const typingText = document.getElementById('typingText');
const roles = ['Full-Stack Developer', 'IT Infrastructure Specialist', 'Problem Solver', 'Agile Practitioner'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
function typeEffect() {
    const currentRole = roles[roleIndex];
    typingText.textContent = currentRole.substring(0, charIndex);
    if (!isDeleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeEffect, 120);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, isDeleting ? 2000 : 500);
    }
}
setTimeout(typeEffect, 1000);

// ===== Stats Counter =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;
window.addEventListener('scroll', function animateStats() {
    if (statsAnimated) return;
    const aboutSection = document.getElementById('about');
    if (aboutSection.getBoundingClientRect().top < window.innerHeight - 100) {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let current = 0;
            const update = () => {
                if (current < target) {
                    current += target / 40;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else stat.textContent = target + '+';
            };
            update();
        });
        statsAnimated = true;
    }
});

// ===== Hero Particles =====
(function() {
    const container = document.getElementById('heroParticles');
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.style.cssText = `position:absolute;width:${Math.random()*4+2}px;height:${p.style.width};background:var(--accent);opacity:0.2;border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:floatParticle ${Math.random()*8+5}s linear infinite`;
        container.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = '@keyframes floatParticle{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:0.6}100%{transform:translateY(-100vh) translateX(40px);opacity:0}}';
    document.head.appendChild(style);
})();

// ===== Skills Montage Generators =====
function populateTrack(trackId, items) {
    const track = document.getElementById(trackId);
    const fragment = document.createDocumentFragment();
    for (let dup = 0; dup < 2; dup++) {
        items.forEach(({ cls, label }) => {
            const item = document.createElement('div');
            item.className = 'skill-logo-item';
            item.innerHTML = `<i class="${cls}"></i><span>${label}</span>`;
            fragment.appendChild(item);
        });
    }
    track.appendChild(fragment);
}

// Languages (unchanged)
const languages = [
    { cls: 'devicon-html5-plain colored', label: 'HTML5' },
    { cls: 'devicon-css3-plain colored', label: 'CSS3' },
    { cls: 'devicon-javascript-plain colored', label: 'JavaScript' },
    { cls: 'devicon-typescript-plain colored', label: 'TypeScript' },
    { cls: 'devicon-python-plain colored', label: 'Python' },
    { cls: 'devicon-java-plain colored', label: 'Java' },
    { cls: 'devicon-c-plain colored', label: 'C' },
    { cls: 'devicon-cplusplus-plain colored', label: 'C++' },
    { cls: 'devicon-csharp-plain colored', label: 'C#' },
    { cls: 'devicon-react-original colored', label: 'React' },
    { cls: 'devicon-bootstrap-plain colored', label: 'Bootstrap' },
    { cls: 'devicon-tailwindcss-plain colored', label: 'Tailwind' },
    { cls: 'devicon-flutter-plain colored', label: 'Flutter' }
];

// Tools + Databases merged into one list
const toolsAndDatabases = [
    // Tools
    { cls: 'devicon-vscode-plain colored', label: 'VS Code' },
    { cls: 'devicon-visualstudio-plain colored', label: 'Visual Studio' },
    { cls: 'devicon-androidstudio-plain colored', label: 'Android Studio' },
    { cls: 'devicon-git-plain colored', label: 'Git' },
    { cls: 'devicon-github-original colored', label: 'GitHub' },
    { cls: 'devicon-figma-plain colored', label: 'Figma' },
    { cls: 'devicon-photoshop-plain colored', label: 'Photoshop' },
    { cls: 'fas fa-server', label: 'XAMPP' },  // Font Awesome
    // Databases
    { cls: 'devicon-mysql-plain colored', label: 'MySQL' },
    { cls: 'devicon-postgresql-plain colored', label: 'PostgreSQL' },
    { cls: 'devicon-sqlite-plain colored', label: 'SQLite' },
    { cls: 'devicon-mongodb-plain colored', label: 'MongoDB' }
];

populateTrack('languagesTrack', languages);
populateTrack('toolsDatabasesTrack', toolsAndDatabases);

// ===== Contact Form =====
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validation (unchanged)
    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const msg = document.getElementById('message');
    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
    [name, email, msg].forEach(f => f.style.borderColor = 'var(--border)');

    if (!name.value.trim()) { document.querySelector('#name + .form-error').style.display = 'block'; name.style.borderColor = 'var(--error)'; valid = false; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { document.querySelector('#email + .form-error').style.display = 'block'; email.style.borderColor = 'var(--error)'; valid = false; }
    if (!msg.value.trim()) { document.querySelector('#message + .form-error').style.display = 'block'; msg.style.borderColor = 'var(--error)'; valid = false; }

    if (!valid) return;

    // Send to Formspree
    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'   // ← MANDATORY for AJAX requests
            },
            body: formData
        });

        if (response.ok) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
            form.reset();
        } else {
            const err = await response.json();
            console.error('Formspree error:', err);
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please check your connection.');
    }
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
function updateThemeIcon() {
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    updateThemeIcon();
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}
updateThemeIcon();

// ===== Footer Year =====
document.getElementById('currentYear').textContent = new Date().getFullYear();