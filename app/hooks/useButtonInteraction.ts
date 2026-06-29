import { useEffect } from 'react';
import anime from "animejs";

export function useButtonInteraction(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    const buttons = document.querySelectorAll('.anime-button');
    const handlers = new Map();

    buttons.forEach((btn) => {
      let isHovering = false;
      const htmlBtn = btn as HTMLElement;

      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovering) return;
        const rect = htmlBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        anime({
          targets: htmlBtn,
          translateX: x * 0.2, 
          translateY: y * 0.2,
          duration: 200,
          easing: 'easeOutQuad',
        });
      };

      const handleMouseEnter = () => {
        isHovering = true;
        anime({
          targets: htmlBtn,
          scale: 1.05,
          duration: 400,
          easing: 'easeOutElastic(1, .5)',
        });
      };

      const handleMouseLeave = () => {
        isHovering = false;
        anime({
          targets: htmlBtn,
          translateX: 0,
          translateY: 0,
          scale: 1,
          duration: 600,
          easing: 'easeOutElastic(1, .5)',
        });
      };

      const handleClick = (e: MouseEvent) => {
        const rect = htmlBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('anime-ripple');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.left = `${x - 10}px`;
        ripple.style.top = `${y - 10}px`;
        ripple.style.zIndex = '0';
        
        if (getComputedStyle(htmlBtn).position === 'static') {
          htmlBtn.style.position = 'relative';
        }
        htmlBtn.style.overflow = 'hidden';
        
        htmlBtn.appendChild(ripple);

        anime({
          targets: ripple,
          scale: 15,
          opacity: 0,
          duration: 600,
          easing: 'easeOutSine',
          complete: () => {
            ripple.remove();
          }
        });
      };

      htmlBtn.addEventListener('mouseenter', handleMouseEnter);
      htmlBtn.addEventListener('mouseleave', handleMouseLeave);
      htmlBtn.addEventListener('mousemove', handleMouseMove);
      htmlBtn.addEventListener('click', handleClick);

      handlers.set(htmlBtn, { handleMouseEnter, handleMouseLeave, handleMouseMove, handleClick });
    });

    return () => {
      buttons.forEach((btn) => {
        const htmlBtn = btn as HTMLElement;
        const h = handlers.get(htmlBtn);
        if (h) {
          htmlBtn.removeEventListener('mouseenter', h.handleMouseEnter);
          htmlBtn.removeEventListener('mouseleave', h.handleMouseLeave);
          htmlBtn.removeEventListener('mousemove', h.handleMouseMove);
          htmlBtn.removeEventListener('click', h.handleClick);
        }
      });
    };
  }, [reducedMotion]);
}
