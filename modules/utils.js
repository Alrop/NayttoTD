/** @format */

import { Tower } from '../towers.js';

export const mousePos = {
	x: undefined,
	y: undefined,
};
export const towers = [];
export const placementTiles = [];
let currentTile = undefined;

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

// On click of empty spot, add tower
canvas.addEventListener('click', (event) => {
	console.log(towers);
	console.log(currentTile);

	if (currentTile && !currentTile.exists) {
		// gold -= 60;
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

export function projectileHitDetect(tower, projectile, index) {
	// If projectile hits enemy, remove projectile
	const distanceX = projectile.target.center.x - projectile.position.x;
	const distanceY = projectile.target.center.y - projectile.position.y;
	const distance = Math.hypot(distanceX, distanceY);
	if (distance < projectile.target.radius + projectile.radius) {
		console.log('hit');
		tower.projectiles.splice(index, 1);
	}
}