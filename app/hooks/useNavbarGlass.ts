import { useEffect, useRef } from 'react';
import anime from "animejs";

export function useNavbarGlass(reducedMotion: boolean) {
  const navRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (reducedMotion || !navRef.current) return;
    
    const nav = navRef.current;
    
    // Animate the two sweeping reflection layers using anime.js instead of CSS keyframes
    const sweep1 = nav.querySelector('.anime-sweep-1');
    const sweep2 = nav.querySelector('.anime-sweep-2');

    if (sweep1) {
      anime({
        targets: sweep1,
        translateX: ['-150%', '250%'],
        opacity: [
          { value: 0, duration: 1000 },
          { value: 0.9, duration: 1000 },
          { value: 0, duration: 1000 },
          { value: 0, duration: 5000 }
        ],
        duration: 8000,
        easing: 'cubicBezier(0.25, 1, 0.5, 1)',
        loop: true,
      });
    }

    if (sweep2) {
      anime({
        targets: sweep2,
        translateX: ['-150%', '250%'],
        opacity: [
          { value: 0, duration: 1500 },
          { value: 0.5, duration: 1500 },
          { value: 0, duration: 1500 },
          { value: 0, duration: 7500 }
        ],
        duration: 12000,
        delay: 2000,
        easing: 'cubicBezier(0.25, 1, 0.5, 1)',
        loop: true,
      });
    }

    return () => {
      if (sweep1) anime.remove(sweep1);
      if (sweep2) anime.remove(sweep2);
    };
  }, [reducedMotion]);

  // Method to handle hover on navigation items (micro-interaction)
  const handleItemHover = (el: HTMLElement) => {
    if (reducedMotion) return;
    
    // Scale the whole item container slightly
    anime({
      targets: el,
      scale: 1.05,
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });
    
    // Pulse the icon and add a subtle glow
    const icon = el.querySelector('svg');
    if (icon) {
      anime({
        targets: icon,
        scale: 1.15,
        filter: 'drop-shadow(0px 0px 8px rgba(168,85,247,0.6))',
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
  };
  
  const handleItemLeave = (el: HTMLElement) => {
    if (reducedMotion) return;
    
    anime({
      targets: el,
      scale: 1,
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });
    
    const icon = el.querySelector('svg');
    if (icon) {
      anime({
        targets: icon,
        scale: 1,
        filter: 'drop-shadow(0px 0px 0px rgba(168,85,247,0))',
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
  };

  return { navRef, handleItemHover, handleItemLeave };
}
