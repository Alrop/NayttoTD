/** @format */

import { loadLevel, renderLevel } from './modules/level.js';
import {
	updateEnemies,
	enemies,
} from './modules/enemy.js';
import { updateWave } from './modules/wave.js';
import {
	mousePos,
	placementTiles,
	towers,
	projectileHitDetect,
	targetRangeValidator,
} from './modules/utils.js';
import { drawUI } from './modules/player.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export const tileSize = 32;

export let deltaTime = 0;

loadLevel();
// towerInit();

let lastTime = 0;

update();

function update() {
	const currentTime = new Date().getTime();
	deltaTime = Math.min(currentTime - lastTime, 50);
	lastTime = currentTime;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	placementTiles.forEach((tile) => {
		tile.update(mousePos);
	});

	renderLevel();
	updateEnemies();
	updateWave();

	// Check if enemy in range of tower
	towers.forEach((tower) => {
		tower.update();
		tower.target = null;
		const validTarget = enemies.filter((enemy) => {
			return targetRangeValidator(enemy, tower);
		});
		// If true then shoot at enemy
		tower.target = validTarget[0];
		for (let i = tower.projectiles.length - 1; i >= 0; i--) {
			const projectile = tower.projectiles[i];
			projectile.update();
			projectileHitDetect(tower, projectile, i);
		}
	});

	drawUI();

	window.requestAnimationFrame(update);
}
