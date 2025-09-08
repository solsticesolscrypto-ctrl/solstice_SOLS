// ================================================
// SISTEMA DE INTERACTIVIDAD AVANZADA SOLSTICE
// ================================================

class SolsticeEffects {
  constructor() {
    this.init();
  }

  init() {
    this.createParticles();
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
    this.setupTypewriterEffect();
    this.setupParallaxEffects();
    this.setupMobileMenu();
  }

  // Sistema de partículas de fondo
  createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      this.createParticle(particlesContainer);
    }

    // Crear nuevas partículas cada 3 segundos
    setInterval(() => {
      this.createParticle(particlesContainer);
    }, 3000);
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
  const startX = Math.random() * window.innerWidth;
    const duration = 8 + Math.random() * 4;
    const size = 1 + Math.random() * 3;
    
    particle.style.left = startX + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
  particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Eliminar partícula después de la animación
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, (duration + 2) * 1000);
  }

  // Observer para animaciones de intersección
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Efecto de contador para números
          if (entry.target.hasAttribute('data-count')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos con clases de animación
    document.querySelectorAll('.intersection-fade, .intersection-slide-left, .intersection-slide-right').forEach(el => {
      observer.observe(el);
    });
  }

  // Efecto de contador animado
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  // Scroll suave mejorado
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Efecto typewriter para títulos
  setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typing-effect');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.width = '0';
      
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          element.style.borderRight = 'none';
        }
      }, 100);
    });
  }

  // Efectos parallax suaves
  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Menú móvil mejorado
  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      });

      if (mobileClose) {
        mobileClose.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
        });
      }

      // Cerrar al hacer click en los enlaces
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
        });
      });

      // Cerrar con Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });
    }
  }

  // Efectos de hover mejorados para cards
  enhanceCardEffects() {
    document.querySelectorAll('.modern-card').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
    });
  }

  // Actualización de tema dinámico
  setupDynamicTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersContrast = window.matchMedia('(prefers-contrast: high)');
    
    const updateTheme = () => {
      if (prefersContrast.matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };

    prefersDark.addListener(updateTheme);
    prefersContrast.addListener(updateTheme);
    updateTheme();
  }

  // Performance monitoring
  setupPerformanceMonitoring() {
    if ('IntersectionObserver' in window) {
      const perfObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Lazy load optimizations
            entry.target.classList.add('loaded');
          }
        });
      });

      document.querySelectorAll('.card, .modern-card').forEach(el => {
        perfObserver.observe(el);
      });
    }
  }
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new SolsticeEffects();
});

// Funciones de utilidad globales
window.SolsticeUtils = {
  // Formatear números con separadores
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  // Copiar texto al portapapeles
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
  console.warn('copyToClipboard failed', err);
      return false;
    }
  },

  // Debounce para optimizar eventos
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Exportar para uso en módulos
export default SolsticeEffects;
