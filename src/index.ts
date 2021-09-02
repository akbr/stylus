import type { InputStyles, Styles, AnimationOptions, Controls } from "./types";
import { handleTransforms } from "./transforms";

function applyStyles(styles: Styles, el: HTMLElement) {
  Object.entries(styles).forEach(([key, value]) => (el.style[key] = value));
}

export function style(el: HTMLElement, styles: InputStyles): void;
export function style(
  el: HTMLElement,
  styles: InputStyles,
  animationOptions: AnimationOptions
): Controls;

export function style(
  el: HTMLElement,
  styles: Styles,
  animationOptions?: AnimationOptions
): void | Controls {
  const modStyles = handleTransforms(styles, el.style.transform);

  if (!animationOptions) {
    applyStyles(modStyles, el);
    return;
  }

  const animation = el.animate(modStyles, animationOptions);

  animation.finished.then(() => {
    applyStyles(modStyles, el);
  });

  return {
    skip: () => animation.finish(),
    finished: animation.finished,
  };
}
