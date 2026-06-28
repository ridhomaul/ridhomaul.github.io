import { useEffect, useRef } from 'react';
import anime from 'animejs';

export function useSvgFilter(reducedMotion: boolean) {
  const filterRef = useRef<SVGSVGElement>(null);
  const animeInstance = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    if (reducedMotion || !filterRef.current) return;

    const turbulence = filterRef.current.querySelector('feTurbulence');
    
    if (turbulence) {
      // Instead of relying on SVG <animate> which can be janky or unsupported in some contexts,
      // we use Anime.js to smoothly animate the baseFrequency of feTurbulence.
      const proxy = { freqX: 0.01, freqY: 0.015 };
      
      animeInstance.current = anime({
        targets: proxy,
        freqX: 0.02,
        freqY: 0.025,
        duration: 10000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        update: () => {
          turbulence.setAttribute('baseFrequency', `${proxy.freqX} ${proxy.freqY}`);
        }
      });
    }

    return () => {
      if (animeInstance.current) {
        animeInstance.current.pause();
      }
    };
  }, [reducedMotion]);

  // Method to trigger an active "ripple" when clicked or hovered strongly
  const triggerRipple = () => {
    if (reducedMotion || !filterRef.current) return;
    
    const displacement = filterRef.current.querySelector('feDisplacementMap');
    if (displacement) {
      const proxy = { scale: 40 }; // Base scale in our SVG
      
      anime({
        targets: proxy,
        scale: [60, 40],
        duration: 1000,
        easing: 'easeOutElastic(1, .5)',
        update: () => {
          displacement.setAttribute('scale', String(proxy.scale));
        }
      });
    }
  };

  return { filterRef, triggerRipple };
}
