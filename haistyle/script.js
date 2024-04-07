/**
 * Travel Portal Hero Slider - Simplified Version
 * No dependencies on Slider Revolution libraries
 */

// Global variables for slider state
let currentSlideIndex = 2; // Start with slide 3 (index 2) as it's the active one
let autoSlideInterval;
let isTransitioning = false;

/**
 * Initialize Portal Gate Click Handlers
 * Main navigation method - clicking portal gates switches slides
 */
function initPortalGateClickHandler() {
    const gateImages = document.querySelectorAll('.portal-gate');
    console.log('Found portal gates:', gateImages.length);
    
    gateImages.forEach((gate, index) => {
        gate.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isTransitioning) return;
            
            console.log('Portal gate clicked!');
            
            const currentSlide = gate.closest('sr7-slide');
            const allSlides = document.querySelectorAll('sr7-slide:not(.sr7-staticslide)');
            const currentIndex = Array.from(allSlides).indexOf(currentSlide);
            const nextIndex = (currentIndex + 1) % allSlides.length;
            
            switchToSlide(currentIndex, nextIndex);
        });
        
        // Add hover effects
        gate.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(600px) scale(1.1, 1.1)';
            this.style.filter = 'brightness(1.2)';
        });
        
        gate.addEventListener('mouseleave', function() {
            if (this.closest('sr7-slide').style.display === 'block') {
                this.style.transform = 'perspective(600px) scale(1, 1)';
                this.style.filter = 'brightness(1)';
            }
        });
    });
}

/**
 * Switch between slides with portal transition effects
 */
function switchToSlide(fromIndex, toIndex) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const allSlides = document.querySelectorAll('sr7-slide:not(.sr7-staticslide)');
    const currentSlide = allSlides[fromIndex];
    const nextSlide = allSlides[toIndex];
    
    console.log(`Switching from slide ${fromIndex} to slide ${toIndex}`);
    
    // Start transition effects
    addTransitionEffects(currentSlide, nextSlide, () => {
        // Hide current slide
        currentSlide.style.display = 'none';
        currentSlide.style.visibility = 'hidden';
        currentSlide.style.pointerEvents = 'none';
        currentSlide.style.zIndex = '1';
        
        // Show next slide
        nextSlide.style.display = 'block';
        nextSlide.style.visibility = 'visible';
        nextSlide.style.pointerEvents = 'auto';
        nextSlide.style.zIndex = '5';
        
        // Update global state
        currentSlideIndex = toIndex;
        
        // Update bullets
        updateBullets(toIndex);
        
        // Re-enable interactions after transition
        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    });
}

/**
 * Update navigation bullets to show active slide
 */
function updateBullets(activeIndex) {
    const bullets = document.querySelectorAll('sr7-bullet');
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle('selected', index === activeIndex);
    });
}

/**
 * Add portal transition effects between slides
 */
function addTransitionEffects(currentSlide, nextSlide, callback) {
    // Portal gate effects
    const currentGate = currentSlide.querySelector('.portal-gate');
    const nextGate = nextSlide.querySelector('.portal-gate');
    
    // Animate current gate (closing portal effect)
    if (currentGate) {
        currentGate.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        currentGate.style.transform = 'perspective(600px) scale(8, 8)';
        currentGate.style.filter = 'blur(20px)';
        currentGate.style.opacity = '0';
    }
    
    // Text fade out animation
    const currentTexts = currentSlide.querySelectorAll('sr7-txt');
    currentTexts.forEach((text, index) => {
        text.style.transition = 'all 0.6s ease';
        text.style.opacity = '0';
        text.style.transform = 'translate(0px, -50px)';
    });
    
    // Wait for fade out, then show next slide
    setTimeout(() => {
        callback();
        
        // Animate next gate (opening portal effect)
        if (nextGate) {
            nextGate.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            nextGate.style.transform = 'perspective(600px) scale(1, 1)';
            nextGate.style.filter = 'blur(0px)';
            nextGate.style.opacity = '1';
        }
        
        // Text fade in animation with stagger
        const nextTexts = nextSlide.querySelectorAll('sr7-txt');
        nextTexts.forEach((text, index) => {
            text.style.opacity = '0';
            text.style.transform = 'translate(0px, 50px)';
            
            setTimeout(() => {
                text.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                text.style.opacity = '1';
                text.style.transform = 'translate(0px, 0px)';
            }, index * 150 + 200);
        });
        
    }, 600);
}

/**
 * Initialize video backgrounds with autoplay
 */
function initVideoBackgrounds() {
    const videos = document.querySelectorAll('video');
    console.log('Found videos:', videos.length);
    
    videos.forEach((video, index) => {
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        
        // Ensure video plays
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(e => {
                console.log(`Video ${index + 1} autoplay failed:`, e);
                // Fallback: try to play on user interaction
                document.addEventListener('click', () => {
                    video.play().catch(console.log);
                }, { once: true });
            });
        });
        
        // Handle video errors
        video.addEventListener('error', (e) => {
            console.log(`Video ${index + 1} error:`, e);
        });
    });
}

