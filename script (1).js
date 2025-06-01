// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'hsla(var(--surface) / 0.98)';
            navbar.style.boxShadow = '0 2px 20px hsla(var(--shadow))';
        } else {
            navbar.style.background = 'hsla(var(--surface) / 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .about-text, .about-stats').forEach(el => {
        observer.observe(el);
    });

    // Button click handlers
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle specific button actions
            const buttonText = this.textContent.trim();
            
            switch(buttonText) {
                case 'Get a Quote':
                case 'Get Quote':
                    document.querySelector('#contact').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'Learn More':
                    document.querySelector('#about').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'View Portfolio':
                    document.querySelector('#portfolio').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'View Details':
                    // Placeholder for portfolio detail functionality
                    alert('Portfolio details coming soon! Contact us for more information.');
                    break;
                case 'Contact Us':
                    document.querySelector('#contact').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'Get Started':
                    document.querySelector('#services').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'Call Us':
                    window.location.href = 'tel:+639669563898';
                    break;
            }
        });
    });

    // Form submission handler
    document.querySelector('.contact-form form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroCard = document.querySelector('.hero-card');
        
        if (heroCard) {
            const speed = scrolled * 0.5;
            heroCard.style.transform = `translateY(${speed}px)`;
        }
    });

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h4');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
                }
            }, 16);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Logo error handling
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            // Create a fallback SVG logo
            const svgLogo = document.createElement('div');
            svgLogo.innerHTML = `
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="hsl(var(--primary-color))"/>
                    <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" stroke="white" stroke-width="2" fill="none"/>
                    <circle cx="16" cy="16" r="3" fill="white"/>
                </svg>
            `;
            this.parentNode.replaceChild(svgLogo.firstElementChild, this);
        });
    });
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
