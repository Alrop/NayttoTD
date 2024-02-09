/** @format */

import { renderLevel, towerInit } from './modules/level.js';
import { spawnWave, updateEnemies } from './modules/enemy.js';
import { Tower } from './towers.js';
import { drawUI } from './modules/player.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export const tileSize = 32;
export const placementTiles = [];
export const towers = [];

towerInit();
const mousePos = {
	x: undefined,
	y: undefined,
};
let currentTile = undefined;

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
		tower.projectiles.forEach((projectile) => {
			projectile.update();
		});
	});

	drawUI();

	window.requestAnimationFrame(update);
}

// Update mouse position when moved.
window.addEventListener('mousemove', (event) => {
	let rect = canvas.getBoundingClientRect();
	mousePos.x =
		((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
	mousePos.y =
		((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;

	currentTile = null;

	for (let i = 0; i < placementTiles.length; i++) {
		const tile = placementTiles[i];
		if (
			mousePos.x > tile.position.x &&
			mousePos.x < tile.position.x + tile.size &&
			mousePos.y > tile.position.y &&
			mousePos.y < tile.position.y + tile.size
		) {
			currentTile = tile;
			break;
		}
	}
});

// On clock of empty spot, add tower
canvas.addEventListener('click', (event) => {
	console.log(towers);
	console.log(currentTile);

	if (currentTile && !currentTile.exists) {
		towers.push(
			new Tower({
				position: {
					x: currentTile.position.x,
					y: currentTile.position.y,
				},
			})
		);
		currentTile.exists = true;
	}
});
