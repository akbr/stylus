function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "style", () => $452e53f6072faa22$export$12da13d4956dfb58);
const $79f148e79a4ca2b1$var$shorthands = {
    x: {
        name: "translateX",
        unit: (val)=>typeof val === "string" ? val : `${val}px`
    },
    y: {
        name: "translateY",
        unit: (val)=>typeof val === "string" ? val : `${val}px`
    },
    scale: {
        name: "scale",
        unit: (val)=>val
    },
    rotate: {
        name: "rotate",
        unit: (val)=>`${val}deg`
    }
};
function $79f148e79a4ca2b1$var$extractShorthands(styles) {
    const transforms = {
    };
    const restStyles = {
    };
    Object.entries(styles).forEach(([key, value])=>{
        $79f148e79a4ca2b1$var$shorthands[key] ? transforms[$79f148e79a4ca2b1$var$shorthands[key].name] = $79f148e79a4ca2b1$var$shorthands[key].unit(value) : restStyles[key] = value;
    });
    return [
        transforms,
        restStyles
    ];
}
const $79f148e79a4ca2b1$var$reg = /(\w+)\(([^)]*)\)/g;
function $79f148e79a4ca2b1$export$315e12993ac46b1f(tranformStr) {
    let transforms = {
    };
    let m;
    while(m = $79f148e79a4ca2b1$var$reg.exec(tranformStr))transforms[m[1]] = m[2];
    return transforms;
}
function $79f148e79a4ca2b1$export$258ba35848551859(styles, currentTransform) {
    let currentTransforms = $79f148e79a4ca2b1$export$315e12993ac46b1f(currentTransform);
    let [shorthandTransforms, modStyles] = $79f148e79a4ca2b1$var$extractShorthands(styles);
    let combo = {
        ...currentTransforms,
        ...shorthandTransforms
    };
    let orderedString = Object.values($79f148e79a4ca2b1$var$shorthands).map(({ name: name  })=>combo[name] ? `${name}(${combo[name]})` : false
    ).filter((x)=>x
    ).join(" ");
    modStyles.transform = orderedString;
    return modStyles;
}


function $452e53f6072faa22$var$applyStyles(styles, el) {
    Object.entries(styles).forEach(([key, value])=>el.style[key] = value
    );
}
function $452e53f6072faa22$export$12da13d4956dfb58(el, styles, animationOptions) {
    const modStyles = $79f148e79a4ca2b1$export$258ba35848551859(styles, el.style.transform);
    if (!animationOptions) {
        $452e53f6072faa22$var$applyStyles(modStyles, el);
        return;
    }
    const animation = el.animate(modStyles, animationOptions);
    animation.finished.then(()=>{
        $452e53f6072faa22$var$applyStyles(modStyles, el);
    });
    return {
        skip: ()=>animation.finish()
        ,
        finished: animation.finished
    };
}


//# sourceMappingURL=main.js.map
