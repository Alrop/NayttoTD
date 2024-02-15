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
		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};
		this.color = 'orange';
		this.exists = false;
		this.range = 200;
		this.target;
		this.frames = 0;
		this.projectiles = [];
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);

		ctx.beginPath();
		ctx.arc(this.center.x, this.center.y, this.range, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fill();
	}

	update() {
		this.draw();

		if (
			this.target &&
			this.projectiles.length == 0 &&
			// Shoot every X frames
			this.frames % 80 === 0
		) {
			this.projectiles.push(
				new Projectile({
					position: {
						x: this.position.x + this.size / 2,
						y: this.position.y,
					},
					target: this.target,
				})
			);
		}
		this.frames++;
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
		this.target = target;
		this.damage = 2;
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
		// Projektiilin nopeus kerroin
		const velocityMult = 3;

		this.velocity.x = Math.cos(angleOfAttack) * velocityMult;
		this.velocity.y = Math.sin(angleOfAttack) * velocityMult;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}
