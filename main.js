import { renderLevel } from "./modules/level.js";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const tileSize = 32;

let lastTime = 0;

update();

function update() {
    const currentTime = new Date().getTime();
    const deltaTime = Math.min((currentTime - lastTime), 50);
    lastTime = currentTime;

    renderLevel();

    window.requestAnimationFrame(update);
}