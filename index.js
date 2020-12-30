import patchInTransform from "./patchInTransform";
import { wrapAnimInstance, wrapAllAnimInstances } from "./wrap";
import {
  mapObj,
  applyAttrsToEl,
  fillArrayWith,
  getElementsArray,
} from "./utils";

const computeValues = (attrs, elsIndex, elsArray) =>
  mapObj(attrs, (entry) => {
    const [key, value] = entry;
    return typeof value === "function"
      ? [key, value(elsIndex, elsArray.length)]
      : entry;
  });

export default function style(targets, attrs, animOptions) {
  const els = getElementsArray(targets);

  let initialAttrs = Array.isArray(attrs)
    ? attrs
    : fillArrayWith(attrs, els.length);

  const finalAttrs = initialAttrs
    .map(computeValues)
    .map((attr, idx) => patchInTransform(attr, els[idx]));

  // Break off for a syncrnous resolve
  if (!animOptions) {
    els.forEach((el, idx) => applyAttrsToEl(el, finalAttrs[idx]));
    return;
  }

  // ... continue for an animation
  const initialAnimOptions = Array.isArray(animOptions)
    ? attrs
    : fillArrayWith(animOptions, els.length);

  const finalAnimOptions = initialAnimOptions.map(computeValues);

  const animInstances = els.map((el, idx) => {
    const animInstance = el.animate(finalAttrs[idx], finalAnimOptions[idx]);
    return wrapAnimInstance(animInstance, el, finalAttrs[idx]);
  });

  return wrapAllAnimInstances(animInstances);
}

export function animate(targets, keyframes, animOptions) {
  const els = getElementsArray(targets);

  const animInstances = els.map((el) => {
    const animInstance = el.animate(keyframes, animOptions);
    return wrapAnimInstance(animInstance, el, keyframes[keyframes.length - 1]);
  });

  return wrapAllAnimInstances(animInstances);
}
