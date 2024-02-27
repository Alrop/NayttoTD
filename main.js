/** @format */

import { loadLevel, renderLevel, tiles } from './modules/level.js';
import { updateEnemies, enemies } from './modules/enemy.js';
import { resetWave, updateWave } from './modules/wave.js';
import {
	placementTiles,
	towers,
	projectileHitDetect,
	targetRangeValidator,
} from './modules/utils.js';
import { drawUI, resetPlayer } from './modules/player.js';

export const canvas = document.getElementById('canvas');
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

	renderLevel();
	placementTiles.forEach((tile) => {
		tile.update();
		if (tile.tower) {
			tile.tower.update();
			tile.tower.target = null;
			// Check if enemy in range of tower
			const validTarget = enemies.filter((enemy) => {
				return targetRangeValidator(enemy, tile.tower);
			});
			// If true then shoot at enemy
			tile.tower.target = validTarget[0];
			for (let i = tile.tower.projectiles.length - 1; i >= 0; i--) {
				const projectile = tile.tower.projectiles[i];
				projectile.update();
				projectileHitDetect(tile.tower, projectile, i);
			}
		}
	});
	updateEnemies();
	updateWave();
	drawUI();

	window.requestAnimationFrame(update);
}

export function restart() {
	tiles.length = 0;
	enemies.length = 0;
	placementTiles.length = 0;
	towers.length = 0;

	resetPlayer();
	resetWave();
	loadLevel();
}
