// ===== COMPLETE WEBFLOW FUNCTIONALITY - CORRECTED & OPTIMIZED =====
// Fixed all issues and properly structured for your Webflow template

$(document).ready(function() {
    console.log('=== WEBFLOW COMPLETE FUNCTIONALITY ===');
    
    // ===== GLOBAL VARIABLES =====
    var openDropdown = null;
    var activeSliders = [];
    var resizeTimeout;
    var scrollTimeout;
    
    // ===== UTILITY FUNCTIONS =====
    function debounce(func, wait) {
        var timeout;
        return function executedFunction() {
            var context = this;
            var args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
        var inThrottle;
        return function() {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() { inThrottle = false; }, limit);
            }
        };
    }

    // ===== MOBILE NAVIGATION =====
    $('.rt-menu-button').on('click', function(e) {
        e.preventDefault();
        console.log('Mobile menu button clicked!');
        
        var $nav = $(this).closest('.w-nav');
        var $menu = $nav.find('.navbar-menu');
        var $overlay = $nav.find('.w-nav-overlay');
        
        $nav.toggleClass('w--open');
        $menu.toggleClass('w--nav-menu-open');
        $(this).toggleClass('w--open');
        
        if ($nav.hasClass('w--open')) {
            $overlay.show();
            $('body').addClass('w--nav-menu-open');
        } else {
            $overlay.hide();
            $('body').removeClass('w--nav-menu-open');
        }
    });

    // Close nav on overlay click
    $('.w-nav-overlay').on('click', function() {
        var $nav = $(this).closest('.w-nav');
        $nav.removeClass('w--open');
        $nav.find('.navbar-menu').removeClass('w--nav-menu-open');
        $nav.find('.rt-menu-button').removeClass('w--open');
        $(this).hide();
        $('body').removeClass('w--nav-menu-open');
    });

    // ===== DROPDOWN FUNCTIONALITY =====
    $('.w-dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $dropdown = $(this).closest('.w-dropdown');
        var $list = $dropdown.find('.w-dropdown-list');
        
        // Close other dropdowns
        if (openDropdown && openDropdown[0] !== $dropdown[0]) {
            openDropdown.removeClass('w--open');
            openDropdown.find('.w-dropdown-list').removeClass('w--open');
        }
        
        // Toggle current dropdown
        if ($dropdown.hasClass('w--open')) {
            $dropdown.removeClass('w--open');
            $list.removeClass('w--open');
            openDropdown = null;
        } else {
            $dropdown.addClass('w--open');
            $list.addClass('w--open');
            openDropdown = $dropdown;
        }
    });

    // Dropdown hover functionality
    $('.w-dropdown[data-hover="true"]').each(function() {
        var $dropdown = $(this);
        var $list = $dropdown.find('.w-dropdown-list');
        var hoverTimer;
        
        $dropdown.on('mouseenter', function() {
            clearTimeout(hoverTimer);
            $('.w-dropdown').not($dropdown).removeClass('w--open').find('.w-dropdown-list').removeClass('w--open');
            $dropdown.addClass('w--open');
            $list.addClass('w--open');
            openDropdown = $dropdown;
        });
        
        $dropdown.on('mouseleave', function() {
            hoverTimer = setTimeout(function() {
                $dropdown.removeClass('w--open');
                $list.removeClass('w--open');
                if (openDropdown && openDropdown[0] === $dropdown[0]) {
                    openDropdown = null;
                }
            }, 100);
        });
    });

    // Close dropdowns on outside click
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.w-dropdown').length && openDropdown) {
            openDropdown.removeClass('w--open');
            openDropdown.find('.w-dropdown-list').removeClass('w--open');
            openDropdown = null;
        }
    });

    // ===== SLIDER/CAROUSEL FUNCTIONALITY =====
    $('.w-slider').each(function() {
        var $slider = $(this);
        var $mask = $slider.find('.w-slider-mask');
        var $slides = $mask.find('.w-slide');
        var $nav = $slider.find('.w-slider-nav');
        var $dots = $nav.find('.w-slider-dot');
        var $leftArrow = $slider.find('.w-slider-arrow-left');
        var $rightArrow = $slider.find('.w-slider-arrow-right');
        
        var current = 0;
        var total = $slides.length;
        var autoplayTimer;
        var startX = 0;
        var isDragging = false;
        
        if (total <= 1) return;
        
        var sliderAPI = {
            goToSlide: function(index, skipAnimation) {
                if (index < 0) index = total - 1;
                if (index >= total) index = 0;
                
                current = index;
                var offset = -index * 100;
                
                $slides.css({
                    'transform': 'translateX(' + offset + '%)',
                    'transition': skipAnimation ? 'none' : 'transform 0.5s ease-in-out'
                });
                
                $dots.removeClass('w-active');
                $dots.eq(index).addClass('w-active');
                
                $slides.removeClass('w-active');
                $slides.eq(index).addClass('w-active');
            },
            
            startAutoplay: function() {
                sliderAPI.stopAutoplay();
                autoplayTimer = setInterval(function() {
                    sliderAPI.goToSlide(current + 1);
                }, 4000);
            },
            
            stopAutoplay: function() {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            },
            
            next: function() {
                sliderAPI.goToSlide(current + 1);
            },
            
            prev: function() {
                sliderAPI.goToSlide(current - 1);
            }
        };
        
        // Initialize slider
        sliderAPI.goToSlide(0, true);
        sliderAPI.startAutoplay();
        
        // Store reference
        sliderAPI.element = $slider;
        activeSliders.push(sliderAPI);
    });

    // ===== TABS FUNCTIONALITY =====
    $('.w-tabs').each(function() {
        var $tabs = $(this);
        var $menu = $tabs.find('.w-tab-menu');
        var $links = $menu.find('.w-tab-link');
        var $content = $tabs.find('.w-tab-content');
        var $panes = $content.find('.w-tab-pane');
        
        if (!$links.filter('.w--current').length && $links.length) {
            $links.first().addClass('w--current');
            $panes.first().addClass('w--tab-active');
        }
        
        $links.on('click', function(e) {
            e.preventDefault();
            var $link = $(this);
            var index = $links.index($link);
            
            $links.removeClass('w--current');
            $link.addClass('w--current');
            
            $panes.removeClass('w--tab-active');
            $panes.eq(index).addClass('w--tab-active').hide().fadeIn(300);
        });
    });

    // ===== ACCORDION FUNCTIONALITY =====
    $('.w-collapse').each(function() {
        var $accordion = $(this);
        var $toggle = $accordion.find('.w-collapse-toggle');
        var $content = $accordion.find('.w-collapse-content');
        
        $toggle.on('click', function(e) {
            e.preventDefault();
            
            var isOpen = $accordion.hasClass('w--open');
            
            if (!$accordion.attr('data-multiple')) {
                $('.w-collapse').not($accordion).removeClass('w--open')
                    .find('.w-collapse-content').slideUp(300);
            }
            
            if (isOpen) {
                $accordion.removeClass('w--open');
                $content.slideUp(300);
            } else {
                $accordion.addClass('w--open');
                $content.slideDown(300);
            }
        });
    });

    // ===== MODAL/POPUP FUNCTIONALITY =====
    function initModals() {
        $('[data-w-modal]').on('click', function(e) {
            e.preventDefault();
            var modalId = $(this).attr('data-w-modal');
            var $modal = $('#' + modalId);
            
            if ($modal.length) {
                $modal.addClass('w--open').fadeIn(300);
                $('body').addClass('w--modal-open');
            }
        });
        
        $(document).on('click', '.w-modal-close, .w-modal-backdrop', function(e) {
            if (e.target === this) {
                var $modal = $(this).closest('.w-modal');
                $modal.removeClass('w--open').fadeOut(300);
                $('body').removeClass('w--modal-open');
            }
        });
    }

    // ===== BUTTON HOVER ANIMATIONS =====
    $('[data-w-id]').each(function() {
        var $btn = $(this);
        var $textWrapper = $btn.find('.rt-button-text-wrapper');
        var $text1 = $btn.find('.rt-button-text.rt-1');
        var $text2 = $btn.find('.rt-button-text-down');
        
        if ($textWrapper.length && $text1.length && $text2.length) {
            $btn.on('mouseenter', function() {
                $text1.css('transform', 'translateY(-100%)');
                $text2.css('transform', 'translateY(-100%)');
            });
            
            $btn.on('mouseleave', function() {
                $text1.css('transform', 'translateY(0%)');
                $text2.css('transform', 'translateY(0%)');
            });
        }
    });

    // ===== SMOOTH SCROLLING =====
    $('a[href*="#"]:not([href="#"])').on('click', function(e) {
        var href = $(this).attr('href');
        var target = href.indexOf('#') > -1 ? href.split('#')[1] : null;
        
        if (target) {
            var $target = $('#' + target);
            if ($target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $target.offset().top - 80
                }, 800);
            }
        }
    });

    // ===== FORMS =====
    $('form').on('submit', function(e) {
        var $form = $(this);
        var $success = $form.find('.w-form-done');
        var $error = $form.find('.w-form-fail');
        var action = $form.attr('action');
        
        if (!action || action === '#') {
            e.preventDefault();
            $form.hide();
            $success.show();
            $error.hide();
            
            setTimeout(function() {
                $form.show();
                $success.hide();
                $form[0].reset();
            }, 3000);
        }
    });

    // ===== LIGHTBOX =====
    $('[data-w-lightbox], .rt-landing-banner-image, .image-effect, .marquee-scroll-box-shadow').on('click', function(e) {
        var $target = $(e.target);
        var src = null;
        
        if ($target.is('img')) {
            src = $target.attr('src');
        } else {
            src = $(this).find('img').first().attr('src');
        }
        
        if (src && /\.(jpg|jpeg|png|webp|gif)$/i.test(src)) {
            e.preventDefault();
            
            var $lightbox = $('<div class="w-lightbox-backdrop">' +
                '<div class="w-lightbox-container">' +
                    '<img class="w-lightbox-img" src="' + src + '">' +
                    '<div class="w-lightbox-close">×</div>' +
                '</div>' +
            '</div>');
            
            $lightbox.css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.9)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            });
            
            $('body').append($lightbox);
            
            $lightbox.on('click', function(e) {
                if (e.target === this || $(e.target).hasClass('w-lightbox-close')) {
                    $lightbox.remove();
                }
            });
        }
    });

    // ===== COLLECTION LIST FILTERING =====
    function initCollectionFilters() {
        $('[data-filter-list]').on('click', function(e) {
            e.preventDefault();
            var $filter = $(this);
            var listId = $filter.attr('data-filter-list');
            var filterValue = $filter.attr('data-filter');
            var $list = $('#' + listId);
            var $items = $list.find('.w-dyn-item');
            
            $('[data-filter-list="' + listId + '"]').removeClass('w--current');
            $filter.addClass('w--current');
            
            if (filterValue === '*' || filterValue === 'all') {
                $items.fadeIn(300);
            } else {
                $items.each(function() {
                    var $item = $(this);
                    var categories = $item.attr('data-category') || '';
                    
                    if (categories.includes(filterValue)) {
                        $item.fadeIn(300);
                    } else {
                        $item.fadeOut(300);
                    }
                });
            }
        });
    }

    // ===== SEARCH FUNCTIONALITY =====
    $('.w-search-input').each(function() {
        var $input = $(this);
        var $results = $input.siblings('.w-search-results');
        var $items = $('[data-searchable]');
        
        $input.on('input', debounce(function() {
            var query = $(this).val().toLowerCase().trim();
            
            if (query.length < 2) {
                $results.empty().hide();
                return;
            }
            
            var matches = [];
            $items.each(function() {
                var $item = $(this);
                var text = $item.text().toLowerCase();
                var title = ($item.attr('data-title') || '').toLowerCase();
                
                if (text.includes(query) || title.includes(query)) {
                    matches.push($item.clone());
                }
            });
            
            if (matches.length > 0) {
                $results.empty();
                matches.slice(0, 5).forEach(function(item) {
                    $results.append(item);
                });
                $results.show();
            } else {
                $results.html('<div class="w-search-no-results">No results found</div>').show();
            }
        }, 300));
        
        $(document).on('click', function(e) {
            if (!$(e.target).closest($input.parent()).length) {
                $results.hide();
            }
        });
    });

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        var $animatedElements = $('[data-w-id]').filter(function() {
            return $(this).css('opacity') == '0' || $(this).css('transform') !== 'none';
        });
        
        var checkScroll = throttle(function() {
            var windowTop = $(window).scrollTop();
            var windowBottom = windowTop + $(window).height();
            
            $animatedElements.each(function() {
                var $el = $(this);
                if ($el.hasClass('w--animated')) return;
                
                var elementTop = $el.offset().top;
                var elementBottom = elementTop + $el.height();
                
                if (elementBottom >= windowTop && elementTop <= windowBottom - 100) {
                    $el.addClass('w--animated');
                    
                    if ($el.css('opacity') == '0') {
                        $el.animate({opacity: 1}, 800);
                    }
                    
                    $el.css('transform', 'none');
                }
            });
        }, 16);
        
        $(window).on('scroll', checkScroll);
        checkScroll();
    }

    // ===== MARQUEE ANIMATIONS =====
    function initMarqueeAnimations() {
        // Scroll Marquee
        $('.rt-scroll-marquee-train').each(function() {
            var $train = $(this);
            var speed = parseFloat($train.attr('data-speed')) || 0.5;
            var direction = $train.hasClass('rt-scroll-left-to-right') ? 1 : -1;
            var position = 0;
            var animationId;
            
            function animate() {
                position += speed * direction;
                var containerWidth = $train.parent().width();
                var trainWidth = $train.width();
                
                if (direction > 0 && position > containerWidth) {
                    position = -trainWidth;
                } else if (direction < 0 && position < -trainWidth) {
                    position = containerWidth;
                }
                
                $train.css('transform', 'translateX(' + position + 'px)');
                animationId = requestAnimationFrame(animate);
            }
            
            animate();
            $train.data('animationId', animationId);
        });

        // Text Marquee
        $('.rt-marque-text-contant').each(function() {
            var $container = $(this);
            var $boxes = $container.find('.rt-marque-text-box');
            var speed = parseFloat($container.attr('data-speed')) || 1;
            var animationId;
            
            function animate() {
                $boxes.each(function() {
                    var $box = $(this);
                    var currentTransform = $box.css('transform');
                    var matrix = currentTransform.match(/matrix\((.+)\)/);
                    var currentX = matrix ? parseFloat(matrix[1].split(',')[4]) : 0;
                    
                    var newX = currentX - speed;
                    var boxWidth = $box.width();
                    
                    if (newX < -boxWidth) {
                        newX = boxWidth;
                    }
                    
                    $box.css('transform', 'translateX(' + newX + 'px)');
                });
                
                animationId = requestAnimationFrame(animate);
            }
            
            animate();
            $container.data('animationId', animationId);
        });
    }

    // ===== COUNTER ANIMATIONS =====
    function initCounters() {
        $('.rt-text-style-h2').each(function() {
            var $counter = $(this);
            var text = $counter.text().trim();
            var matches = text.match(/\d+/);
            
            if (matches) {
                var number = parseInt(matches[0]);
                var suffix = text.replace(number.toString(), '');
                
                $counter.attr('data-target', number);
                $counter.attr('data-suffix', suffix);
                $counter.text('0' + suffix);
                
                if ('IntersectionObserver' in window) {
                    var observer = new IntersectionObserver(function(entries) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                animateCounter($counter);
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe($counter[0]);
                } else {
                    $(window).on('scroll', function() {
                        var scrollTop = $(window).scrollTop();
                        var windowHeight = $(window).height();
                        var elementTop = $counter.offset().top;
                        
                        if (scrollTop + windowHeight > elementTop && !$counter.hasClass('counted')) {
                            $counter.addClass('counted');
                            animateCounter($counter);
                        }
                    });
                }
            }
        });
    }
    
    function animateCounter($counter) {
        var target = parseInt($counter.attr('data-target'));
        var suffix = $counter.attr('data-suffix') || '';
        var current = 0;
        var increment = target / 60;
        
        function count() {
            current += increment;
            if (current >= target) {
                $counter.text(target + suffix);
            } else {
                $counter.text(Math.floor(current) + suffix);
                requestAnimationFrame(count);
            }
        }
        
        count();
    }

    // ===== LAZY LOADING =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('w--lazy');
                            img.classList.add('w--loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                img.classList.add('w--lazy');
                imageObserver.observe(img);
            });
        } else {
            $('img[data-src]').each(function() {
                var $img = $(this);
                $img.attr('src', $img.attr('data-src')).removeAttr('data-src');
            });
        }
    }

    // ===== ENHANCED CONTAINER ANIMATIONS =====
    function initSmoothContainerAnimations() {
        // Target your specific containers
        var containerSelectors = [
            '.landing-about-card',
            '.pages-card',
            '.rt-catomization-left',
            '.catomization-right',
            '.landing-page-home-template-option',
            '.customization-main-2',
            '.rt-landing-item-wrapper',
            '.utility-card-wrapper'
        ];
        
        var $animatedContainers = $(containerSelectors.join(', '));
        
        function animateContainer($container, index) {
            var $children = $container.find('> *').not('.w--animated');
            var delay = index * 200;
            
            $children.each(function(childIndex) {
                var $child = $(this);
                var childDelay = delay + (childIndex * 100);
                
                $child.css({
                    'opacity': '0',
                    'transform': 'translateY(30px)',
                    'transition': 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                });
                
                setTimeout(function() {
                    if ($child.length) {
                        $child.css({
                            'opacity': '1',
                            'transform': 'translateY(0px)'
                        });
                    }
                }, childDelay);
            });
        }
        
        if ('IntersectionObserver' in window) {
            var containerObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting && !entry.target.classList.contains('container-animated')) {
                        entry.target.classList.add('container-animated');
                        animateContainer($(entry.target), index);
                        containerObserver.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            $animatedContainers.each(function() {
                containerObserver.observe(this);
            });
        }
    }

    // ===== GLOWING HOVER EFFECTS =====
    function initGlowingHoverEffects() {
        var glowContainers = [
            '.landing-about-card',
            '.pages-card',
            '.rt-catomization-left',
            '.catomization-right',
            '.landing-page-home-template-option'
        ];
        
        $(glowContainers.join(', ')).each(function() {
            var $container = $(this);
            
            $container.on('mouseenter', function() {
                $(this).addClass('glow-active').css({
                    'transform': 'translateY(-8px) scale(1.02)',
                    'box-shadow': '0 20px 40px rgba(0, 123, 255, 0.25), 0 0 30px rgba(0, 123, 255, 0.4)',
                    'border': '1px solid rgba(0, 123, 255, 0.3)',
                    'transition': 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                });
                
                // Add glowing border animation
                $(this).css({
                    'background': 'linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(0, 86, 179, 0.08))',
                    'position': 'relative'
                });
                
                // Animate child elements
                $(this).find('.rt-text-style-h2, .rt-text-style-h3, .rt-text-style-h5').css({
                    'transform': 'translateY(-2px)',
                    'color': '#007bff',
                    'transition': 'all 0.3s ease'
                });
            });
            
            $container.on('mouseleave', function() {
                $(this).removeClass('glow-active').css({
                    'transform': 'translateY(0px) scale(1)',
                    'box-shadow': '0 8px 25px rgba(0, 0, 0, 0.1)',
                    'border': '1px solid transparent',
                    'background': '',
                    'transition': 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                });
                
                // Reset child elements
                $(this).find('.rt-text-style-h2, .rt-text-style-h3, .rt-text-style-h5').css({
                    'transform': 'translateY(0px)',
                    'color': '',
                    'transition': 'all 0.3s ease'
                });
            });
        });
    }

    // ===== FLOATING CONTAINER EFFECTS =====
    function initFloatingContainerEffects() {
        $('.landing-about-card, .pages-card, .rt-catomization-left, .catomization-right').each(function() {
            var $container = $(this);
            
            $container.css({
                'animation': 'containerFloat 6s ease-in-out infinite',
                'animation-delay': Math.random() * 2 + 's'
            });
            
            $container.on('mouseenter', function() {
                $(this).css('animation-play-state', 'paused');
            });
            
            $container.on('mouseleave', function() {
                $(this).css('animation-play-state', 'running');
            });
        });
    }

    // ===== MAGNETIC CONTAINER EFFECT =====
    function initMagneticContainerEffect() {
        $('.landing-about-card, .pages-card, .landing-page-home-template-option').each(function() {
            var $container = $(this);
            
            $container.on('mousemove', function(e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                
                var moveX = x * 0.05;
                var moveY = y * 0.05;
                var rotateX = y * 0.02;
                var rotateY = x * -0.02;
                
                $(this).css({
                    'transform': 'translate(' + moveX + 'px, ' + moveY + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)',
                    'transition': 'none'
                });
            });
            
            $container.on('mouseleave', function() {
                $(this).css({
                    'transform': 'translate(0px, 0px) rotateX(0deg) rotateY(0deg)',
                    'transition': 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                });
            });
        });
    }

    // ===== CONTAINER RIPPLE EFFECT =====
    function initContainerRippleEffect() {
        $('.landing-about-card, .pages-card').on('click', function(e) {
            var $container = $(this);
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            
            var $ripple = $('<div class="container-ripple"></div>');
            $ripple.css({
                'position': 'absolute',
                'left': x + 'px',
                'top': y + 'px',
                'width': '0',
                'height': '0',
                'border-radius': '50%',
                'background': 'rgba(0, 123, 255, 0.3)',
                'transform': 'translate(-50%, -50%)',
                'pointer-events': 'none',
                'z-index': '1000'
            });
            
            $container.css('position', 'relative').append($ripple);
            
            $ripple.animate({
                width: '300px',
                height: '300px',
                opacity: 0
            }, 600, function() {
                $ripple.remove();
            });
        });
    }

    // ===== RESPONSIVE HANDLING =====
    var handleResize = debounce(function() {
        var windowWidth = $(window).width();
        
        if (windowWidth <= 991) {
            $('.rt-tab-none').hide();
        } else {
            $('.rt-tab-none').show();
            
            $('.w-nav').removeClass('w--open');
            $('.navbar-menu').removeClass('w--nav-menu-open');
            $('.rt-menu-button').removeClass('w--open');
            $('.w-nav-overlay').hide();
            $('body').removeClass('w--nav-menu-open');
        }
    }, 250);

    // ===== KEYBOARD NAVIGATION =====
    $(document).on('keydown', function(e) {
        switch(e.keyCode) {
            case 27: // ESC
                $('.w-dropdown.w--open').removeClass('w--open').find('.w-dropdown-list').removeClass('w--open');
                $('.w-nav.w--open').removeClass('w--open').find('.navbar-menu').removeClass('w--nav-menu-open');
                $('.w-lightbox-backdrop').remove();
                $('.w-modal.w--open').removeClass('w--open').fadeOut(300);
                $('body').removeClass('w--nav-menu-open w--modal-open');
                openDropdown = null;
                break;
            case 37: // Left arrow
                if (!$('input, textarea').is(':focus')) {
                    activeSliders.forEach(function(slider) {
                        if (slider.prev) {
                            slider.stopAutoplay();
                            slider.prev();
                            setTimeout(slider.startAutoplay, 5000);
                        }
                    });
                }
                break;
            case 39: // Right arrow
                if (!$('input, textarea').is(':focus')) {
                    activeSliders.forEach(function(slider) {
                        if (slider.next) {
                            slider.stopAutoplay();
                            slider.next();
                            setTimeout(slider.startAutoplay, 5000);
                        }
                    });
                }
                break;
        }
    });

    // ===== CLEANUP ON PAGE UNLOAD =====
    $(window).on('beforeunload', function() {
        activeSliders.forEach(function(slider) {
            if (slider.stopAutoplay) {
                slider.stopAutoplay();
            }
        });
        
        $('.rt-scroll-marquee-train, .rt-marque-text-contant').each(function() {
            var animationId = $(this).data('animationId');
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    });

    // ===== INITIALIZE ALL FEATURES =====
    $(window).on('resize', handleResize);
    handleResize();
    
    // Initialize all features in proper order
    setTimeout(function() {
        initModals();
        initCollectionFilters();
        initScrollAnimations();
        initMarqueeAnimations();
        initCounters();
        initLazyLoading();
        initSmoothContainerAnimations();
        initGlowingHoverEffects();
        initFloatingContainerEffects();
        initMagneticContainerEffect();
        initContainerRippleEffect();
    }, 100);

    console.log('=== ALL WEBFLOW FUNCTIONALITY LOADED ===');

}); // SINGLE CLOSING BRACE FOR DOCUMENT READY

