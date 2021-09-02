const $c7cce75c2ca7c86d$var$shorthands = {
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
function $c7cce75c2ca7c86d$var$extractShorthands(styles) {
    const transforms = {
    };
    const restStyles = {
    };
    Object.entries(styles).forEach(([key, value])=>{
        $c7cce75c2ca7c86d$var$shorthands[key] ? transforms[$c7cce75c2ca7c86d$var$shorthands[key].name] = $c7cce75c2ca7c86d$var$shorthands[key].unit(value) : restStyles[key] = value;
    });
    return [
        transforms,
        restStyles
    ];
}
const $c7cce75c2ca7c86d$var$reg = /(\w+)\(([^)]*)\)/g;
function $c7cce75c2ca7c86d$export$315e12993ac46b1f(tranformStr) {
    let transforms = {
    };
    let m;
    while(m = $c7cce75c2ca7c86d$var$reg.exec(tranformStr))transforms[m[1]] = m[2];
    return transforms;
}
function $c7cce75c2ca7c86d$export$258ba35848551859(styles, currentTransform) {
    let currentTransforms = $c7cce75c2ca7c86d$export$315e12993ac46b1f(currentTransform);
    let [shorthandTransforms, modStyles] = $c7cce75c2ca7c86d$var$extractShorthands(styles);
    let combo = {
        ...currentTransforms,
        ...shorthandTransforms
    };
    let orderedString = Object.values($c7cce75c2ca7c86d$var$shorthands).map(({ name: name  })=>combo[name] ? `${name}(${combo[name]})` : false
    ).filter((x)=>x
    ).join(" ");
    modStyles.transform = orderedString;
    return modStyles;
}


function $29132bf5159c333f$var$applyStyles(styles, el) {
    Object.entries(styles).forEach(([key, value])=>el.style[key] = value
    );
}
function $29132bf5159c333f$export$12da13d4956dfb58(el, styles, animationOptions) {
    const modStyles = $c7cce75c2ca7c86d$export$258ba35848551859(styles, el.style.transform);
    if (!animationOptions) {
        $29132bf5159c333f$var$applyStyles(modStyles, el);
        return;
    }
    const animation = el.animate(modStyles, animationOptions);
    animation.finished.then(()=>{
        $29132bf5159c333f$var$applyStyles(modStyles, el);
    });
    return {
        skip: ()=>animation.finish()
        ,
        finished: animation.finished
    };
}


export {$29132bf5159c333f$export$12da13d4956dfb58 as style};
//# sourceMappingURL=module.js.map
