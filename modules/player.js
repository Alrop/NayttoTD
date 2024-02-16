/** @format */

import { ctx } from '../main.js';
import { totalWave } from './wave.js';

let gold = 100;
let lives = 10;

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
	lives -= damage;
	if (lives <= 0) {
		console.log('game over');
	}
}

export function drawUI() {
    ctx.fillStyle = "white";
    ctx.font = "16px sans-serif";
    ctx.fillText("Lives: " + lives, 780, 25);
    ctx.fillText("Gold: " + gold, 780, 50);
    ctx.fillText("Wave: " + totalWave, 780, 75);
}
