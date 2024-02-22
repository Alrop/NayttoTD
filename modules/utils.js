/** @format */

import { Tower, towersData } from '../towers.js';
import { canAfford } from './player.js';
import { btnArcher, btnMage } from './ui.js';

export const mousePos = {
	x: undefined,
	y: undefined,
};

export const towers = [];
export const placementTiles = [];
export let activeTile = undefined;
export let hoverTile = undefined;

// Update mouse position when moved.
canvas.addEventListener('mousemove', (event) => {
	let rect = canvas.getBoundingClientRect();
	mousePos.x =
		((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
	mousePos.y =
		((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
});

// On click of empty emplacement, open tower shop
canvas.addEventListener('click', (event) => {
	// console.log(towers);

	for (let i = 0; i < placementTiles.length; i++) {
		const tile = placementTiles[i];
		if (
			mousePos.x > tile.position.x &&
			mousePos.x < tile.position.x + tile.size &&
			mousePos.y > tile.position.y &&
			mousePos.y < tile.position.y + tile.size
		) {
			activeTile = tile;
			break;
		}
	}

	// console.log(activeTile);
	// console.log(TowerArcher.cost);
	if (
		activeTile &&
		boundingBox(btnArcher) &&
		!activeTile.exists &&
		canAfford(towersData.archer.cost)
	) {
		towers.push(
			new Tower({
				position: {
					x: activeTile.position.x,
					y: activeTile.position.y,
				},
				tower: towersData.archer,
			})
		);
		activeTile.exists = true;
		activeTile = undefined;
		activeTile = undefined;
	} else if (
		activeTile &&
		boundingBox(btnMage) &&
		!activeTile.exists &&
		canAfford(towersData.mage.cost)
	) {
		towers.push(
			new Tower({
				position: {
					x: activeTile.position.x,
					y: activeTile.position.y,
				},
				tower: towersData.mage,
			})
		);
		activeTile.exists = true;
		activeTile = undefined;
		activeTile = undefined;
	} else if (
		activeTile?.active &&
		activeTile === activeTile &&
		!boundingBox(btnArcher) &&
		!boundingBox(btnMage)
	) {
		btnMage;
		activeTile = undefined;
		activeTile = undefined;
	}
});

// Check if mouse over element
export function boundingBox(object) {
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
	if (distance < projectile.target.radius - projectile.size) {
		// console.log('hit for: ' + projectile.damage);
		// Remove old projectile
		tower.projectiles.splice(index, 1);
		projectile.target.takeDamage(projectile.damage);
	}
}

export function targetRangeValidator(enemy, tower) {
	// If enemy within range of turret, return True
	const distanceX = enemy.center.x - tower.position.x;
	const distanceY = enemy.center.y - tower.position.y;
	const distance = Math.hypot(distanceX, distanceY);
	return distance < enemy.radius + tower.range;
}
