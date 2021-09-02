import { style } from "./src/";

let el = document.createElement("div");
el.style.position = "absolute";
el.style.width = "100px";
el.style.height = "100px";
el.style.backgroundColor = "pink";

document.body.appendChild(el);

style(el, { x: 100 });
style(el, { y: 100, rotate: 45 }, { duration: 1000 });
