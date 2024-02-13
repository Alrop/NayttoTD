/** @format */

import { ctx, tileSize } from '../main.js';
import { enemies } from './modules/enemy.js';

export class TowerEmplacement {
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
		// Does mouse overlap with this tower emplacement
		if (
			mousePos.x > this.position.x &&
			mousePos.x < this.position.x + this.size &&
			mousePos.y > this.position.y &&
			mousePos.y < this.position.y + this.size
		) {
			this.color = 'blue';
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
		this.range = 200;
		this.target;

		this.projectiles = [
			new Projectile({
				position: {
					x: this.position.x + this.size / 2,
					y: this.position.y,
				},
			}),
		];
	}
	shoot() {}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
	update() {
		this.draw();
		if (this.projectiles.length == 0) {
			this.projectiles.push(
				new Projectile({
					position: {
						x: this.position.x + this.size / 2,
						y: this.position.y,
					},
				})
			);
		}
	}
}

export class Projectile {
	constructor({ position = { x: 0, y: 0 }, target }) {
		this.position = position;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.radius = 5;
		this.target = enemies[0];
	}

	draw() {
		ctx.beginPath();
		ctx.arc(
			this.position.x,
			this.position.y,
			this.radius,
			10,
			0,
			Math.PI * 2
		);
		ctx.fillStyle = 'yellow';
		ctx.fill();
	}
	update() {
		this.draw();

		const angleOfAttack = Math.atan2(
			this.target.center.y - this.position.y,
			this.target.center.x - this.position.x
		);

		const velocityMult = 3;

		this.velocity.x = Math.cos(angleOfAttack) * velocityMult;
		this.velocity.y = Math.sin(angleOfAttack) * velocityMult;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		// console.log(this.position.x);
		// console.log(enemies[0].x);
	}
}
