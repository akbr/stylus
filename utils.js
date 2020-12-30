export const ensureArray = (v) => (Array.isArray(v) ? v : [v]);

export const mapObj = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(fn));

export const applyAttrsToEl = (el, attrs) => {
  Object.entries(attrs).forEach(([key, value]) => (el.style[key] = value));
};

export const fillArrayWith = (x, length) => Array.from({ length }).map(() => x);

export const getElementsArray = (targets) => {
  if (typeof targets === "string") targets = document.querySelectorAll(targets);
  if (targets instanceof NodeList) targets = Array.from(targets);
  return ensureArray(targets);
};
