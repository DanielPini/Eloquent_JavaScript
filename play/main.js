import { Character } from "./Character.js";
import { Overworld } from "./Overworld.js";
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const keys = { w: false, a: false, s: false, d: false };
const wizard = new Character(100, 100, 400, 400, 20, "./Wiz.png", 2);
const world = new Overworld("background.jpg");
window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) {
        const isRepeat = keys[key];
        keys[key] = true;
        if (key === "w" && !isRepeat)
            wizard.jump();
    }
});
window.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (key in keys)
        keys[key] = false;
});
const loop = () => {
    // Update internal canvas resolution
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    wizard.handleUpdate(keys);
    world.render(ctx, canvas, wizard);
    requestAnimationFrame(loop);
};
loop();
