/** @format */

import { renderLevel, towerInit } from './modules/level.js';
import { spawnWave, updateEnemies, enemies } from './modules/enemy.js';
import {
	mousePos,
	placementTiles,
	towers,
	projectileHitDetect,
} from './modules/utils.js';
import { drawUI } from './modules/player.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export const tileSize = 32;

towerInit();

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

	towers.forEach((tower) => {
		tower.draw();

		for (let i = tower.projectiles.length - 1; i >= 0; i--) {
			const projectile = tower.projectiles[i];
			projectile.update();
			projectileHitDetect(tower, projectile, i);
		}
	});

	drawUI();

	window.requestAnimationFrame(update);
}
