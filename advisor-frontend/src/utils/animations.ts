import anime from 'animejs';

// Animation presets for consistent styling
export const animationPresets = {
  fadeInUp: {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800,
    easing: 'easeOutExpo'
  },
  fadeInLeft: {
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    easing: 'easeOutExpo'
  },
  fadeInRight: {
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 800,
    easing: 'easeOutExpo'
  },
  scaleIn: {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 600,
    easing: 'easeOutBack'
  },
  slideInDown: {
    opacity: [0, 1],
    translateY: [-100, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  },
  stagger: {
    delay: anime.stagger(100)
  }
};

// Parallax scrolling effect
export const createParallaxEffect = (element: HTMLElement, speed: number = 0.5) => {
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -speed;
    element.style.transform = `translateY(${rate}px)`;
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};

// Floating animation for decorative elements
export const createFloatingAnimation = (element: HTMLElement) => {
  return anime({
    targets: element,
    translateY: [-10, 10],
    duration: 3000,
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop: true
  });
};

// Magnetic hover effect
export const createMagneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    anime({
      targets: element,
      translateX: x * strength,
      translateY: y * strength,
      duration: 150,
      easing: 'easeOutQuad'
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: element,
      translateX: 0,
      translateY: 0,
      duration: 300,
      easing: 'easeOutElastic(1, .6)'
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Text reveal animation
export const createTextReveal = (element: HTMLElement) => {
  const text = element.textContent || '';
  element.innerHTML = '';
  
  const chars = text.split('').map(char => 
    char === ' ' ? '&nbsp;' : `<span style="display: inline-block; opacity: 0;">${char}</span>`
  ).join('');
  
  element.innerHTML = chars;
  
  return anime({
    targets: element.querySelectorAll('span'),
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800,
    delay: anime.stagger(50),
    easing: 'easeOutExpo'
  });
};

// Morphing blob animation
export const createMorphingBlob = (element: HTMLElement) => {
  const paths = [
    'M20,20 Q40,0 60,20 T100,20 T140,20 T180,20 T220,20 Q240,40 220,60 T180,60 T140,60 T100,60 T60,60 T20,60 Q0,40 20,20 Z',
    'M20,20 Q0,40 20,60 T60,60 T100,60 T140,60 T180,60 T220,60 Q240,40 220,20 T180,20 T140,20 T100,20 T60,20 T20,20 Z',
    'M20,40 Q0,20 20,20 T60,20 T100,20 T140,20 T180,20 T220,20 Q240,20 220,40 T180,40 T140,40 T100,40 T60,40 T20,40 Z'
  ];

  let currentPath = 0;
  
  return anime({
    targets: element,
    d: paths,
    duration: 4000,
    easing: 'easeInOutSine',
    loop: true,
    update: function() {
      currentPath = (currentPath + 1) % paths.length;
    }
  });
};

// Particle system
export const createParticleSystem = (container: HTMLElement, count: number = 50) => {
  const particles: HTMLElement[] = [];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    particles.push(particle);
  }
  
  // Animate particles
  particles.forEach((particle, index) => {
    anime({
      targets: particle,
      translateY: [0, -100],
      opacity: [0, 1, 0],
      duration: 3000 + Math.random() * 2000,
      delay: index * 100,
      easing: 'easeOutQuart',
      loop: true
    });
  });
  
  return particles;
};

// Smooth scroll reveal
export const createScrollReveal = (elements: HTMLElement[], options: any = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        anime({
          targets: element,
          ...animationPresets.fadeInUp,
          complete: () => {
            observer.unobserve(element);
          }
        });
      }
    });
  }, defaultOptions);
  
  elements.forEach(element => observer.observe(element));
  
  return observer;
};
