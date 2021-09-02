import type { InputStyles, Styles } from "./types";

const toPx = (val: number | string) =>
  typeof val === "string" ? val : `${val}px`;
const toDeg = (val: number) => `${val}deg`;
const passthrough = <T>(val: T) => val;

const shorthands = {
  x: {
    name: "translateX",
    unit: toPx,
  },
  y: {
    name: "translateY",
    unit: toPx,
  },
  scale: {
    name: "scale",
    unit: passthrough,
  },
  rotate: {
    name: "rotate",
    unit: toDeg,
  },
};

function extractShorthands(styles: InputStyles) {
  const transforms: InputStyles = {};
  const restStyles: Styles = {};
  Object.entries(styles).forEach(([key, value]) => {
    shorthands[key]
      ? (transforms[shorthands[key].name] = shorthands[key].unit(value))
      : (restStyles[key] = value);
  });
  return [transforms, restStyles] as const;
}

const reg = /(\w+)\(([^)]*)\)/g;
export function parseTransformString(tranformStr: string) {
  let transforms: InputStyles = {};
  let m: RegExpExecArray;
  while ((m = reg.exec(tranformStr))) transforms[m[1]] = m[2];
  return transforms;
}

export function handleTransforms(
  styles: InputStyles,
  currentTransform: string
) {
  let currentTransforms = parseTransformString(currentTransform);
  let [shorthandTransforms, modStyles] = extractShorthands(styles);

  let combo = {
    ...currentTransforms,
    ...shorthandTransforms,
  };

  let orderedString = Object.values(shorthands)
    .map(({ name }) => (combo[name] ? `${name}(${combo[name]})` : false))
    .filter((x) => x)
    .join(" ");

  modStyles.transform = orderedString;

  return modStyles;
}
