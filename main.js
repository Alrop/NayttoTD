/** @format */

import { renderLevel } from './modules/level.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export const tileSize = 32;
export const placementTiles = [];

let lastTime = 0;

update();

function update() {
	const currentTime = new Date().getTime();
	const deltaTime = Math.min(currentTime - lastTime, 50);
	lastTime = currentTime;

	placementTiles.forEach((tile) => {
		tile.draw();
	});

	renderLevel();

	window.requestAnimationFrame(update);
}
