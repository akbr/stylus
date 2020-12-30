import { applyAttrsToEl } from "./utils";

const getDeferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return [promise, resolve, reject];
};

export const wrapAnimInstance = (anim, el, finalAttrs) => {
  let [promise, resolve] = getDeferred();

  let isDone = false;

  const applyStylesAndResolve = () => {
    if (!isDone) {
      isDone = true;
      applyAttrsToEl(el, finalAttrs);
      resolve();
    }
  };

  anim.onfinish = applyStylesAndResolve;

  return {
    skip: () => {
      anim.finish();
      applyStylesAndResolve();
    },
    done: promise,
  };
};

export const wrapAllAnimInstances = (anims) => ({
  skip: () => anims.forEach((a) => a.skip()),
  done: Promise.all(anims.map((a) => a.done)),
});
