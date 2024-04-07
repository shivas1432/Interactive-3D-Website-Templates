

class ChristmasSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.particles = [];
        this.settings = {
            autoPlay: true,
            autoPlayDelay: 4000,
            transitionDuration: 1000,
            particleCount: 50,
            particleSpeed: 2,
            enableParallax: true,
            enableBlur: true
        };
        
        this.slides = [
            {
                id: 4480,
                title: "Find Your<br>Festive Balance",
                description: "Even Santa takes a moment to breathe this season. Unwrap new ways to bring harmony, health, and holiday spirit into your life.",
                button: "Find Your Flow",
                number: "01",
                bgImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/sl-bg-2.jpg",
                mainImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/2santa-yoga.png",
                animations: {
                    title: { from: "left", duration: 800, delay: 300 },
                    description: { from: "bottom", duration: 600, delay: 500 },
                    button: { from: "right", duration: 500, delay: 700 },
                    mainImage: { scale: 1.02, duration: 1200, delay: 0 }
                }
            },
            {
                id: 4481,
                title: "Celebrate<br> in a New Reality",
                description: "Santa's gone virtual, and so can you—dive into a world of festive innovation and joy.",
                button: "Explore the Magic",
                number: "02",
                bgImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/sl-bg-1.jpg",
                mainImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/santa-1.png",
                animations: {
                    title: { from: "right", duration: 800, delay: 300 },
                    description: { from: "left", duration: 600, delay: 500 },
                    button: { from: "bottom", duration: 500, delay: 700 },
                    mainImage: { scale: 1.03, blur: 50, duration: 1200, delay: 0 }
                }
            },
            {
                id: 4482,
                title: "Drop Into New<br>Holiday Adventures",
                description: "From unexpected thrills to timeless traditions, discover fresh ways to celebrate this season.",
                button: "Take the Leap",
                number: "03",
                bgImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/sl-bg-3.jpg",
                mainImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/santa-air.png",
                animations: {
                    title: { from: "top", duration: 800, delay: 300 },
                    description: { from: "right", duration: 600, delay: 500 },
                    button: { from: "left", duration: 500, delay: 700 },
                    mainImage: { float: true, scale: 1.02, duration: 1200, delay: 0 }
                }
            },
            {
                id: 4483,
                title: "Roll Into a<br> Season of Joy",
                description: "From old traditions to new adventures, celebrate the holidays at your own speed.",
                button: "Catch the Spirit",
                number: "04",
                bgImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/sl-bg-5.jpg",
                mainImage: "https://www.sliderrevolution.com/wp-content/uploads/revslider/Festive-Christmas-Slider-with-Particle-Snow-Effect/santa-skate.png",
                animations: {
                    title: { from: "bottom", duration: 800, delay: 300 },
                    description: { from: "top", duration: 600, delay: 500 },
                    button: { from: "right", duration: 500, delay: 700 },
                    mainImage: { slideX: 845, scale: 1.02, duration: 1200, delay: 0 }
                }
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createSliderHTML();
        this.initParticles();
        this.bindEvents();
        this.startAutoPlay();
        this.showSlide(0);
        this.initParallax();
    }
    
    createSliderHTML() {
        const container = document.querySelector('.slider-container') || document.body;
        
        // Create main slider structure
        container.innerHTML = `
            <div class="sr7-module" id="SR7_1934_1">
                <div class="sr7-content">
                    ${this.slides.map((slide, index) => `
                        <div class="sr7-slide" id="SR7_1934_1-${slide.id}" data-key="${slide.id}" data-index="${index}">
                            <div class="sr7-mask slide-bg">
                                <div class="sr7-bg" style="background-image: url('${slide.bgImage}')"></div>
                            </div>
                            <div class="sr7-img main-image" data-bg="${slide.mainImage}"></div>
                            <div class="sr7-zone content-zone">
                                <div class="sr7-row nav-row">
                                    <div class="sr7-col title-col">
                                        <div class="sr7-txt slide-title">${slide.title}</div>
                                    </div>
                                    <div class="sr7-col nav-col">
                                        <span class="nav-prev">prev</span>
                                        <span class="nav-separator">/</span>
                                        <span class="nav-next">next</span>
                                    </div>
                                </div>
                                <div class="sr7-row content-row">
                                    <div class="content-container">
                                        <div class="content-left">
                                            <div class="slide-number">${slide.number}</div>
                                            <div class="slide-description">${slide.description}</div>
                                        </div>
                                        <div class="content-right">
                                            <a href="#" class="cta-button">${slide.button}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <canvas class="particle-canvas"></canvas>
                        </div>
                    `).join('')}
                    <canvas class="snow-canvas" id="snow-canvas"></canvas>
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        this.addAdvancedStyles();
    }
    
    addAdvancedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .sr7-module {
                position: relative;
                width: 100%;
                height: 100vh;
                overflow: hidden;
                background: #0c0c0c;
                font-family: 'Urbanist', sans-serif;
            }
            
            .sr7-slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                visibility: hidden;
                transform: scale(1.1);
                transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .sr7-slide.active {
                opacity: 1;
                visibility: visible;
                transform: scale(1);
            }
            
            .sr7-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 120%;
                height: 120%;
                background-size: cover;
                background-position: center;
                transform: scale(1);
                transition: transform 8s ease-out;
                filter: brightness(0.7);
            }
            
            .sr7-slide.active .sr7-bg {
                transform: scale(1.05);
            }
            
            .main-image {
                position: absolute;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: 0;
                transform: scale(1.2) translateY(50px);
                transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .sr7-slide.active .main-image {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            
            .slide-title {
                font-size: 60px;
                font-weight: 700;
                color: white;
                line-height: 65px;
                opacity: 0;
                transform: translateX(-100px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .sr7-slide.active .slide-title {
                opacity: 1;
                transform: translateX(0);
                transition-delay: 0.3s;
            }
            
            .slide-description {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.75);
                line-height: 26px;
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .sr7-slide.active .slide-description {
                opacity: 1;
                transform: translateY(0);
                transition-delay: 0.5s;
            }
            
            .cta-button {
                display: inline-block;
                padding: 0 29px;
                line-height: 57px;
                background: linear-gradient(305deg, #ad2727 0%, #ff286c 100%);
                border-radius: 50px;
                color: white;
                text-decoration: none;
                font-weight: 800;
                text-transform: uppercase;
                opacity: 0;
                transform: scale(0.8) translateX(50px);
                transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .sr7-slide.active .cta-button {
                opacity: 1;
                transform: scale(1) translateX(0);
                transition-delay: 0.7s;
            }
            
            .content-container {
                background: rgba(12, 12, 12, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                padding: 40px;
                display: flex;
                align-items: center;
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .sr7-slide.active .content-container {
                opacity: 1;
                transform: translateY(0);
                transition-delay: 0.4s;
            }
            
            .particle-canvas, .snow-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            
            .progress-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                background: linear-gradient(90deg, #ad2727 0%, #ff286c 100%);
                width: 0%;
                transition: width 0.1s linear;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            .main-image.floating {
                animation: float 6s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    initParticles() {
        this.canvas = document.getElementById('snow-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Create particle system
        for (let i = 0; i < this.settings.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
        
        this.animateParticles();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1
        };
    }
    
    animateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;
            
            if (particle.y > this.canvas.height) {
                this.particles[index] = this.createParticle();
            }
            
            if (particle.x > this.canvas.width || particle.x < 0) {
                particle.speedX *= -1;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation * Math.PI / 180);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = `${particle.size * 4}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText('❄', 0, 0);
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }
    
    bindEvents() {
        // Navigation events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-next')) {
                this.nextSlide();
            } else if (e.target.classList.contains('nav-prev')) {
                this.prevSlide();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === ' ') this.toggleAutoPlay();
        });
        
        // Mouse events for autoplay control
        document.querySelector('.sr7-module').addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        document.querySelector('.sr7-module').addEventListener('mouseleave', () => {
            this.resumeAutoPlay();
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    showSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Hide current slide
        const currentSlide = document.querySelector('.sr7-slide.active');
        if (currentSlide) {
            currentSlide.classList.remove('active');
        }
        
        // Show new slide
        const newSlide = document.querySelector(`[data-index="${index}"]`);
        const slideData = this.slides[index];
        
        // Set background image for main image
        const mainImage = newSlide.querySelector('.main-image');
        mainImage.style.backgroundImage = `url('${slideData.mainImage}')`;
        
        // Position main image based on slide
        this.positionMainImage(mainImage, index);
        
        // Add special animations
        this.applySpecialAnimations(newSlide, slideData);
        
        setTimeout(() => {
            newSlide.classList.add('active');
            this.currentSlide = index;
            this.isAnimating = false;
        }, 50);
        
        this.updateProgressBar();
    }
    
    positionMainImage(element, slideIndex) {
        const positions = [
            { width: '100%', height: '516px', top: '294px', left: '0' },
            { width: '940px', height: '694px', top: '117px', left: '72px' },
            { width: '912px', height: '508px', top: '151px', left: '86px' },
            { width: '606px', height: '520px', top: '141px', left: '239px' }
        ];
        
        const pos = positions[slideIndex];
        Object.assign(element.style, pos);
        
        // Add floating animation for slide 3
        if (slideIndex === 2) {
            element.classList.add('floating');
        } else {
            element.classList.remove('floating');
        }
    }
    
    applySpecialAnimations(slide, slideData) {
        const mainImage = slide.querySelector('.main-image');
        const animation = slideData.animations.mainImage;
        
        // Apply scale animation
        if (animation.scale) {
            setTimeout(() => {
                mainImage.style.transform += ` scale(${animation.scale})`;
            }, animation.delay);
        }
        
        // Apply slide animation for slide 4
        if (animation.slideX) {
            mainImage.style.transform = `translateX(${animation.slideX}px)`;
            setTimeout(() => {
                mainImage.style.transform = 'translateX(0)';
            }, animation.delay + 300);
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }
    
    startAutoPlay() {
        if (this.settings.autoPlay) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.settings.autoPlayDelay);
        }
    }
    
    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
    
    resumeAutoPlay() {
        if (this.settings.autoPlay) {
            this.startAutoPlay();
        }
    }
    
    toggleAutoPlay() {
        this.settings.autoPlay = !this.settings.autoPlay;
        if (this.settings.autoPlay) {
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
        }
    }
    
    updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        let width = 0;
        const increment = 100 / (this.settings.autoPlayDelay / 50);
        
        const updateProgress = () => {
            width += increment;
            if (width >= 100) {
                width = 0;
            }
            progressBar.style.width = width + '%';
            
            if (this.settings.autoPlay) {
                setTimeout(updateProgress, 50);
            }
        };
        
        updateProgress();
    }
    
    initParallax() {
        if (!this.settings.enableParallax) return;
        
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            
            const activeSlide = document.querySelector('.sr7-slide.active');
            if (activeSlide) {
                const bg = activeSlide.querySelector('.sr7-bg');
                const mainImage = activeSlide.querySelector('.main-image');
                
                bg.style.transform = `scale(1.05) translate(${x * 20}px, ${y * 20}px)`;
                mainImage.style.transform += ` translate(${x * 10}px, ${y * 10}px)`;
            }
        });
    }
    
    // Advanced transition effects
    addTransitionEffect(type = 'fade') {
        const effects = {
            fade: (slide, direction) => {
                slide.style.opacity = direction === 'in' ? '1' : '0';
            },
            slide: (slide, direction) => {
                const transform = direction === 'in' ? 'translateX(0)' : 'translateX(100%)';
                slide.style.transform = transform;
            },
            scale: (slide, direction) => {
                const scale = direction === 'in' ? 'scale(1)' : 'scale(1.1)';
                slide.style.transform = scale;
            },
            blur: (slide, direction) => {
                const blur = direction === 'in' ? 'blur(0px)' : 'blur(10px)';
                slide.style.filter = blur;
            }
        };
        
        return effects[type] || effects.fade;
    }
    
    // Performance optimization
    optimizePerformance() {
        // Reduce particles on mobile
        if (window.innerWidth < 768) {
            this.settings.particleCount = 25;
            this.particles = this.particles.slice(0, 25);
        }
        
        // Disable parallax on mobile
        if (window.innerWidth < 768) {
            this.settings.enableParallax = false;
        }
        
        // Use will-change for better performance
        const slides = document.querySelectorAll('.sr7-slide');
        slides.forEach(slide => {
            slide.style.willChange = 'transform, opacity';
        });
    }
    
    destroy() {
        clearInterval(this.autoPlayInterval);
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slider = new ChristmasSlider();
    
    // Global access for debugging
    window.ChristmasSlider = slider;
    
    // Performance optimization
    slider.optimizePerformance();
    
    console.log('🎄 Christmas Slider Revolution Initialized! 🎄');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChristmasSlider;
}