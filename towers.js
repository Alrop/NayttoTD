/** @format */

import { ctx, tileSize } from './main.js';
import { deltaTime } from './main.js';
import { Projectile } from './projectile.js';

// Archer tower and projectile images
const archerImg = new Image();
archerImg.src = '../gfx/tower_archer.png';
const archerUpImg = new Image();
archerUpImg.src = '../gfx/tower_archerUp.png';
const arrowImg = new Image();
arrowImg.src = '../gfx/projectile.png';
// Mage tower and projectile images
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
		reloadSpeed: 1000,
		velocityMult: 0.5,
		towerImg: archerImg,
		projectileImg: arrowImg,
		// Upgrade modifiers. Negative reloadSpeed == faster shooting
		rangeUp: 30,
		damageUp: 2,
		reloadSpeedUp: -200,
	},
	mage: {
		name: 'towerMageT1',
		cost: 70,
		costUpgrade: 80,
		range: 180,
		damage: 12,
		reloadSpeed: 1500,
		velocityMult: 0.8,
		towerImg: mageImg,
		projectileImg: magicImg,
		// Upgrade modifiers. Negative reloadSpeed == faster shooting
		rangeUp: 20,
		damageUp: 4,
		reloadSpeedUp: -200,
	},
};

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
		// Show range of currently selected tower
		if (this.active) {
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, this.range, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(255,255,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
		}
	}
	upgrade() {
		// Upgrade tower based on current tower name
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

		if (this.target && this.reload > this.reloadSpeed) {
			// Target in range and reload calculation remainder == 0, fire projectile
			this.reload = 0;
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
		this.reload += deltaTime;
	}
}
