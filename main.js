/** @format */

import { loadLevel, renderLevel } from './modules/level.js';
import { spawnWave, updateEnemies, enemies } from './modules/enemy.js';
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

loadLevel();
// towerInit();

let lastTime = 0;

spawnWave({ health: 10, damage: 1, speed: 0.1 }, 10, 1000);
update();

function update() {
	const currentTime = new Date().getTime();
	const deltaTime = Math.min(currentTime - lastTime, 50);
	lastTime = currentTime;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	placementTiles.forEach((tile) => {
		tile.update(mousePos);
	});

	renderLevel();
	updateEnemies(deltaTime);

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
