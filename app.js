// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}



// Feature Cards Stagger Animation
const featureCards = document.querySelectorAll('.feature-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

featureCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  cardObserver.observe(card);
});

// Timeline Progress Animation
const timelineProgress = document.getElementById('timelineProgress');
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const progress = ((index + 1) / timelineItems.length) * 100;
      timelineProgress.style.height = progress + '%';
    }
  });
}, { threshold: 0.5 });

timelineItems.forEach(item => timelineObserver.observe(item));

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselCounter = document.getElementById('carouselCounter');
const carouselProgressFill = document.getElementById('carouselProgressFill');
const carouselDots = document.getElementById('carouselDots');

function createCarouselDots() {
  if (!carouselDots) return;
  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    carouselDots.appendChild(dot);
  }
}

function updateCarousel() {
  // Update track position
  if (carouselTrack) {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  // Update active slide
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  // Update counter
  if (carouselCounter) {
    carouselCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  }

  // Update progress
  if (carouselProgressFill) {
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    carouselProgressFill.style.width = progress + '%';
  }

  // Update dots
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
}

// Create dots
createCarouselDots();

// Auto-play carousel (optional)
let autoplayInterval = null;

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
}

// Start autoplay
startAutoplay();

// Pause on hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', stopAutoplay);
  carouselContainer.addEventListener('mouseleave', startAutoplay);
}

// Touch/swipe support for carousel
let touchStartX = 0;
let touchEndX = 0;

if (carouselContainer) {
  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  });

  carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  });
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
    stopAutoplay();
    setTimeout(startAutoplay, 3000);
  } else if (e.key === 'ArrowRight') {
    nextSlide();
    stopAutoplay();
    setTimeout(startAutoplay, 3000);
  }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Show success message
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    
    // Reset form
    contactForm.reset();
  });
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const floatShapes = document.querySelectorAll('.float-shape');
  
  floatShapes.forEach((shape, index) => {
    const speed = 0.1 + (index * 0.05);
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px)`;
  });
});

// Intersection Observer for scroll animations
const scrollAnimElements = document.querySelectorAll('.roadmap-card, .result-card');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

scrollAnimElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  scrollObserver.observe(element);
});

// Add hover tilt effect to feature cards
featureCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedScrollProgress = debounce(updateScrollProgress, 10);
window.removeEventListener('scroll', updateScrollProgress);
window.addEventListener('scroll', debouncedScrollProgress);

// Initialize AOS-like animations on load
window.addEventListener('load', () => {
  // Trigger any initial animations
  document.body.classList.add('loaded');
  
  // Set will-change on animated elements for performance
  const animatedElements = document.querySelectorAll('.feature-card, .timeline-item, .result-card');
  animatedElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
  });
});

// Clean up will-change after animations complete
setTimeout(() => {
  const animatedElements = document.querySelectorAll('.feature-card, .timeline-item, .result-card');
  animatedElements.forEach(el => {
    el.style.willChange = 'auto';
  });
}, 3000);

// Theme persistence (if user manually switches)
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

prefersDarkScheme.addEventListener('change', (e) => {
  // Update chart colors if theme changes
  if (benefitsChart) {
    benefitsChart.options.plugins.legend.labels.color = 
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-text').trim();
    benefitsChart.update();
  }
});

// Add loading state to buttons
const buttons = document.querySelectorAll('.btn, .btn-screen');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    if (this.classList.contains('loading')) return;
    
    // Add subtle click effect
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
  });
});

// Newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  const newsletterInput = document.querySelector('.newsletter-input');
  const newsletterBtn = document.querySelector('.newsletter-btn');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = newsletterInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        showNewsletterMessage('Por favor ingresa tu correo electrónico', 'error');
        return;
      }
      
      if (!emailRegex.test(email)) {
        showNewsletterMessage('Por favor ingresa un correo electrónico válido', 'error');
        return;
      }
      
      // Simulate newsletter subscription
      newsletterBtn.textContent = 'Suscribiendo...';
      newsletterBtn.disabled = true;
      
      setTimeout(() => {
        showNewsletterMessage('¡Gracias por suscribirte! Pronto recibirás nuestras novedades', 'success');
        newsletterInput.value = '';
        newsletterBtn.textContent = 'Suscribirse';
        newsletterBtn.disabled = false;
      }, 1500);
    });
  }
  
  function showNewsletterMessage(message, type) {
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      right: 0;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
      z-index: 10;
      background: ${type === 'success' ? '#00AA66' : '#C0152F'};
      color: white;
      transition: opacity 0.3s ease;
    `;
    
    const newsletterSection = document.querySelector('.footer-newsletter');
    newsletterSection.style.position = 'relative';
    newsletterSection.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }
});

// Console easter egg
console.log('%c🚀 MUNI - Cooperativa Digital', 'font-size: 20px; font-weight: bold; color: #1FB8CD;');
console.log('%c¿Interesado en unirte al equipo? Escríbenos a careers@muni.co', 'font-size: 12px; color: #626C71;');

// Performance monitoring
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
  });
}