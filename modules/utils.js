/** @format */

import { Tower, towersData } from '../towers.js';
import { canAfford } from './player.js';
import { btnFirst, btnSecond } from './ui.js';

export const mousePos = {
	x: undefined,
	y: undefined,
};

export const towers = []; /*Deprecated*/
export const placementTiles = [];
export let activeTile = undefined;

canvas.addEventListener('mousemove', (event) => {
	// Update mouse position when moved.
	let rect = canvas.getBoundingClientRect();
	mousePos.x =
		((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
	mousePos.y =
		((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
});

canvas.addEventListener('click', () => {
	// Find if emplacement is clicked
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

	// If emplacement is selected, build or upgrade towers
	if (
		activeTile &&
		boundingBox(btnFirst) &&
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
		boundingBox(btnSecond) &&
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
		boundingBox(btnFirst) &&
		activeTile?.tower?.name == 'towerArcherT1' &&
		canAfford(towersData.archer.costUpgrade)
	) {
		console.log('Triggered archer upgrade');
		activeTile.tower.upgrade();
	} else if (
		boundingBox(btnFirst) &&
		activeTile?.tower?.name == 'towerMageT1' &&
		canAfford(towersData.mage.costUpgrade)
	) {
		activeTile.tower.upgrade();
	} else if (
		activeTile?.active &&
		!boundingBox(btnFirst) &&
		!boundingBox(btnSecond)
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
