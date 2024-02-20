/** @format */

import { TowerArcher, TowerMagic } from '../towers.js';
import { enemies } from './enemy.js';
import { canAfford } from './player.js';
import { ctx } from '../main.js';
import { btnArcher, btnMagic } from './ui.js';
export const mousePos = {
	x: undefined,
	y: undefined,
};

export const towers = [];
export const placementTiles = [];
export let currentTile = undefined;
export let activeTower = undefined;

// Update mouse position when moved.
window.addEventListener('mousemove', (event) => {
	let rect = canvas.getBoundingClientRect();
	mousePos.x =
		((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
	mousePos.y =
		((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;

	if (!activeTower) {
		currentTile = undefined;
	}
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
	// console.log(currentTile);
});

// On click of empty spot, add tower
canvas.addEventListener('click', (event) => {
	// console.log(towers);
	if (activeTower != currentTile && !currentTile.exists) {
		activeTower = currentTile;
	}
	console.log(currentTile);
	console.log(activeTower);
	// console.log(TowerArcher.cost);
	if (
		activeTower &&
		boundingBox(btnArcher) &&
		!currentTile.exists &&
		canAfford(TowerArcher.cost)
	) {
		towers.push(
			new TowerArcher({
				position: {
					x: currentTile.position.x,
					y: currentTile.position.y,
				},
			})
		);
		currentTile.exists = true;
		currentTile = undefined;
		activeTower = undefined;
	} else if (
		activeTower &&
		boundingBox(btnMagic) &&
		!currentTile.exists &&
		canAfford(TowerMagic.cost)
	) {
		towers.push(
			new TowerMagic({
				position: {
					x: currentTile.position.x,
					y: currentTile.position.y,
				},
			})
		);
		currentTile.exists = true;
		currentTile = undefined;
		activeTower = undefined;
	} else if (
		currentTile?.active &&
		activeTower === currentTile &&
		!boundingBox(btnArcher) &&
		!boundingBox(btnMagic)
	) {
		btnMagic;
		currentTile = undefined;
		activeTower = undefined;
	}
});

function boundingBox(object) {
	return (
		mousePos.x > object.position.x &&
		mousePos.x < object.position.x + object.size.x &&
		mousePos.y > object.position.y &&
		mousePos.y < object.position.y + object.size.y
	);
}

// If projectile hits enemy, remove projectile and deal damage to enemy
export function projectileHitDetect(tower, projectile, index) {
	const distanceX = projectile.target.center.x - projectile.position.x;
	const distanceY = projectile.target.center.y - projectile.position.y;
	const distance = Math.hypot(distanceX, distanceY);
	if (distance < projectile.target.radius + projectile.radius) {
		// console.log('hit for: ' + projectile.damage);
		// Remove old projectile
		tower.projectiles.splice(index, 1);
		projectile.target.takeDamage(projectile.damage);

		/* projectile.target.health -= projectile.damage;

		//Find index of correct enemy, make sure you don't loop over to end, then remove enemy
		if (projectile.target.health <= 0) {
			const targetIndex = enemies.findIndex((target) => {
				return projectile.target === target;
			});

			if (targetIndex > -1) {
				enemies.splice(targetIndex, 1);
			}
		} */
	}
}

export function targetRangeValidator(enemy, tower) {
	// If enemy within range of turret, return True
	const distanceX = enemy.center.x - tower.position.x;
	const distanceY = enemy.center.y - tower.position.y;
	const distance = Math.hypot(distanceX, distanceY);
	return distance < enemy.radius + tower.range;
}
