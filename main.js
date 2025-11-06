// Ultra Premium Royal Portfolio - Main JavaScript File

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initHeroSection();
    initAnimations();
    initScrollEffects();
    initContactForm();
    initTestimonialsSlider();
    initPortfolioFilter();
    initSkillAnimations();
    initRoyalEffects();
    
    // Initialize third-party libraries
    initAOS();
    initParticles();
    initGSAPAnimations();
    
    console.log('🏰 Royal Portfolio Initialized Successfully!');
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        // Add a small delay for better UX
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.royal-navbar');
    const navLinks = document.querySelectorAll('.royal-nav-link');
    const scrollTop = document.querySelector('.scroll-to-top');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            scrollTop.classList.remove('active');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top functionality
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== HERO SECTION =====
function initHeroSection() {
    const heroScroll = document.querySelector('.hero-scroll-indicator');
    
    // Hero scroll indicator click
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Hero typing effect
    initHeroTypingEffect();
}

function initHeroTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Initialize counter animations
    initCounters();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize hover effects
    initHoverEffects();
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

function initHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('royalContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    showNotification('Your royal message has been delivered successfully!', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

function validateForm(formData) {
    const { name, email, subject, message } = formData;
    
    if (!name.trim()) {
        showNotification('Please enter your noble name.', 'error');
        return false;
    }
    
    if (!email.trim() || !isValidEmail(email)) {
        showNotification('Please enter a valid royal email.', 'error');
        return false;
    }
    
    if (!subject.trim()) {
        showNotification('Please enter a subject for your missive.', 'error');
        return false;
    }
    
    if (!message.trim()) {
        showNotification('Please enter your royal message.', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `royal-notification royal-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'var(--primary-gold)' : 'var(--deep-red)'};
        color: var(--dark-bg);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== TESTIMONIALS SLIDER =====
function initTestimonialsSlider() {
    const sliderContainer = document.querySelector('.testimonials-slider');
    
    if (sliderContainer) {
        // Create sample testimonials data
        const testimonials = [
            {
                content: "The Windsor family's expertise in preserving royal artifacts is unparalleled. Their dedication to historical accuracy is truly remarkable.",
                author: "Lady Eleanor Rutherford",
                position: "Royal Historian",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            },
            {
                content: "Working with Lord Windsor has been an honor. His knowledge of traditional craftsmanship techniques has helped preserve our family's heritage.",
                author: "Sir William Harrington",
                position: "Heritage Foundation Director",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            },
            {
                content: "The attention to detail and historical accuracy in their work is exceptional. A true guardian of royal traditions.",
                author: "Dr. Victoria Lancaster",
                position: "Museum Curator",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            }
        ];
        
        // Populate testimonials
        const swiperWrapper = sliderContainer.querySelector('.swiper-wrapper');
        
        testimonials.forEach(testimonial => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide testimonial-slide';
            slide.innerHTML = `
                <div class="testimonial-content">
                    ${testimonial.content}
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}" class="author-image">
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
        
        // Initialize Swiper
        new Swiper(sliderContainer, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid) return;
    
    // Sample portfolio data
    const portfolioItems = [
        {
            category: 'manuscripts',
            title: 'Medieval Royal Manuscript',
            description: '15th century illuminated manuscript from the Windsor collection',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            category: 'artifacts',
            title: 'Royal Ceremonial Sword',
            description: '16th century ceremonial sword with gold inlay',
            image: 'https://images.unsplash.com/photo-1559314111-8e0ea8486d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            category: 'jewelry',
            title: 'Ancient Royal Crown',
            description: 'Gold crown with precious gems from the Tudor period',
            image: 'https://images.unsplash.com/photo-1581938290357-8a8e8c79b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            category: 'art',
            title: 'Royal Portrait',
            description: 'Oil painting of King Henry VIII from the royal collection',
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            category: 'manuscripts',
            title: 'Ancient Royal Decree',
            description: 'Parchment document with royal seal from 1450',
            image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            category: 'artifacts',
            title: 'Royal Ceremonial Armor',
            description: 'Full plate armor from the Elizabethan era',
            image: 'https://images.unsplash.com/photo-1578301978693-85fa9b03270b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];
    
    // Populate portfolio grid
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${item.category}`;
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-image">
            <div class="portfolio-overlay">
                <span class="portfolio-category">${item.category}</span>
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
                <button class="btn btn-royal-primary view-details">View Details</button>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            const items = portfolioGrid.querySelectorAll('.portfolio-item');
            
            items.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add click handlers for view details buttons
    portfolioGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details')) {
            const portfolioItem = e.target.closest('.portfolio-item');
            const title = portfolioItem.querySelector('.portfolio-title').textContent;
            
            showNotification(`Viewing details for: ${title}`, 'success');
        }
    });
}

// ===== SKILL ANIMATIONS =====
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 300);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== ROYAL EFFECTS =====
function initRoyalEffects() {
    // Add royal seal animation
    initRoyalSeal();
    
    // Add particle effects to specific elements
    initElementParticles();
    
    // Add royal sound effects (optional)
    initRoyalSounds();
}

function initRoyalSeal() {
    const seals = document.querySelectorAll('.royal-seal, .about-badge');
    
    seals.forEach(seal => {
        seal.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 600);
        });
    });
}

function initElementParticles() {
    // Add particle effects to royal elements on hover
    const royalElements = document.querySelectorAll('.royal-badge, .medallion');
    
    royalElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            createParticleBurst(this);
        });
    });
}

function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--primary-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        
        anime({
            targets: particle,
            left: targetX,
            top: targetY,
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeOutCubic',
            complete: function() {
                document.body.removeChild(particle);
            }
        });
    }
}

function initRoyalSounds() {
    // Optional: Add subtle sound effects for royal interactions
    // This would require additional audio files and user permission
}

// ===== THIRD-PARTY LIBRARY INITIALIZATIONS =====
function initAOS() {
    AOS.init({
        duration: 1200,
        once: true,
        offset: 100,
        easing: 'ease-in-out',
    });
}

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('hero-particles', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#D4AF37' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#D4AF37',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

function initGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        // Section title animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-triggered animations and effects
}, 10));

window.addEventListener('resize', throttle(() => {
    // Resize handling
}, 250));

// ===== ROYAL UTILITIES =====
// Royal date formatting
function formatRoyalDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString('en-GB', options);
}

// Royal number formatting
function formatRoyalNumber(number) {
    return new Intl.NumberFormat('en-GB').format(number);
}

// Royal currency formatting
function formatRoyalCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0
    }).format(amount);
}

// Export functions for global access
window.RoyalPortfolio = {
    formatRoyalDate,
    formatRoyalNumber,
    formatRoyalCurrency,
    showNotification
};

// Error handling
window.addEventListener('error', function(e) {
    console.error('Royal Portfolio Error:', e.error);
});

// Log initialization
console.log(`
╔══════════════════════════════════════════════════════════════╗
║                   ROYAL PORTFOLIO INITIALIZED               ║
║                                                              ║
║    🏰  Ancient Heritage Meets Modern Technology             ║
║    👑  Premium Royal Experience Activated                   ║
║    ⚔️   Ready to Serve Your Noble Needs                     ║
║                                                              ║
║    "Preserving Legacy Through Digital Excellence"           ║
╚══════════════════════════════════════════════════════════════╝
`);
