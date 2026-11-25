/**
 * Science Club Website - Main JavaScript
 * Gov. Felicisimo T. San Luis ISHS
 */

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStickyNavbar();
    initNewsFilters();
    initNewsSearch();
    initFAQ();
    initForms();
    initParticles();
    initAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Sticky Navbar with Scroll Effect
 */
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

/**
 * News Filters
 */
function initNewsFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const newsCards = document.querySelectorAll('.news-card');

    if (filterTags.length > 0 && newsCards.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Update active state
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter news cards
                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        // Fade in animation
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * News Search
 */
function initNewsSearch() {
    const searchInput = document.getElementById('newsSearch');
    const newsCards = document.querySelectorAll('.news-card');

    if (searchInput && newsCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            newsCards.forEach(card => {
                const title = card.querySelector('.news-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();

                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Form Validation and Submission
 */
function initForms() {
    // Application Form
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationSubmit);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Real-time validation
    addRealTimeValidation();
}

/**
 * Handle Application Form Submission
 */
function handleApplicationSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!validateApplicationForm(this)) {
        return;
    }

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Get all checked interests
    const interests = Array.from(this.querySelectorAll('input[name="interests"]:checked'))
        .map(cb => cb.value);
    data.interests = interests;

    // Check if at least one interest is selected
    if (interests.length === 0) {
        alert('Please select at least one science interest.');
        return;
    }

    // Simulate form submission
    console.log('Application submitted:', data);

    // Show success message
    const formContainer = document.querySelector('.form-container');
    const successMessage = document.getElementById('successMessage');
    
    if (formContainer && successMessage) {
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // In a real application, you would send this data to a server
    // Example: sendToServer(data);
}

/**
 * Validate Application Form
 */
function validateApplicationForm(form) {
    // Check required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#EF4444';
        } else {
            field.style.borderColor = '';
        }
    });

    // Validate email
    const emailField = form.querySelector('#email');
    if (emailField && !isValidEmail(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
        alert('Please enter a valid email address.');
    }

    // Validate phone
    const phoneField = form.querySelector('#phone');
    if (phoneField && !isValidPhone(phoneField.value)) {
        isValid = false;
        phoneField.style.borderColor = '#EF4444';
        alert('Please enter a valid phone number.');
    }

    // Validate "Why Join" text length
    const whyJoinField = form.querySelector('#whyJoin');
    if (whyJoinField) {
        const wordCount = whyJoinField.value.trim().split(/\s+/).length;
        if (wordCount < 50) {
            isValid = false;
            whyJoinField.style.borderColor = '#EF4444';
            alert('Please provide at least 50 words explaining why you want to join.');
        }
    }

    return isValid;
}

/**
 * Handle Contact Form Submission
 */
function handleContactSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log('Contact form submitted:', data);

    // Show success alert
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();

    // In a real application, send to server
}

/**
 * Handle Newsletter Form Submission
 */
function handleNewsletterSubmit(event) {
    event.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    console.log('Newsletter subscription:', email);

    // Show success alert
    alert('Thank you for subscribing to our newsletter!');
    this.reset();

    // In a real application, send to server
}

/**
 * Add Real-time Validation
 */
function addRealTimeValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#EF4444';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '';
                hideFieldError(this);
            }
        });
    });

    // Phone validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.style.borderColor = '#EF4444';
                showFieldError(this, 'Please enter a valid phone number');
            } else {
                this.style.borderColor = '';
                hideFieldError(this);
            }
        });
    });

    // Required field validation
    const requiredInputs = document.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#EF4444';
            } else {
                this.style.borderColor = '';
            }
        });
    });
}

/**
 * Validation Helpers
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Philippine phone format: 09XX-XXX-XXXX or similar
    const phoneRegex = /^(09|\+639)\d{9}$/;
    // Remove spaces and dashes for validation
    const cleanPhone = phone.replace(/[\s-]/g, '');
    return phoneRegex.test(cleanPhone) || /^\d{10,11}$/.test(cleanPhone);
}

function showFieldError(field, message) {
    // Remove existing error
    hideFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#EF4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Particle Animation for Hero Section
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = `rgba(79, 70, 229, ${Math.random() * 0.3 + 0.1})`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }

    // Add animation keyframes if not already defined
    if (!document.getElementById('particleAnimation')) {
        const style = document.createElement('style');
        style.id = 'particleAnimation';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Scroll Animations
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .news-card, .value-card, .officer-card, .timeline-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Load More News Articles
 */
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // In a real application, this would load more articles from a server
        alert('This would load more news articles. Feature coming soon!');
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Form Character Counter (for textareas with minimum length)
 */
const textareasWithMinLength = document.querySelectorAll('textarea[id="whyJoin"], textarea[id="contribution"]');
textareasWithMinLength.forEach(textarea => {
    const minWords = 50;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'word-counter';
    counter.style.fontSize = '0.875rem';
    counter.style.marginTop = '0.25rem';
    counter.style.color = 'var(--text-light)';
    
    textarea.parentNode.appendChild(counter);
    
    // Update counter on input
    textarea.addEventListener('input', function() {
        const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        
        counter.textContent = `${wordCount} / ${minWords} words`;
        
        if (wordCount >= minWords) {
            counter.style.color = '#10B981';
        } else {
            counter.style.color = 'var(--text-light)';
        }
    });
    
    // Trigger initial count
    textarea.dispatchEvent(new Event('input'));
});

/**
 * Auto-hide alerts after a few seconds
 */
function showTemporaryAlert(message, duration = 3000) {
    const alert = document.createElement('div');
    alert.className = 'temporary-alert';
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, duration);
}

// Add slide animations for alerts
if (!document.getElementById('alertAnimations')) {
    const style = document.createElement('style');
    style.id = 'alertAnimations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Back to Top Button (optional enhancement)
 */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initBackToTop();

/**
 * Console message for developers
 */
console.log('%c🔬 Science Club Website', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
console.log('%cGov. Felicisimo T. San Luis Integrated Senior High School', 'font-size: 14px; color: #6B7280;');
console.log('%cInterested in joining? Visit application.html', 'font-size: 12px; color: #10B981;');
