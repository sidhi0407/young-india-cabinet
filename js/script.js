/* ============================= */
/* MOBILE MENU TOGGLE */
/* ============================= */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ============================= */
/* SMOOTH SCROLL TO SECTION */
/* ============================= */

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ============================= */
/* NAVBAR ANIMATION ON SCROLL */
/* ============================= */

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScrollTop = scrollTop;
});

/* ============================= */
/* FORM SUBMISSION */
/* ============================= */

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    
    // Basic validation
    if (!email || !phone) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Show success message
    const originalText = form.querySelector('button').textContent;
    form.querySelector('button').textContent = '✓ Submitted!';
    form.querySelector('button').style.background = '#4CAF50';
    
    // Reset form
    setTimeout(() => {
        form.reset();
        form.querySelector('button').textContent = originalText;
        form.querySelector('button').style.background = '';
    }, 2000);
    
    // Here you would typically send the data to a backend
    console.log('Form submitted:', { email, phone });
}

/* ============================= */
/* SCROLL ANIMATION */
/* ============================= */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add observer to all elements that should animate
const animatedElements = document.querySelectorAll(
    '.vision-card, .apparatus-card, .challenge-card, .philosophy-point'
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

/* ============================= */
/* PARALLAX EFFECT */
/* ============================= */

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    parallaxElements.forEach(element => {
        let scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

/* ============================= */
/* COUNTER ANIMATION */
/* ============================= */

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ============================= */
/* ACTIVE NAV LINK HIGHLIGHTING */
/* ============================= */

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ============================= */
/* BUTTON RIPPLE EFFECT */
/* ============================= */

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styling if not already in CSS
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                .btn {
                    position: relative;
                    overflow: hidden;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
    });
});

/* ============================= */
/* LOADING ANIMATION */
/* ============================= */

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/* ============================= */
/* KEYBOARD NAVIGATION */
/* ============================= */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ============================= */
/* ACCESSIBILITY: FOCUS VISIBLE */
/* ============================= */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

/* ============================= */
/* LAZY LOAD IMAGES */
/* ============================= */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* ============================= */
/* PERFORMANCE: DEBOUNCE */
/* ============================= */

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/* ============================= */
/* ACTIVE STYLE FOR NAV LINKS */
/* ============================= */

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.style.color = '');
            this.style.color = '#FF6B35';
        });
    });
});

/* ============================= */
/* CONSOLE MESSAGE */
/* ============================= */

console.log('%cWelcome to The Young India Cabinet', 'font-size: 20px; color: #FF6B35; font-weight: bold;');
console.log('%cThe Revolution before Revolution', 'font-size: 14px; color: #FFA500; font-style: italic;');
console.log('%cBuilt with passion for a better tomorrow', 'font-size: 12px; color: #A0A0A0;');
