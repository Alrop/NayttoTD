import { renderLevel } from "./modules/level.js";
import { Enemy } from "./modules/enemy.js";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const tileSize = 32;

let lastTime = 0;

let enemy = new Enemy(10, 0.1);
update();

function update() {
    const currentTime = new Date().getTime();
    const deltaTime = Math.min((currentTime - lastTime), 50);
    lastTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderLevel();
    enemy.update(deltaTime);

    window.requestAnimationFrame(update);
}