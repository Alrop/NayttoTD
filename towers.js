/** @format */

import { ctx, tileSize } from '../main.js';
import { enemies } from './modules/enemy.js';
import { mousePos, activeTower } from './modules/utils.js';
import { openMenu } from './modules/ui.js';

const towerPlace = new Image();
towerPlace.src = '../gfx/tiles/tower_spot.png';
const archerImg = new Image();
archerImg.src = '../gfx/tower_archer.png';

export class TowerEmplacement {
	constructor({ position = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = tileSize;
		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};
		this.exists = false;
		this.active = false;
	}
	draw() {
		ctx.drawImage(
			towerPlace,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);
		if (this.mouseOver() || this.active) {
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, 20, 10, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255,255,255,0.4)';
			ctx.fill();
		}
	}

	update() {
		this.draw();

		if (this == activeTower) {
			openMenu(this);
			this.active = true;
		} else {
			this.active = false;
		}
	}

	mouseOver() {
		return (
			// Does mouse overlap with this tower emplacement
			mousePos.x > this.position.x &&
			mousePos.x < this.position.x + this.size &&
			mousePos.y > this.position.y &&
			mousePos.y < this.position.y + this.size
		);
	}
}

export class TowerArcher {
	static cost = 50;
	constructor({ position = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = tileSize;
		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};

		// Projectile stats
		this.projectiles = [];
		this.range = 200;
		this.target;
		this.radius = 5;
		this.damage = 2;
		this.velocityMult = 3;
		this.color = 'yellow';
		this.reload = 0;
	}
	draw() {
		ctx.drawImage(
			archerImg,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);

		if (
			mousePos.x > this.position.x &&
			mousePos.x < this.position.x + this.size &&
			mousePos.y > this.position.y &&
			mousePos.y < this.position.y + this.size
		) {
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, this.range, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(255,255,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
		}
	}

	update() {
		this.draw();

		if (
			this.target &&
			this.projectiles.length == 0 &&
			// Shoot every X reload
			this.reload % 80 === 0
		) {
			this.projectiles.push(
				new Projectile({
					position: {
						x: this.position.x + this.size / 2,
						y: this.position.y,
					},
					target: this.target,
					radius: this.radius,
					damage: this.damage,
					velocityMult: this.velocityMult,
					color: this.color,
				})
			);
		}
		this.reload++;
	}
}

export class TowerMagic {
	static cost = 75;
	constructor({ position = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = tileSize;
		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};

		// Projectile stats
		this.projectiles = [];
		this.range = 180;
		this.target;
		this.radius = 5;
		this.damage = 5;
		this.velocityMult = 3;
		this.color = 'Blue';
		this.reload = 0;
	}
	draw() {
		ctx.drawImage(
			archerImg,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);

		if (
			mousePos.x > this.position.x &&
			mousePos.x < this.position.x + this.size &&
			mousePos.y > this.position.y &&
			mousePos.y < this.position.y + this.size
		) {
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, this.range, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(255,255,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
		}
	}

	update() {
		this.draw();

		if (
			this.target &&
			this.projectiles.length == 0 &&
			// Shoot every X reload
			this.reload % 120 === 0
		) {
			this.projectiles.push(
				new Projectile({
					position: {
						x: this.position.x + this.size / 2,
						y: this.position.y,
					},
					target: this.target,
					radius: this.radius,
					damage: this.damage,
					velocityMult: this.velocityMult,
					color: this.color,
				})
			);
		}
		this.reload++;
	}
}

export class Projectile {
	constructor({
		position = { x: 0, y: 0 },
		target,
		radius,
		damage,
		velocityMult,
		color,
	}) {
		this.position = position;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.target = target;
		this.radius = radius;
		this.damage = damage;
		this.velocityMult = velocityMult;
		this.color = color;
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
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	update() {
		this.draw();
		//projektiilin ja vihollisen kohtauskulma
		const angleOfAttack = Math.atan2(
			this.target.center.y - this.position.y,
			this.target.center.x - this.position.x
		);
		// Projektiilin nopeus kerroin

		this.velocity.x = Math.cos(angleOfAttack) * this.velocityMult;
		this.velocity.y = Math.sin(angleOfAttack) * this.velocityMult;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}