// ===== ALL CSS STYLES OUTSIDE DOCUMENT READY =====
if (!document.querySelector('style[data-webflow-enhanced]')) {
    var style = document.createElement('style');
    style.setAttribute('data-webflow-enhanced', 'true');
    style.textContent = `
        /* Button Animations */
        .rt-button-text {
            transition: transform 0.3s ease !important;
        }
        
        /* Lightbox Styles */
        .w-lightbox-close {
            position: absolute !important;
            top: -50px !important;
            right: 0 !important;
            color: white !important;
            font-size: 40px !important;
            cursor: pointer !important;
            z-index: 10000 !important;
            font-weight: bold !important;
            user-select: none !important;
        }
        .w-lightbox-close:hover {
            color: #ccc !important;
        }
        .w-lightbox-img {
            max-width: 90vw !important;
            max-height: 90vh !important;
            object-fit: contain !important;
        }
        
        /* Slider Styles */
        .w-slider-dragging {
            cursor: grabbing !important;
            user-select: none !important;
        }
        
        /* Animation Styles */
        .w--animated {
            transition: all 0.8s ease !important;
        }
        
        /* Accordion Styles */
        .w-collapse-content {
            display: none;
        }
        .w--open .w-collapse-content {
            display: block;
        }
        
        /* Modal Styles */
        .w-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
        }
        .w-modal.w--open {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .w--modal-open {
            overflow: hidden !important;
        }
        
        /* Lazy Loading */
        .w--lazy {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .w--loaded {
            opacity: 1;
        }
        
        /* Search Results */
        .w-search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .w-search-no-results {
            padding: 15px;
            text-align: center;
            color: #666;
            font-style: italic;
        }
        
        /* Container Float Animation */
        @keyframes containerFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        /* Container Hover Effects with Glow */
        .landing-about-card,
        .pages-card,
        .rt-catomization-left,
        .catomization-right,
        .landing-page-home-template-option {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            position: relative;
            overflow: hidden;
        }
        
        /* Enhanced Glow Effects */
        .glow-active {
            position: relative;
        }
        
        .glow-active::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #007bff, #0056b3, #007bff, #0056b3);
            border-radius: inherit;
            z-index: -1;
            animation: borderGlow 2s linear infinite;
            opacity: 0.6;
        }
        
        @keyframes borderGlow {
            0%, 100% { 
                background-position: 0% 50%;
            }
            50% { 
                background-position: 100% 50%;
            }
        }
        
        /* Container Depth Shadows */
        .landing-about-card {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .pages-card {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        
        /* Ripple Effect Container */
        .container-ripple {
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        
        /* Performance Optimizations */
        .container-animated {
            will-change: auto;
        }
        
        /* Smooth Transforms */
        .landing-page-home-template-option,
        .pages-card {
            transform-origin: center center;
            will-change: transform, opacity;
        }
        
        /* Magnetic Effect Containers */
        .landing-about-card:hover,
        .pages-card:hover,
        .landing-page-home-template-option:hover {
            transform-style: preserve-3d;
        }
        
        /* Enhanced Blue Hover Effects */
        .rt-marque-button-box:hover,
        .marquee-item:hover,
        .tag-item:hover,
        .category-item:hover {
            background: linear-gradient(135deg, #007bff, #0056b3) !important;
            border-color: #007bff !important;
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3) !important;
            color: white !important;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
            .landing-about-card,
            .pages-card,
            .landing-page-home-template-option {
                animation: none !important;
                transform: none !important;
            }
            
            .landing-about-card:hover,
            .pages-card:hover,
            .landing-page-home-template-option:hover {
                transform: translateY(-4px) scale(1.01) !important;
                box-shadow: 0 10px 20px rgba(0, 123, 255, 0.15) !important;
            }
        }
        
        /* Reduced Motion Preference */
        @media (prefers-reduced-motion: reduce) {
            .landing-about-card,
            .pages-card,
            .landing-page-home-template-option {
                animation: none !important;
                transition: opacity 0.3s ease !important;
            }
        }
        
        /* Container Background Transitions */
        .rt-catomization-left,
        .catomization-right {
            background-transition: background 0.5s ease;
        }
        
        /* Accessibility Improvements */
        .w-dropdown-toggle:focus,
        .w-tab-link:focus,
        .w-collapse-toggle:focus {
            outline: 2px solid #007bff;
            outline-offset: 2px;
        }
        
        /* Loading States */
        .w--loading {
            position: relative;
            pointer-events: none;
        }
        .w--loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Smooth Scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Performance Optimizations for Animations */
        .rt-scroll-marquee-train,
        .rt-marque-text-box {
            will-change: transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
        
        /* Additional Glow Variants */
        .pages-card.glow-active {
            box-shadow: 
                0 20px 40px rgba(0, 123, 255, 0.25),
                0 0 30px rgba(0, 123, 255, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        
        .landing-about-card.glow-active {
            box-shadow: 
                0 25px 50px rgba(0, 123, 255, 0.3),
                0 0 40px rgba(0, 123, 255, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
        }
        
        /* Print Styles */
        @media print {
            .w-nav,
            .w-dropdown,
            .w-slider-arrow-left,
            .w-slider-arrow-right,
            .w-slider-nav {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== UTILITY FUNCTIONS FOR EXTERNAL USE =====
window.ContainerAnimations = {
    // Manually trigger container animation
    animateContainer: function(selector) {
        $(selector).addClass('container-animated');
    },
    
    // Pause all container animations
    pauseAnimations: function() {
        $('*').css('animation-play-state', 'paused');
    },
    
    // Resume all container animations
    resumeAnimations: function() {
        $('*').css('animation-play-state', 'running');
    },
    
    // Reset container positions
    resetContainers: function() {
        $('.landing-about-card, .pages-card, .landing-page-home-template-option').css({
            'transform': 'none',
            'transition': 'all 0.3s ease'
        });
    },
    
    // Force glow effect
    forceGlow: function(selector) {
        $(selector).addClass('glow-active');
    },
    
    // Remove glow effect
    removeGlow: function(selector) {
        $(selector).removeClass('glow-active');
    }
};