/** @format */
import { ctx, tileSize } from '../main.js';
import { mousePos, activeTile } from './modules/utils.js';
import { shopMenu, upgradeMenu, btnFirst, btnSecond } from './modules/ui.js';
import { towerPlace } from './modules/level.js';
import { boundingBox } from './modules/utils.js';
import { towersData } from './towers.js';

export class TowerEmplacement {
	constructor({ position }) {
		this.position = position;
		this.size = tileSize;
		this.center = {
			x: this.position.x + this.size / 2,
			y: this.position.y + this.size / 2,
		};
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

		if (this.active && this.tower) {
			// When emplacement/tower selected and hovering over shop icon, show that tower range
			this.tower.draw();
		}
		if (this.active && boundingBox(btnFirst) && this.tower) {
			// Check if upgrading archer or mage tower, set draw range to match
			let upgradeRange =
				this.tower.name == 'towerArcherT1'
					? towersData.archer.range + towersData.archer.rangeUp
					: towersData.mage.range + towersData.mage.rangeUp;
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, upgradeRange, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(100,100,255,0.4)';
			ctx.lineWidth = 4;
			ctx.stroke();
		} else if (this.active && boundingBox(btnFirst)) {
			// Show range of unbuilt archer tower
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
		if (this.active && boundingBox(btnSecond) && !this.tower?.name) {
			// Show range of unbuilt mage tower
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
			//If mouse hovers over this emplacement, return true
			mousePos.x > this.position.x &&
			mousePos.x < this.position.x + this.size &&
			mousePos.y > this.position.y &&
			mousePos.y < this.position.y + this.size
		);
	}
	shops() {
		if (this == activeTile && !this.tower) {
			//If selected tile has no tower, show tower shop. If tower exists, show upgrade shop
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
			// Shows and hides tower range indicator based on if selected or not
			this.tower.active = true;
		} else if (!this.active && this.tower) {
			this.tower.active = false;
		}
	}
}
