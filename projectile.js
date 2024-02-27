/** @format */
import { ctx } from './main.js';

export class Projectile {
	constructor({ position = { x: 0, y: 0 }, projectile }) {
		this.position = position;
		for (let property in projectile) {
			if (projectile.hasOwnProperty(property)) {
				this[property] = projectile[property];
			}
		}
		this.velocity = {
			x: 0,
			y: 0,
		};
	}

	draw() {
		ctx.drawImage(
			this.projectileImg,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);
	}
	trajectory() {
		const angleOfAttack = Math.atan2(
			//Projectile angle of flight towards enemy
			this.target.center.y - this.position.y,
			this.target.center.x - this.position.x
		);
		// Determine projectile direction and velocity
		this.velocity.x = Math.cos(angleOfAttack) * this.velocityMult;
		this.velocity.y = Math.sin(angleOfAttack) * this.velocityMult;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
	update() {
		this.trajectory();
		this.draw();
	}
}
