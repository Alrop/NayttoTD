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

// Update mouse position when moved.
canvas.addEventListener('mousemove', (event) => {
	let rect = canvas.getBoundingClientRect();
	mousePos.x =
		((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
	mousePos.y =
		((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
});

// Find if emplacement is clicked
canvas.addEventListener('click', () => {
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

	if (
		activeTile &&
		boundingBox(btnArcher) &&
		!activeTile.tower &&
		canAfford(towersData.archer.cost)
	) {
		activeTile.tower = new Tower({
			position: {
				x: activeTile.position.x,
				y: activeTile.position.y,
			},
			tower: towersData.archer,
		});
	} else if (
		activeTile &&
		boundingBox(btnMage) &&
		!activeTile.tower &&
		canAfford(towersData.mage.cost)
	) {
		activeTile.tower = new Tower({
			position: {
				x: activeTile.position.x,
				y: activeTile.position.y,
			},
			tower: towersData.mage,
		});
	} else if (
		boundingBox(btnArcher) &&
		activeTile?.tower?.name == 'towerArcherT1' &&
		canAfford(towersData.archer.costUpgrade)
	) {
		console.log('Triggered archer upgrade');
		activeTile.tower.upgrade();
	} else if (
		boundingBox(btnArcher) &&
		activeTile?.tower?.name == 'towerMageT1' &&
		canAfford(towersData.mage.costUpgrade)
	) {
		activeTile.tower.upgrade();
	} else if (
		activeTile?.active &&
		!boundingBox(btnArcher) &&
		!boundingBox(btnMage)
	) {
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

export function projectileHitDetect(tower, projectile, index) {
	// If projectile hits enemy, remove projectile and deal damage to enemy
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
