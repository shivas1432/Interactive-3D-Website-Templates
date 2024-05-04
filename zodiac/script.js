// Performance optimized 3D code
// Horoscope Slider with Zodiac Showcase - JavaScript
// Based on Slider Revolution SR7 implementation

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// SR7-style module configuration
const SR7_Config = {
    alias: "Horoscope-Slider-with-Zodiac-Showcase",
    id: "1506",
    version: "6.7.35",
    settings: {
        migrated: "5.0",
        addons: {
            mousetrap: { u: true },
            thecluster: { u: true },
            transitionpack: { u: true }
        },
        size: false,
        title: "Horoscope Slider with Zodiac Showcase"
    }
};

// Initialize stars background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Update slide counter (SR7 style)
function updateSlideCounter() {
    const counter = document.querySelector('.current-slide');
    counter.textContent = String(currentSlide + 1).padStart(2, '0');
}

// SR7-style slide transition
function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    currentSlide = index;
    updateSlideCounter();
    
    // Trigger custom animation events
    triggerSlideAnimation(index);
}

// SR7-style animation triggers
function triggerSlideAnimation(slideIndex) {
    const activeSlide = slides[slideIndex];
    const elements = activeSlide.querySelectorAll('.title-the, .title-main, .description, .zodiac-card');
    
    elements.forEach((el, i) => {
        el.style.transform = 'translateY(50px)';
        el.style.opacity = '0';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease-out';
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
        }, i * 150 + 500);
    });
}

// Navigation functions
function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        showSlide(index);
    }
    toggleZodiacMenu(); // Close menu after selection
}

// Zodiac menu toggle
function toggleZodiacMenu() {
    const menu = document.getElementById('zodiacMenu');
    const menuIcon = document.querySelector('.menu-icon');
    
    menu.classList.toggle('active');
    
    // Animate menu icon
    if (menu.classList.contains('active')) {
        menuIcon.style.transform = 'rotate(45deg)';
    } else {
        menuIcon.style.transform = 'rotate(0deg)';
    }
}

// Auto-advance functionality
let autoSlideInterval = setInterval(nextSlide, 6000);

// Pause/resume auto-advance
function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resumeAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
}

// Mouse interaction handlers
document.querySelector('.horoscope-container')?.addEventListener('mouseenter', pauseAutoSlide);
document.querySelector('.horoscope-container')?.addEventListener('mouseleave', resumeAutoSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            previousSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case 'Escape':
            const menu = document.getElementById('zodiacMenu');
            menu?.classList.remove('active');
            break;
        case ' ': // Spacebar
            e.preventDefault();
            nextSlide();
            break;
    }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeRestraint = 100;
    const differenceX = touchStartX - touchEndX;
    const differenceY = Math.abs(touchStartY - touchEndY);
    
    // Only trigger if horizontal swipe is greater than vertical
    if (Math.abs(differenceX) > swipeThreshold && differenceY < swipeRestraint) {
        if (differenceX > 0) {
            nextSlide(); // Swipe left - next slide
        } else {
            previousSlide(); // Swipe right - previous slide
        }
    }
}

// Click outside menu to close
document.addEventListener('click', (e) => {
    const menu = document.getElementById('zodiacMenu');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menu?.classList.contains('active') && 
        !menu.contains(e.target) && 
        !menuIcon?.contains(e.target)) {
        menu.classList.remove('active');
        if (menuIcon) {
            menuIcon.style.transform = 'rotate(0deg)';
        }
    }
});

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Preload images for smooth transitions
function preloadImages() {
    const imageUrls = [
        'https://www.sliderrevolution.com/wp-content/uploads/revslider/Horoscope-Slider-with-Zodiac-Showcase/aries-bg-3.jpg',
        'https://www.sliderrevolution.com/wp-content/uploads/revslider/Horoscope-Slider-with-Zodiac-Showcase/taurus-bg2.jpg',
        'https://www.sliderrevolution.com/wp-content/uploads/revslider/Horoscope-Slider-with-Zodiac-Showcase/gemini-bg2.jpg',
        'https://www.sliderrevolution.com/wp-content/uploads/revslider/Horoscope-Slider-with-Zodiac-Showcase/cancer-bg3.jpg',
        'https://www.sliderrevolution.com/wp-content/uploads/revslider/Horoscope-Slider-with-Zodiac-Showcase/leo-bg2.jpg',
        'https://www.sliderrevolution.com/wp-content/uploads/revslider/Horoscope-Slider-with-Zodiac-Showcase/virgo-bg-2.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Enhanced animation effects (removed glow circle references)
function animateElements() {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
        const elements = activeSlide.querySelectorAll('.title-the, .title-main, .description, .zodiac-card');
        
        elements.forEach((el, i) => {
            el.style.transform = 'translateY(50px)';
            el.style.opacity = '0';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease-out';
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }, i * 150 + 500);
        });
    }
}

// Responsive handling
function handleResize() {
    const container = document.querySelector('.horoscope-container');
    if (container) {
        container.style.height = window.innerHeight + 'px';
    }
    
    // Recalculate positions on mobile
    const zodiacCards = document.querySelectorAll('.zodiac-card');
    zodiacCards.forEach(card => {
        if (window.innerWidth < 768) {
            card.style.width = '300px';
            card.style.height = '300px';
        } else {
            card.style.width = '450px';
            card.style.height = '450px';
        }
    });
}

window.addEventListener('resize', handleResize);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create initial effects
    createStars();
    updateSlideCounter();
    preloadImages();
    
    // Set initial state
    showSlide(0);
    
    // Handle resize
    handleResize();
    
    // Observe slides for performance
    slides.forEach(slide => {
        slideObserver.observe(slide);
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add loading class removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    console.log('ðŸŒŸ Horoscope Slider initialized with SR7 configuration');
});

// Export functions for global access
window.HoroscopeSlider = {
    nextSlide,
    previousSlide,
    goToSlide,
    toggleZodiacMenu,
    pauseAutoSlide,
    resumeAutoSlide,
    currentSlide: () => currentSlide,
    totalSlides: () => totalSlides
};
