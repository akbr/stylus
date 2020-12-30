export default (attrs, el) => {
  let transformAttrs = getTransformObject(el.style.transform);
  let restAttrs = {};

  let shorthands = {
    x: "translateX",
    y: "translateY",
  };

  Object.entries(attrs).forEach(([key, value]) => {
    key = shorthands[key] ? shorthands[key] : key;
    transformKeys[key]
      ? (transformAttrs[key] = value)
      : (restAttrs[key] = value);
  });

  if (Object.keys(transformAttrs).length) {
    restAttrs.transform = getTransformString(transformAttrs);
    return restAttrs;
  } else {
    return attrs;
  }
};

// -- parseTransform --

const isNonZeroNumber = (n) => typeof n === "number" && n !== 0;
export const ensureArray = (v) => (Array.isArray(v) ? v : [v]);
const safeString = (v) => (v === undefined ? "" : String(v));
const maybeAddUnit = (value, unit) =>
  safeString(value) + (isNonZeroNumber(value) ? unit : "");
const stringifyValue = (value, unit, addUnits) =>
  ensureArray(value)
    .map((value) => (addUnits ? maybeAddUnit(value, unit) : value))
    .filter((v) => v !== "")
    .join(", ");
const getStringifiers = (addUnits) => {
  const degrees = (v) => stringifyValue(v, "deg", addUnits);
  const pixels = (v) => stringifyValue(v, "px", addUnits);
  const unitless = (v) => stringifyValue(v, "", false);
  const stringifiers = {
    translateX: (v) => `translateX(${pixels(v)})`,
    translateY: (v) => `translateY(${pixels(v)})`,
    z: (v) => `translateZ(${pixels(v)})`,
    translate: (v) => `translate(${pixels(v)})`,
    translate3d: (v) => `translate3d(${pixels(v)})`,
    scale: (v) => `scale(${unitless(v)})`,
    scaleX: (v) => `scaleX(${unitless(v)})`,
    scaleY: (v) => `scaleY(${unitless(v)})`,
    scaleZ: (v) => `scaleZ(${unitless(v)})`,
    scale3d: (v) => `scale3d(${unitless(v)})`,
    rotate: (v) => `rotate(${degrees(v)})`,
    rotateX: (v) => `rotateX(${degrees(v)})`,
    rotateY: (v) => `rotateY(${degrees(v)})`,
    rotateZ: (v) => `rotateZ(${degrees(v)})`,
    skew: (v) => `skew(${degrees(v)})`,
    skewX: (v) => `skewX(${degrees(v)})`,
    skewY: (v) => `skewY(${degrees(v)})`,
    perspective: (v) => `perspective(${pixels(v)})`,
  };
  return stringifiers;
};
const stringifiers = getStringifiers(true);
const doTransform = (s, t) =>
  Object.entries(t || {})
    .map(([name, value]) => {
      const stringifier = s[name];
      if (!stringifier) throw new Error(`Property '${name}' is not supported`);
      return stringifier(value);
    })
    .join(" ");

export function getTransformObject(str) {
  const reg = /(\w+)\(([^)]*)\)/g;
  const transforms = {};
  let m;
  while ((m = reg.exec(str))) transforms[m[1]] = m[2];
  return transforms;
}

export const transformKeys = stringifiers;
export const getTransformString = (t) => doTransform(stringifiers, t);
