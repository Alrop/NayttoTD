/** @format */

import { ctx, tileSize } from '../main.js';
import { mousePos, activeTile } from './modules/utils.js';
import { openMenu } from './modules/ui.js';
import { towerPlace } from './modules/level.js';
import { boundingBox } from './modules/utils.js';
import { btnArcher, btnMage } from './modules/ui.js';

const archerImg = new Image();
archerImg.src = '../gfx/tower_archer.png';
const arrowImg = new Image();
arrowImg.src = '../gfx/projectile.png';

const mageImg = new Image();
mageImg.src = '../gfx/tower_mage.png';
const magicImg = new Image();
magicImg.src = '../gfx/projectile_magic.png';

export const towersData = {
	archer: {
		cost: 50,
		range: 200,
		damage: 8,
		reloadSpeed: 50,
		velocityMult: 3,
		towerImg: archerImg,
		projectileImg: arrowImg,
	},
	mage: {
		cost: 70,
		range: 180,
		damage: 16,
		reloadSpeed: 80,
		velocityMult: 3,
		towerImg: mageImg,
		projectileImg: magicImg,
	},
};

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
		if (this.active && boundingBox(btnArcher)) {
			ctx.beginPath();
			ctx.arc(
				this.center.x,
				this.center.y,
				towersData.archer.range,
				0,
				Math.PI * 2
			);
			ctx.strokeStyle = 'rgba(255,255,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
		}
		if (this.active && boundingBox(btnMage)) {
			ctx.beginPath();
			ctx.arc(
				this.center.x,
				this.center.y,
				towersData.mage.range,
				0,
				Math.PI * 2
			);
			ctx.strokeStyle = 'rgba(255,255,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
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

export class Tower {
	constructor({ position = { x: 0, y: 0 }, tower }) {
		this.position = position;
		for (let property in tower) {
			if (tower.hasOwnProperty(property)) {
				this[property] = tower[property];
			}
		}
		this.size = tileSize;

		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};

		this.projectiles = [];
		this.reload = 0;
	}
	draw() {
		ctx.drawImage(
			this.towerImg,
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
					projectile: {
						target: this.target,
						size: this.projectileImg.width,
						damage: this.damage,
						velocityMult: this.velocityMult,
						projectileImg: this.projectileImg,
					},
				})
			);
		}
		this.reload++;
	}
}

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