/**
 * Initialize parallax mouse effect
 */
function initParallaxEffect() {
    let mouseX = 0, mouseY = 0;
    let isMouseEffectEnabled = true;
    
    document.addEventListener('mousemove', (e) => {
        if (!isMouseEffectEnabled) return;
        
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        
        const activeSlide = document.querySelector('sr7-slide[style*="display: block"]:not(.sr7-staticslide)');
        if (activeSlide) {
            const layers = activeSlide.querySelectorAll('.sr7-layer');
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 0.5;
                const x = mouseX * depth;
                const y = mouseY * depth;
                layer.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    });
    
    // Disable mouse effect on mobile
    if (window.innerWidth <= 768) {
        isMouseEffectEnabled = false;
    }
    
    window.addEventListener('resize', () => {
        isMouseEffectEnabled = window.innerWidth > 768;
    });
}

/**
 * Initialize auto-slide functionality
 */
function initAutoSlide() {
    const SLIDE_DURATION = 7000; // 7 seconds per slide
    
    function nextSlide() {
        if (isTransitioning) return;
        
        const allSlides = document.querySelectorAll('sr7-slide:not(.sr7-staticslide)');
        const nextIndex = (currentSlideIndex + 1) % allSlides.length;
        
        switchToSlide(currentSlideIndex, nextIndex);
    }
    
    // Start auto-slide
    autoSlideInterval = setInterval(nextSlide, SLIDE_DURATION);
    
    // Pause auto-slide on user interaction
    document.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        setTimeout(() => {
            autoSlideInterval = setInterval(nextSlide, SLIDE_DURATION);
        }, 10000); // Resume after 10 seconds
    });
}

/**
 * Initialize bullet navigation
 */
function initBulletNavigation() {
    const bullets = document.querySelectorAll('sr7-bullet');
    const allSlides = document.querySelectorAll('sr7-slide:not(.sr7-staticslide)');
    
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (isTransitioning || index === currentSlideIndex) return;
            
            console.log(`Bullet ${index + 1} clicked`);
            switchToSlide(currentSlideIndex, index);
        });
        
        // Add hover effects
        bullet.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.background = 'rgba(243, 204, 19, 0.7)';
                this.style.transform = 'scale(1.1)';
            }
        });
        
        bullet.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.background = 'rgba(255, 255, 255, 0.3)';
                this.style.transform = 'scale(1)';
            }
        });
    });
}

/**
 * Initialize social media and navigation links
 */
function initNavigationLinks() {
    // Social media links
    const socialLinks = document.querySelectorAll('#SR7_1604_1-3931-16, #SR7_1604_1-3931-17, #SR7_1604_1-3931-18');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(243, 204, 19, 0.2)';
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 0, 0, 0)';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Get in Touch link
    const touchLink = document.querySelector('#SR7_1604_1-3931-20');
    if (touchLink) {
        touchLink.addEventListener('mouseenter', function() {
            this.style.color = 'rgb(243, 204, 19)';
            this.style.transform = 'translateY(-2px)';
        });
        
        touchLink.addEventListener('mouseleave', function() {
            this.style.color = 'rgb(255, 255, 255)';
            this.style.transform = 'translateY(0px)';
        });
    }
    
    // Logo hover effect
    const logo = document.querySelector('#SR7_1604_1-3931-25');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(600px) rotateY(10deg) scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(600px) rotateY(0deg) scale(1)';
        });
    }
}

/**
 * Handle keyboard navigation
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        
        const allSlides = document.querySelectorAll('sr7-slide:not(.sr7-staticslide)');
        let targetIndex = currentSlideIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                targetIndex = (currentSlideIndex - 1 + allSlides.length) % allSlides.length;
                break;
            case 'ArrowRight':
            case ' ': // Spacebar
                e.preventDefault();
                targetIndex = (currentSlideIndex + 1) % allSlides.length;
                break;
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                targetIndex = allSlides.length - 1;
                break;
            default:
                // Number keys 1-4
                if (e.key >= '1' && e.key <= '4') {
                    e.preventDefault();
                    targetIndex = parseInt(e.key) - 1;
                }
                break;
        }
        
        if (targetIndex !== currentSlideIndex) {
            switchToSlide(currentSlideIndex, targetIndex);
        }
    });
}

/**
 * Handle window resize events
 */
function initResponsiveHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate video dimensions
            const activeSlide = document.querySelector('sr7-slide[style*="display: block"]:not(.sr7-staticslide)');
            if (activeSlide) {
                const videos = activeSlide.querySelectorAll('video');
                videos.forEach(video => {
                    video.style.width = '100%';
                    video.style.height = '100%';
                });
            }
            
            // Adjust bullet positioning on mobile
            const bullets = document.querySelector('sr7-bullets');
            if (bullets && window.innerWidth <= 768) {
                bullets.style.left = '20px';
                bullets.style.bottom = '20px';
            } else if (bullets) {
                bullets.style.left = '60px';
                bullets.style.bottom = '65px';
            }
        }, 250);
    });
}

/**
 * Initialize loading screen and ensure content visibility
 */
function initLoadingScreen() {
    const slider = document.querySelector('#SR7_1604_1');
    if (slider) {
        slider.style.opacity = '1';
        slider.style.display = 'block';
        slider.style.visibility = 'visible';
    }

    // Ensure the active slide is visible
    const activeSlide = document.querySelector('sr7-slide[data-key="2494"]');
    if (activeSlide) {
        activeSlide.style.display = 'block';
        activeSlide.style.visibility = 'visible';
        activeSlide.style.opacity = '1';
        activeSlide.style.zIndex = '5';
        
        // Make sure all text elements in active slide are visible
        const texts = activeSlide.querySelectorAll('sr7-txt');
        texts.forEach(text => {
            text.style.opacity = '1';
            text.style.visibility = 'visible';
            text.style.display = 'block';
        });

        // Make sure the portal gate is visible
        const gate = activeSlide.querySelector('.portal-gate');
        if (gate) {
            gate.style.opacity = '1';
            gate.style.visibility = 'visible';
            gate.style.display = 'block';
        }
    }

    // Ensure static slide (navigation) is visible
    const staticSlide = document.querySelector('.sr7-staticslide');
    if (staticSlide) {
        staticSlide.style.display = 'block';
        staticSlide.style.visibility = 'visible';
        staticSlide.style.opacity = '1';
        staticSlide.style.zIndex = '1000';
    }

    // Make bullets visible
    const bullets = document.querySelector('sr7-bullets');
    if (bullets) {
        bullets.style.display = 'flex';
        bullets.style.visibility = 'visible';
        bullets.style.opacity = '1';
    }
}

/**
 * Main initialization function
 * Called when DOM is fully loaded
 */
function initTravelPortalSlider() {
    console.log('🌟 Initializing Travel Portal Hero Slider...');
    
    // First, ensure content is visible
    initLoadingScreen();
    
    // Initialize all components
    initVideoBackgrounds();
    initPortalGateClickHandler();
    initParallaxEffect();
    initBulletNavigation();
    initNavigationLinks();
    initKeyboardNavigation();
    initResponsiveHandler();
    
    // Force initial slide visibility
    setTimeout(() => {
        const allSlides = document.querySelectorAll('sr7-slide:not(.sr7-staticslide)');
        allSlides.forEach((slide, index) => {
            if (index === 2) { // Active slide (index 2)
                slide.style.display = 'block';
                slide.style.visibility = 'visible';
                slide.style.opacity = '1';
                slide.style.zIndex = '5';
                slide.style.pointerEvents = 'auto';
                
                // Show all content in active slide
                const elements = slide.querySelectorAll('sr7-txt, sr7-img, .portal-gate');
                elements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.style.display = 'block';
                });
            } else {
                slide.style.display = 'none';
                slide.style.visibility = 'hidden';
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
                slide.style.pointerEvents = 'none';
            }
        });
        
        // Update bullets to show correct active state
        updateBullets(2);
        
        console.log('🎯 Forced slide visibility applied');
    }, 100);
    
    // Start auto-slide after initial delay
    setTimeout(() => {
        initAutoSlide();
        console.log('🚀 Auto-slide activated');
    }, 3000);
    
    console.log('✅ Travel Portal Hero Slider initialized successfully!');
    console.log('🎮 Controls: Click portal gates, use bullets, arrow keys, or numbers 1-4');
}

/**
 * DOM Content Loaded Event Listener
 */
document.addEventListener('DOMContentLoaded', initTravelPortalSlider);

/**
 * Fallback initialization for delayed DOM loading
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTravelPortalSlider);
} else {
    initTravelPortalSlider();
}

/**
 * Export functions for external access (optional)
 */
window.TravelPortalSlider = {
    switchToSlide: (index) => {
        const allSlides = document.querySelectorAll('sr7-slide:not(.sr7-staticslide)');
        if (index >= 0 && index < allSlides.length && index !== currentSlideIndex) {
            switchToSlide(currentSlideIndex, index);
        }
    },
    getCurrentSlide: () => currentSlideIndex,
    pauseAutoSlide: () => clearInterval(autoSlideInterval),
    resumeAutoSlide: () => {
        clearInterval(autoSlideInterval);
        initAutoSlide();
    },
    getSlideCount: () => document.querySelectorAll('sr7-slide:not(.sr7-staticslide)').length
};