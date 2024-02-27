/** @format */

import { ctx, tileSize } from '../main.js';
import { mousePos, activeTile } from './modules/utils.js';
import { shopMenu, upgradeMenu } from './modules/ui.js';
import { towerPlace } from './modules/level.js';
import { boundingBox } from './modules/utils.js';
import { btnArcher, btnMage } from './modules/ui.js';

const archerImg = new Image();
archerImg.src = '../gfx/tower_archer.png';
const archerUpImg = new Image();
archerUpImg.src = '../gfx/tower_archerUp.png';
const arrowImg = new Image();
arrowImg.src = '../gfx/projectile.png';

const mageImg = new Image();
mageImg.src = '../gfx/tower_mage.png';
const mageUpImg = new Image();
mageUpImg.src = '../gfx/tower_mageUp.png';
const magicImg = new Image();
magicImg.src = '../gfx/projectile_magic.png';

export const towersData = {
	archer: {
		name: 'towerArcherT1',
		cost: 50,
		costUpgrade: 60,
		range: 200,
		damage: 6,
		reloadSpeed: 50,
		velocityMult: 3,
		towerImg: archerImg,
		projectileImg: arrowImg,
		// Upgrade modifiers
		rangeUp: 30,
		damageUp: 2,
		reloadSpeedUp: -20,
	},
	mage: {
		name: 'towerMageT1',
		cost: 70,
		costUpgrade: 80,
		range: 180,
		damage: 12,
		reloadSpeed: 80,
		velocityMult: 3,
		towerImg: mageImg,
		projectileImg: magicImg,
		// Upgrade modifiers
		rangeUp: 20,
		damageUp: 4,
		reloadSpeedUp: -20,
	},
};

export class TowerEmplacement {
	constructor({ position }) {
		this.position = position;
		this.size = tileSize;
		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};
		this.active = false;
		console.log(position);
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

		// When emplacement/tower selected and hovering over shop icon, show that tower range
		if (this.active && this.tower) {
			this.tower.draw();
		}
		if (this.active && boundingBox(btnArcher) && this.tower) {
			ctx.beginPath();
			ctx.arc(
				this.center.x,
				this.center.y,
				towersData.archer.range + towersData.archer.rangeUp,
				0,
				Math.PI * 2
			);
			ctx.strokeStyle = 'rgba(100,100,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
		} else if (this.active && boundingBox(btnArcher)) {
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

		if (this.active && boundingBox(btnMage) && !this.tower?.name) {
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
	mouseOver() {
		return (
			// Does mouse overlap with this tower emplacement
			mousePos.x > this.position.x &&
			mousePos.x < this.position.x + this.size &&
			mousePos.y > this.position.y &&
			mousePos.y < this.position.y + this.size
		);
	}
	shops() {
		//If selected tile has no tower, show tower shop. If tower exists, show upgrade shop
		if (this == activeTile && !this.tower) {
			shopMenu(this);
			this.active = true;
		} else if (this == activeTile && this.tower) {
			upgradeMenu(this.tower);
			this.active = true;
		} else {
			this.active = false;
		}
	}

	update() {
		this.draw();
		this.shops();

		if (this.active && this.tower) {
			this.tower.active = true;
		} else if (!this.active && this.tower) {
			this.tower.active = false;
		}
	}
}

export class Tower {
	constructor({ position, tower }) {
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
		this.active = false;
	}
	draw() {
		ctx.drawImage(
			this.towerImg,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);

		if (this.active) {
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, this.range, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(255,255,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
		}
	}
	upgrade() {
		this.range += 30;
		switch (this.name) {
			case 'towerArcherT1':
				this.name = 'towerArcherT2';
				this.towerImg = archerUpImg;
				this.range += towersData.archer.rangeUp;
				this.damage += towersData.archer.damageUp;
				this.reloadSpeed += towersData.archer.reloadSpeedUp;
				break;

			case 'towerMageT1':
				this.name = 'towerMageT2';
				this.towerImg = mageUpImg;
				this.range += towersData.mage.rangeUp;
				this.damage += towersData.mage.damageUp;
				this.reloadSpeed += towersData.mage.reloadSpeedUp;
				break;
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
	firingSolution() {
		//Projectile angle of flight towards enemy
		const angleOfAttack = Math.atan2(
			this.target.center.y - this.position.y,
			this.target.center.x - this.position.x
		);
		// Projectile velocity
		this.velocity.x = Math.cos(angleOfAttack) * this.velocityMult;
		this.velocity.y = Math.sin(angleOfAttack) * this.velocityMult;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
	update() {
		this.firingSolution();
		this.draw();
	}
}
