// ====================================
// Roote Botanics - Main JavaScript
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAnnouncementBar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initProductCards();
    initNewsletter();
    initCartFunctionality();
});

// ====================================
// Announcement Bar
// ====================================
function initAnnouncementBar() {
    const announcementBar = document.querySelector('.announcement-bar');
    const closeBtn = document.querySelector('.close-announcement');
    
    if (closeBtn && announcementBar) {
        closeBtn.addEventListener('click', function() {
            announcementBar.style.transform = 'translateY(-100%)';
            announcementBar.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                announcementBar.style.display = 'none';
            }, 300);
            
            // Store in session storage
            sessionStorage.setItem('announcementClosed', 'true');
        });
        
        // Check if announcement was previously closed
        if (sessionStorage.getItem('announcementClosed') === 'true') {
            announcementBar.style.display = 'none';
        }
    }
}

// ====================================
// Mobile Menu
// ====================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = '';
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ====================================
// Scroll Reveal Animation
// ====================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.product-card, .banner, .about-section, .section-header');
    
    function reveal() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Check on page load
}

// ====================================
// Smooth Scroll
// ====================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ====================================
// Product Cards Interaction
// ====================================
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const quickAddButtons = document.querySelectorAll('.quick-add');
    
    // Quick add button click
    quickAddButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            
            // Animation feedback
            this.textContent = 'Added!';
            this.style.backgroundColor = '#2d4a3e';
            this.style.color = '#fff';
            
            // Update cart count
            updateCartCount(1);
            
            // Show notification
            showNotification(`${productName} added to cart!`);
            
            // Reset button after delay
            setTimeout(() => {
                this.textContent = 'Quick Add';
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
        });
    });
    
    // Product card click (navigate to product page)
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('quick-add')) {
                // In a real implementation, this would navigate to product page
                console.log('Navigate to product page');
            }
        });
    });
}

// ====================================
// Cart Functionality
// ====================================
let cartCount = 0;

function initCartFunctionality() {
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open a cart drawer
            showNotification('Cart functionality coming soon!');
        });
    }
}

function updateCartCount(amount) {
    cartCount += amount;
    const cartCountElement = document.querySelector('.cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Add bounce animation
        cartCountElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// ====================================
// Newsletter Form
// ====================================
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // In a real implementation, this would send to a server
                showNotification('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ====================================
// Notification System
// ====================================
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #2d4a3e;
        color: white;
        padding: 18px 25px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease;
        font-size: 14px;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Append to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    closeBtn.addEventListener('click', () => removeNotification(notification));
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    
    // Auto remove after 4 seconds
    setTimeout(() => removeNotification(notification), 4000);
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }
}

// ====================================
// Header Scroll Effect
// ====================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ====================================
// Image Lazy Loading
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ====================================
// Parallax Effect (subtle)
// ====================================
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }
});

// ====================================
// Instagram Hover Effect Enhancement
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    const instagramItems = document.querySelectorAll('.instagram-item');
    
    instagramItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});
