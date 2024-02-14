import { ctx } from "../main.js";

export let gold = 100;
let lives = 10;

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