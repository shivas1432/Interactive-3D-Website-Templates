/**
 * Advanced Tire Slider Animation System
 * Recreates SliderRevolution-style animations
 */

class TireSliderAnimation {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.isAnimating = false;
        this.autoPlayTimer = null;
        this.autoPlayDelay = 5000;
        
        this.slides = document.querySelectorAll('.slide');
        this.paginationDots = document.querySelectorAll('.pagination-dot');
        this.slideCounter = document.querySelector('.counter-current');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimationStyles();
        this.startAutoPlay();
        this.initializeFirstSlide();
    }

    setupAnimationStyles() {
        // Add dynamic CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .slide {
                transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                           visibility 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Content Animation Classes */
            .animate-in {
                animation-fill-mode: forwards;
            }
            
            .animate-out {
                animation-fill-mode: forwards;
            }
            
            /* Slide In Animations */
            @keyframes slideInLeft {
                from {
                    transform: translateX(-1690px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(1690px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            @keyframes scaleIn {
                from {
                    transform: scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes rotateIn {
                from {
                    transform: rotate(180deg) translateX(1060px);
                    opacity: 0;
                }
                to {
                    transform: rotate(0deg) translateX(0);
                    opacity: 1;
                }
            }
            
            /* Slide Out Animations */
            @keyframes slideOutLeft {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-1690px);
                    opacity: 0;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(1690px);
                    opacity: 0;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
            
            @keyframes scaleOut {
                from {
                    transform: scale(1);
                    opacity: 1;
                }
                to {
                    transform: scale(0.9);
                    opacity: 0;
                }
            }
            
            @keyframes rotateOut {
                from {
                    transform: rotate(0deg) translateX(0);
                    opacity: 1;
                }
                to {
                    transform: rotate(-180deg) translateX(-1060px);
                    opacity: 0;
                }
            }
            
            /* Tire Showcase Animations */
            @keyframes tireRotateIn {
                from {
                    transform: translateX(1060px) rotate(180deg);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) rotate(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes tireRotateOut {
                from {
                    transform: translateX(0) rotate(0deg);
                    opacity: 1;
                }
                to {
                    transform: translateX(-1060px) rotate(-180deg);
                    opacity: 0;
                }
            }
            
            /* Shadow Animations */
            @keyframes shadowFadeIn {
                from {
                    opacity: 0;
                    filter: blur(0px);
                }
                to {
                    opacity: 1;
                    filter: blur(5px);
                }
            }
            
            /* Background Overlay Animations */
            @keyframes overlayFadeIn {
                from {
                    opacity: 0;
                    backdrop-filter: blur(0px);
                }
                to {
                    opacity: 1;
                    backdrop-filter: blur(5px);
                }
            }
            
            /* Season Toggle Animation */
            .season-indicator {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Tire Hover Effects */
            .tire-showcase:hover .tire-container {
                transform: scale(1.05) rotate(5deg);
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .tire-container {
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Button Hover Effects */
            .cta-button {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(255, 78, 0, 0.3);
                background: #e04400;
            }
            
            /* Navigation Button Effects */
            .nav-btn, .social-link {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .nav-btn:hover {
                color: rgba(255, 255, 255, 0.9);
                transform: translateY(-1px);
            }
            
            .social-link:hover {
                color: rgba(255, 255, 255, 0.9);
                border-color: rgba(255, 255, 255, 0.3);
                transform: translateY(-1px);
            }
            
            /* Pagination Dots Animation */
            .pagination-dot {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .pagination-dot:hover {
                transform: scale(1.2);
            }
            
            .pagination-dot.active {
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Navigation buttons
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        
        // Pagination dots
        this.paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Pause autoplay on hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer?.addEventListener('mouseenter', () => this.stopAutoPlay());
        sliderContainer?.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Season toggle functionality
        this.setupSeasonToggles();
        
        // Touch/Swipe support
        this.setupTouchEvents();
    }

    setupSeasonToggles() {
        document.querySelectorAll('.season-toggle').forEach(toggle => {
            const indicator = toggle.querySelector('.season-indicator');
            const options = toggle.querySelectorAll('.season-option');
            
            options.forEach((option, index) => {
                option.addEventListener('click', () => {
                    const offsetX = index * 48;
                    indicator.style.transform = `translateX(${offsetX}px)`;
                    
                    // Animate tire change (summer/winter)
                    this.animateSeasonChange(index);
                });
            });
        });
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const slider = document.querySelector('.slider-container');
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        }, { passive: true });
    }

    animateSeasonChange(seasonIndex) {
        const currentSlideEl = this.slides[this.currentSlide];
        const summerTire = currentSlideEl.querySelector('.summer-tire');
        const winterTire = currentSlideEl.querySelector('.winter-tire');
        
        if (seasonIndex === 0) {
            // Summer tire
            winterTire.style.opacity = '0';
            summerTire.style.opacity = '1';
        } else {
            // Winter tire
            summerTire.style.opacity = '0';
            winterTire.style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.isAnimating) return;
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        if (this.isAnimating) return;
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        const currentSlideEl = this.slides[this.currentSlide];
        const nextSlideEl = this.slides[index];
        
        // Determine animation direction
        const isForward = index > this.currentSlide || (this.currentSlide === this.totalSlides - 1 && index === 0);
        
        // Animate out current slide
        this.animateSlideOut(currentSlideEl, isForward);
        
        // Animate in next slide
        setTimeout(() => {
            this.animateSlideIn(nextSlideEl, isForward);
            this.updateUI(index);
        }, 100);
        
        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 1200);
    }

    animateSlideOut(slideEl, isForward) {
        slideEl.classList.remove('active');
        
        // Animate content elements out
        const contentLeft = slideEl.querySelector('.content-left');
        const contentRight = slideEl.querySelector('.content-right');
        const tireShowcase = slideEl.querySelector('.tire-showcase');
        
        if (contentLeft) {
            contentLeft.style.animation = isForward ? 
                'slideOutLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                'slideOutRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }
        
        if (contentRight) {
            contentRight.style.animation = 'fadeOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }
        
        if (tireShowcase) {
            tireShowcase.style.animation = isForward ?
                'tireRotateOut 1s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                'tireRotateIn 1s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
        }
    }

    animateSlideIn(slideEl, isForward) {
        slideEl.classList.add('active');
        
        // Reset and animate content elements in
        const contentLeft = slideEl.querySelector('.content-left');
        const contentRight = slideEl.querySelector('.content-right');
        const tireShowcase = slideEl.querySelector('.tire-showcase');
        const tagline = slideEl.querySelector('.product-tagline');
        const title = slideEl.querySelector('.product-title');
        const description = slideEl.querySelector('.product-description');
        
        // Reset styles
        [contentLeft, contentRight, tireShowcase].forEach(el => {
            if (el) el.style.animation = '';
        });
        
        // Animate content in with staggered timing
        setTimeout(() => {
            if (contentLeft) {
                contentLeft.style.animation = isForward ?
                    'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                    'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        }, 200);
        
        setTimeout(() => {
            if (tagline) {
                tagline.style.animation = 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        }, 400);
        
        setTimeout(() => {
            if (title) {
                title.style.animation = 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        }, 500);
        
        setTimeout(() => {
            if (description) {
                description.style.animation = 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        }, 700);
        
        setTimeout(() => {
            if (contentRight) {
                contentRight.style.animation = 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        }, 300);
        
        setTimeout(() => {
            if (tireShowcase) {
                tireShowcase.style.animation = isForward ?
                    'tireRotateIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                    'tireRotateOut 1s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
            }
        }, 600);
        
        // Animate individual spec items
        setTimeout(() => {
            this.animateSpecItems(slideEl);
        }, 800);
    }

    animateSpecItems(slideEl) {
        const specItems = slideEl.querySelectorAll('.size-option, .spec-item, .price-section');
        
        specItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }, index * 100);
        });
    }

    updateUI(index) {
        // Update pagination dots
        this.paginationDots.forEach(dot => dot.classList.remove('active'));
        this.paginationDots[index]?.classList.add('active');
        
        // Update slide counter
        this.slideCounter.textContent = String(index + 1).padStart(2, '0');
        
        this.currentSlide = index;
    }

    initializeFirstSlide() {
        // Set initial state for first slide
        this.updateUI(0);
        const firstSlide = this.slides[0];
        if (firstSlide) {
            firstSlide.classList.add('active');
            this.animateSlideIn(firstSlide, true);
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    // Public methods for external control
    play() {
        this.startAutoPlay();
    }

    pause() {
        this.stopAutoPlay();
    }

    destroy() {
        this.stopAutoPlay();
        // Remove event listeners and clean up
        this.slides.forEach(slide => {
            slide.style.animation = '';
        });
    }
}

// Additional utility functions for enhanced animations

class AnimationEffects {
    static createParticleEffect(element) {
        // Create particle animation for tire rotation
        const particles = document.createElement('div');
        particles.className = 'tire-particles';
        particles.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(252, 77, 0, 0.7);
                border-radius: 50%;
                animation: particle-float 2s infinite linear;
                animation-delay: ${i * 0.1}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particles.appendChild(particle);
        }
        
        element.appendChild(particles);
        
        // Remove particles after animation
        setTimeout(() => {
            particles.remove();
        }, 2000);
    }

    static addPulseEffect(element) {
        element.style.animation = 'pulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite';
    }

    static addGlowEffect(element) {
        element.style.boxShadow = '0 0 20px rgba(252, 77, 0, 0.5)';
        element.style.transition = 'box-shadow 0.3s ease';
    }
}

// Advanced CSS animations for particles and effects
const additionalStyles = `
    @keyframes particle-float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(252, 77, 0, 0.5);
        }
        50% {
            box-shadow: 0 0 25px rgba(252, 77, 0, 0.8);
        }
    }
`;

// Add additional styles
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalStyles;
document.head.appendChild(additionalStyleSheet);

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tireSlider = new TireSliderAnimation();
    
    // Add special effects to CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            AnimationEffects.addGlowEffect(button);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });
    
    // Add particle effects on tire hover
    document.querySelectorAll('.tire-showcase').forEach(showcase => {
        showcase.addEventListener('mouseenter', () => {
            AnimationEffects.createParticleEffect(showcase);
        });
    });
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TireSliderAnimation, AnimationEffects };
}