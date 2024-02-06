/** @format */

import { ctx, tileSize } from '../main.js';
export { TowerEmplacement };

class TowerEmplacement {
	constructor({ position = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = tileSize;
		this.color = 'green';
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
	update(mousePos) {
		// Does mouse overlap with this tower emplacement=
		if (
			mousePos.x > this.position.x &&
			mousePos.x < this.position.x + this.size &&
			mousePos.y > this.position.y &&
			mousePos.y < this.position.y + this.size
		) {
			this.color = 'blue';

			// console.log('Touching tower');
		} else {
			this.color = 'green';
		}
		this.draw();
	}
}

export class Tower {
	constructor({ position = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = tileSize;
		this.color = 'orange';
		this.exists = false;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
	update() {
		this.draw();
	}
}
