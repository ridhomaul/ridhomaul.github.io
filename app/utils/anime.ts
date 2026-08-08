import { animate, remove, stagger, createTimeline } from "animejs";

const anime = (options: any) => {
  const { targets, easing, ...parameters } = options;
  // Map v3 `easing` to v4 `ease` for backward compatibility
  if (easing && !parameters.ease) {
    parameters.ease = easing;
  }
  return animate(targets, parameters);
};
anime.remove = remove;
anime.stagger = stagger;
anime.timeline = createTimeline;

export default anime;
