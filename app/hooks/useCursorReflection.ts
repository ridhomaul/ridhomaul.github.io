import { useEffect, useRef } from 'react';
import anime from "animejs";

export function useCursorReflection(reducedMotion: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    // We create a global overlay that strictly captures pointer events as 'none'
    // but displays a soft ambient radial light following the cursor.
    const cursorLight = document.createElement('div');
    cursorLight.style.position = 'fixed';
    cursorLight.style.top = '0';
    cursorLight.style.left = '0';
    cursorLight.style.width = '100vw';
    cursorLight.style.height = '100vh';
    cursorLight.style.pointerEvents = 'none';
    cursorLight.style.zIndex = '9998'; // Just below standard fixed navs
    cursorLight.style.opacity = '0';
    cursorLight.style.transition = 'opacity 0.5s ease';
    
    // We start with a generic offscreen coordinate
    cursorLight.style.background = 'radial-gradient(600px circle at -100px -100px, rgba(168, 85, 247, 0.05), transparent 40%)';
    
    document.body.appendChild(cursorLight);

    let isMouseActive = false;

    // For smooth performance, we use anime.js to tween the background position directly
    // Wait, animating CSS background gradients frequently can cause paint thrashing.
    // A better approach is to animate a physical div's transform!
    
    document.body.removeChild(cursorLight); // Remove the gradient background approach

    // Better Approach: A floating orb div with transform translate.
    const orb = document.createElement('div');
    orb.style.position = 'fixed';
    orb.style.top = '-300px'; // center offset
    orb.style.left = '-300px';
    orb.style.width = '600px';
    orb.style.height = '600px';
    orb.style.pointerEvents = 'none';
    orb.style.zIndex = '9998';
    orb.style.opacity = '0';
    orb.style.borderRadius = '50%';
    orb.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, transparent 60%)';
    orb.style.mixBlendMode = 'screen';
    orb.style.transition = 'opacity 0.5s ease';
    
    document.body.appendChild(orb);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseActive) {
        isMouseActive = true;
        orb.style.opacity = '1';
      }

      // Smooth lag effect using anime.js
      anime({
        targets: orb,
        translateX: e.clientX,
        translateY: e.clientY,
        duration: 800,
        easing: 'easeOutExpo'
      });
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      orb.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      if (orb && orb.parentNode) {
        orb.remove();
      }
    };
  }, [reducedMotion]);

  return { containerRef };
}
