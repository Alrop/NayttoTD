/** @format */

import { ctx, tileSize } from '../main.js';
import { mousePos, activeTile } from './modules/utils.js';
import { openMenu } from './modules/ui.js';
import { towerPlace } from './modules/level.js';

const archerImg = new Image();
archerImg.src = '../gfx/tower_archer.png';
const arrowImg = new Image();
arrowImg.src = '../gfx/projectile.png';

const mageImg = new Image();
mageImg.src = '../gfx/tower_mage.png';
const magicImg = new Image();
magicImg.src = '../gfx/projectile_magic.png';

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

		if (this == activeTile) {
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
		this.range = 200;
		this.reloadSpeed = 80;
		this.reload = 0;

		// Projectile stats
		this.projectiles = [];
		this.target;
		this.damage = 2;
		this.velocityMult = 3;
		this.projectileImg = arrowImg;
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
			this.reload % this.reloadSpeed === 0
		) {
			this.projectiles.push(
				new Projectile({
					position: {
						x: this.position.x + this.size / 2,
						y: this.position.y,
					},
					target: this.target,
					size: this.size,
					damage: this.damage,
					velocityMult: this.velocityMult,
					projectileImg: this.projectileImg,
				})
			);
		}
		this.reload++;
	}
}

export class TowerMagic {
	static cost = 70;
	constructor({ position = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = tileSize;
		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};
		this.range = 180;
		this.reloadSpeed = 120;
		this.reload = 0;

		// Projectile stats
		this.projectiles = [];
		this.target;
		this.damage = 5;
		this.velocityMult = 3;
		this.projectileImg = magicImg;
	}
	draw() {
		ctx.drawImage(
			mageImg,
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
			this.reload % this.reloadSpeed === 0
		) {
			this.projectiles.push(
				new Projectile({
					position: {
						x: this.position.x + this.size / 2,
						y: this.position.y,
					},
					target: this.target,
					size: this.size,
					damage: this.damage,
					velocityMult: this.velocityMult,
					projectileImg: this.projectileImg,
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
		damage,
		velocityMult,
		projectileImg,
	}) {
		this.position = position;
		this.size = projectileImg.width;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.target = target;
		this.damage = damage;
		this.velocityMult = velocityMult;
		this.projectileImg = projectileImg;
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
