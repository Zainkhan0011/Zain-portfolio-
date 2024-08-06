// script.js

// 3D background animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x3498db, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Particle background
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
    },
    retina_detect: true
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
    cursorFollower.classList.add('click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
    cursorFollower.classList.remove('click');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-card, .card-3d');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('fade-in');
            if (element.classList.contains('skill-card')) {
                const progress = element.querySelector('.skill-progress');
                progress.style.width = progress.getAttribute('data-progress');
            }
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Form submitted! (Replace this with your actual form submission code)');
});

// Typing animation for the main heading
const heading = document.querySelector('h1');
const text = heading.textContent;
heading.innerHTML = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heading.innerHTML += `<span style="animation: fadeIn 0.5s ${i * 0.1}s forwards;">${text.charAt(i)}</span>`;
        i++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();

// 3D Tilt effect for cards
VanillaTilt.init(document.querySelectorAll(".project-card, .skill-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Floating animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.classList.add('floating');
    card.style.animationDelay = `${index * 0.2}s`;
});

// Rotating animation for skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.classList.add('rotate');
    card.style.animationDelay = `${index * 0.5}s`;
});

// Interactive hover effect for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1) translateY(-5px)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1) translateY(0)';
    });
});

// Window resize event for responsive 3D background
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Parallax effect for background elements
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    gsap.to('.card-3d', {
        duration: 0.5,
        x: mouseX * 50,
        y: mouseY * 50,
        rotateX: mouseY * 10,
        rotateY: -mouseX * 10,
    });
});