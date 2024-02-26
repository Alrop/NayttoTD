/** @format */

import { ctx, canvas, deltaTime, restart } from '../main.js';
import { totalWave } from './wave.js';

export let gameOver = false;

const gameOverFadeInTime = 1000;
const startingLives = 10;
const startingGold = 100;

let gameOverTimer = 0;
let gold = startingGold;
let lives = startingLives;

export function setGold(amount) {
	if (gold + amount < 0) {
		return false;
	}

	gold += amount;
}

export function canAfford(cost) {
	if (cost <= gold) {
		gold -= cost;
		return true;
	} else {
		return false;
	}
}

export function takeDamage(damage) {
	if (!gameOver) {
		lives -= damage;
	}
	if (lives <= 0) {
		gameOver = true;
		console.log('game over');
	}
}

export function drawUI() {
    ctx.fillStyle = "white";
    ctx.font = "16px sans-serif";
	ctx.textAlign = "start";
    ctx.fillText("Lives: " + lives, 780, 25);
    ctx.fillText("Gold: " + gold, 780, 50);
    ctx.fillText("Wave: " + totalWave, 780, 75);

	if (gameOver) {
		gameOverTimer += deltaTime;

		// Fade in
		ctx.globalAlpha = gameOverTimer / gameOverFadeInTime;

		// Dark background
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Game over text
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 4;
		ctx.shadowColor = "black";
		ctx.fillStyle = "red";
		ctx.font = "32px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

		// Reset values
		ctx.globalAlpha = 1.0;
		ctx.shadowColor = "rgba(0, 0, 0, 0)";

		if (gameOverTimer > 15000) {
			restart();
		}
	}
}

export function resetPlayer() {
	gameOver = false;
	gameOverTimer = 0;
	gold = startingGold;
	lives = startingLives;
}