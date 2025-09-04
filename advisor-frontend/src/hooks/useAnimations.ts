import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';
import { 
  createParallaxEffect, 
  createFloatingAnimation, 
  createMagneticEffect,
  createTextReveal,
  createScrollReveal,
  animationPresets
} from '../utils/animations';

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const cleanup = createParallaxEffect(elementRef.current, speed);
      return cleanup;
    }
  }, [speed]);

  return elementRef;
};

export const useFloatingAnimation = <T extends HTMLElement = HTMLDivElement>() => {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (elementRef.current) {
      animationRef.current = createFloatingAnimation(elementRef.current);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);

  return elementRef;
};

export const useMagneticEffect = <T extends HTMLElement = HTMLElement>(strength: number = 0.3) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (elementRef.current) {
      const cleanup = createMagneticEffect(elementRef.current, strength);
      return cleanup;
    }
  }, [strength]);

  return elementRef;
};

export const useTextReveal = <T extends HTMLElement = HTMLElement>() => {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<any>(null);

  const triggerReveal = useCallback(() => {
    if (elementRef.current && !animationRef.current) {
      animationRef.current = createTextReveal(elementRef.current);
    }
  }, []);

  return { elementRef, triggerReveal };
};

export const useScrollReveal = <T extends HTMLElement = HTMLElement>(options: any = {}) => {
  const elementsRef = useRef<T[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const addElement = useCallback((element: T) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
      
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    }
  }, []);

  useEffect(() => {
    if (elementsRef.current.length > 0) {
      observerRef.current = createScrollReveal(elementsRef.current, options);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  return { addElement };
};

export const usePageTransition = () => {
  const pageRef = useRef<HTMLElement>(null);

  const enterPage = useCallback(() => {
    if (pageRef.current) {
      anime({
        targets: pageRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  const exitPage = useCallback(() => {
    if (pageRef.current) {
      return new Promise<void>((resolve) => {
        anime({
          targets: pageRef.current,
          opacity: [1, 0],
          translateY: [0, -30],
          duration: 400,
          easing: 'easeInExpo',
          complete: () => resolve()
        });
      });
    }
    return Promise.resolve();
  }, []);

  return { pageRef, enterPage, exitPage };
};

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(delay: number = 100) => {
  const containerRef = useRef<T>(null);

  const animateChildren = useCallback((preset: any = animationPresets.fadeInUp) => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children) as HTMLElement[];
      
      anime({
        targets: children,
        ...preset,
        delay: anime.stagger(delay)
      });
    }
  }, [delay]);

  return { containerRef, animateChildren };
};
