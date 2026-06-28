import { useEffect } from 'react';
import anime from 'animejs';

export function useCardInteraction(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    const cards = document.querySelectorAll('.anime-card');
    const handlers = new Map();

    cards.forEach((card) => {
      const htmlCard = card as HTMLElement;
      
      let glow = htmlCard.querySelector('.anime-card-glow') as HTMLDivElement;
      if (!glow) {
        glow = document.createElement('div');
        glow.className = 'anime-card-glow';
        glow.style.position = 'absolute';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.width = '100%';
        glow.style.height = '100%';
        glow.style.pointerEvents = 'none';
        glow.style.background = 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)';
        glow.style.opacity = '0';
        glow.style.mixBlendMode = 'overlay';
        glow.style.zIndex = '10';
        glow.style.transition = 'opacity 0.3s ease';
        
        if (getComputedStyle(htmlCard).position === 'static') {
          htmlCard.style.position = 'relative';
        }
        htmlCard.appendChild(glow);
      }

      let isHovering = false;

      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovering) return;
        
        const rect = htmlCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        if (glow) {
          glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 60%)`;
        }

        anime({
          targets: htmlCard,
          rotateX,
          rotateY,
          duration: 100,
          easing: 'linear'
        });
      };

      const handleMouseEnter = () => {
        isHovering = true;
        if (glow) glow.style.opacity = '1';
        
        anime({
          targets: htmlCard,
          translateY: -8,
          scale: 1.02,
          duration: 400,
          easing: 'easeOutElastic(1, .8)'
        });
      };

      const handleMouseLeave = () => {
        isHovering = false;
        if (glow) glow.style.opacity = '0';
        
        anime({
          targets: htmlCard,
          rotateX: 0,
          rotateY: 0,
          translateY: 0,
          scale: 1,
          duration: 600,
          easing: 'easeOutElastic(1, .5)'
        });
      };

      htmlCard.addEventListener('mouseenter', handleMouseEnter);
      htmlCard.addEventListener('mouseleave', handleMouseLeave);
      htmlCard.addEventListener('mousemove', handleMouseMove);

      handlers.set(htmlCard, { handleMouseEnter, handleMouseLeave, handleMouseMove, glow });
    });

    return () => {
      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        const h = handlers.get(htmlCard);
        if (h) {
          htmlCard.removeEventListener('mouseenter', h.handleMouseEnter);
          htmlCard.removeEventListener('mouseleave', h.handleMouseLeave);
          htmlCard.removeEventListener('mousemove', h.handleMouseMove);
          if (h.glow && h.glow.parentNode) {
            h.glow.remove();
          }
        }
      });
    };
  }, [reducedMotion]);
}
