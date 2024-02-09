import { ctx } from "../main.js";

let lives = 10;
let gold = 100;

export function takeDamage(damage) {
    lives -= damage;
    if (lives <= 0) {
        console.log("game over");
    }
}

export function drawUI() {
    ctx.fillStyle = "white";
    ctx.font = "16px sans-serif";
    ctx.fillText("Lives: " + lives, 800, 24);
    ctx.fillText("Gold: " + gold, 800, 48);
}