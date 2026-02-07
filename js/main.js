// main.js - Complete Carousel and Navigation Functionality

document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // CAROUSEL FUNCTIONALITY
  // ============================================
  
  // Get all carousel elements
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  
  // Only initialize carousel if elements exist
  if (carouselSlides.length > 0 && indicators.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    
    console.log('Carousel elements found:', {
      slides: carouselSlides.length,
      indicators: indicators.length,
      prevButton: !!prevButton,
      nextButton: !!nextButton
    });

    // Function to show a specific slide with fade transition
    function showSlide(index) {
      console.log('Showing slide:', index);
      
      // Remove active class from all slides and indicators
      carouselSlides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
      });
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Ensure index is within bounds
      if (index >= carouselSlides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = carouselSlides.length - 1;
      } else {
        currentSlide = index;
      }
      
      // Add active class to current slide and indicator
      carouselSlides[currentSlide].classList.add('active');
      
      // Use setTimeout to ensure the active class is applied before fading in
      setTimeout(() => {
        carouselSlides[currentSlide].style.opacity = '1';
      }, 50);
      
      indicators[currentSlide].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Function to go to previous slide
    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    // Start automatic sliding
    function startCarousel() {
      console.log('Starting carousel interval');
      stopCarousel(); // Clear any existing interval
      slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop automatic sliding
    function stopCarousel() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    // Initialize carousel
    function initCarousel() {
      console.log('Initializing carousel');
      showSlide(0);
      startCarousel();
      
      // Add event listeners for carousel controls
      if (prevButton) {
        prevButton.addEventListener('click', function() {
          console.log('Previous button clicked');
          stopCarousel();
          prevSlide();
          startCarousel();
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', function() {
          console.log('Next button clicked');
          stopCarousel();
          nextSlide();
          startCarousel();
        });
      }
      
      // Event listeners for indicators
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
          console.log('Indicator clicked:', index);
          stopCarousel();
          showSlide(index);
          startCarousel();
        });
      });
      
      // Pause carousel on hover
      const heroCarousel = document.querySelector('.hero-carousel');
      if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopCarousel);
        heroCarousel.addEventListener('mouseleave', startCarousel);
        heroCarousel.addEventListener('touchstart', stopCarousel);
        heroCarousel.addEventListener('touchend', startCarousel);
      }
      
      // Touch swipe functionality for mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      if (heroCarousel) {
        heroCarousel.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
          stopCarousel();
        }, { passive: true });

        heroCarousel.addEventListener('touchend', function(e) {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
          startCarousel();
        }, { passive: true });
      }

      function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
          // Swipe left - next slide
          nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
          // Swipe right - previous slide
          prevSlide();
        }
      }
    }
    
    // Initialize the carousel
    initCarousel();
    
    // Handle page visibility changes (pause when tab is not active)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopCarousel();
      } else {
        startCarousel();
      }
    });
  } else {
    console.warn('Carousel elements not found on this page');
  }

  // ============================================
  // MOBILE NAVIGATION FUNCTIONALITY
  // ============================================
  
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  
  if (hamburger && navLinks && navOverlay) {
    console.log('Navigation elements found');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      this.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close menu when clicking a link (on mobile)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth < 768) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          navOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
      if (window.innerWidth < 768 && 
          navLinks.classList.contains('active') && 
          !navLinks.contains(event.target) && 
          !hamburger.contains(event.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  } else {
    console.warn('Navigation elements not found on this page');
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or if it's a carousel control
      if (href === '#' || this.classList.contains('carousel-prev') || 
          this.classList.contains('carousel-next') || 
          this.classList.contains('indicator')) {
        return;
      }
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // ADDITIONAL ENHANCEMENTS
  // ============================================
  
  // Add loading class to body and remove when page loads
  document.body.classList.add('loading');
  window.addEventListener('load', function() {
    document.body.classList.remove('loading');
  });
  
  // Add active state to buttons on click
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mousedown', function() {
      this.classList.add('active');
    });
    button.addEventListener('mouseup', function() {
      this.classList.remove('active');
    });
    button.addEventListener('mouseleave', function() {
      this.classList.remove('active');
    });
  });
});