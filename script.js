// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Check if it's a cross-page link (contains index.html)
            if (targetId.includes('index.html')) {
                // For cross-page links, let the browser navigate normally
                // The anchor will be handled by the destination page
                return;
            }
            
            // Handle same-page anchor links
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle anchor links on page load
    function handlePageLoadAnchor() {
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 100); // Small delay to ensure page is loaded
            }
        }
    }

    // Check for anchor on page load
    handlePageLoadAnchor();

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle AOS (Animate On Scroll) data attributes
                const aosElement = entry.target;
                if (aosElement.dataset.aos) {
                    const animationType = aosElement.dataset.aos;
                    const delay = aosElement.dataset.aosDelay || 0;
                    
                    setTimeout(() => {
                        switch(animationType) {
                            case 'fade-up':
                                aosElement.style.opacity = '1';
                                aosElement.style.transform = 'translateY(0)';
                                break;
                            case 'zoom-in':
                                aosElement.style.opacity = '1';
                                aosElement.style.transform = 'scale(1)';
                                break;
                        }
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('[data-aos], .exhibit-card, .timeline-card, .gallery-item');
    animatedElements.forEach(element => {
        // Set initial styles for animation
        if (element.dataset.aos) {
            element.style.opacity = '0';
            element.style.transition = 'all 0.8s ease';
            
            switch(element.dataset.aos) {
                case 'fade-up':
                    element.style.transform = 'translateY(30px)';
                    break;
                case 'zoom-in':
                    element.style.transform = 'scale(0.8)';
                    break;
            }
        }
        
        observer.observe(element);
    });

    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            lightboxImage.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Carnival music player
    const playButton = document.getElementById('play-carnival');
    const stopButton = document.getElementById('stop-carnival');
    const carnivalAudio = document.getElementById('carnival-audio');
    let isPlaying = false;

    playButton.addEventListener('click', function() {
        if (isPlaying) {
            carnivalAudio.pause();
            playButton.innerHTML = '<span class="play-icon">▶</span><span class="play-text">Play Carnival Music</span>';
            playButton.classList.remove('playing');
            isPlaying = false;
        } else {
            carnivalAudio.play();
            playButton.innerHTML = '<span class="play-icon">⏸</span><span class="play-text">Pause Carnival Music</span>';
            playButton.classList.add('playing');
            isPlaying = true;
        }
    });

    stopButton.addEventListener('click', function() {
        carnivalAudio.pause();
        carnivalAudio.currentTime = 0;
        playButton.innerHTML = '<span class="play-icon">▶</span><span class="play-text">Play Carnival Music</span>';
        playButton.classList.remove('playing');
        isPlaying = false;
    });

    // Handle audio end
    carnivalAudio.addEventListener('ended', function() {
        playButton.innerHTML = '<span class="play-icon">▶</span><span class="play-text">Play Carnival Music</span>';
        playButton.classList.remove('playing');
        isPlaying = false;
    });

    // Parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background img');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Carousel functionality
    const carouselTrack = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Auto-play carousel (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Stop auto-play on hover
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', stopAutoPlay);
        carouselTrack.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Exhibit card hover effects
    const exhibitCards = document.querySelectorAll('.exhibit-card');
    exhibitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline card staggered animation on scroll
    const timelineCards = document.querySelectorAll('.timeline-card');
    timelineCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Gallery item staggered animation on scroll
    const galleryItemsAnimated = document.querySelectorAll('.gallery-item');
    galleryItemsAnimated.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Form validation (if contact form is added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            // Scroll-based animations and updates
            updateScrollProgress();
        });
    });

    // Scroll progress indicator (optional enhancement)
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // You could add a progress bar here if desired
        // const progressBar = document.getElementById('scroll-progress');
        // if (progressBar) {
        //     progressBar.style.width = scrollPercent + '%';
        // }
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Touch gestures for mobile gallery
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        item.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Could implement swipe navigation for gallery
            console.log('Swipe detected');
        }
    }

    // Initialize animations on page load
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);

    // Console log for debugging
    console.log('Carnival Museum website loaded successfully!');
});
