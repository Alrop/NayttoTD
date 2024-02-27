/** @format */

import { ctx } from '../main.js';
import { towersData } from '../towers.js';
import { gold } from './player.js';
// Archer shop icons
const btnArcherImg = new Image();
btnArcherImg.src = '../gfx/shop_archer.png';
const btnArcherUpImg = new Image();
btnArcherUpImg.src = '../gfx/shoparcherUp.png';
// Mage shop icons
const btnMageImg = new Image();
btnMageImg.src = '../gfx/shop_mage.png';
const btnMageUpImg = new Image();
btnMageUpImg.src = '../gfx/shopmageUp.png';

export const btnFirst = {
	position: { x: 780, y: 200 },
	size: { x: 170, y: 100 },
};

export const btnSecond = {
	position: { x: 780, y: 310 },
	size: { x: 170, y: 100 },
};

export function shopMenu(tile) {
	ctx.drawImage(btnArcherImg, btnFirst.position.x, btnFirst.position.y);
	ctx.drawImage(btnMageImg, btnSecond.position.x, btnSecond.position.y);
	// Darken UI elements which player can't afford
	ctx.fillStyle = 'rgba(0,0,0,0.4)';
	if (towersData.archer.cost > gold && !tile.tower) {
		ctx.fillRect(
			btnFirst.position.x,
			btnFirst.position.y,
			btnFirst.size.x,
			btnFirst.size.y
		);
	}
	if (towersData.mage.cost > gold && !tile.tower) {
		ctx.fillRect(
			btnSecond.position.x,
			btnSecond.position.y,
			btnSecond.size.x,
			btnSecond.size.y
		);
	}
}

export function upgradeMenu(tile) {
	ctx.fillStyle = 'rgba(0,0,0,0.4)';

	switch (tile.name) {
		// Check active tower name, then show upgrade to that tower
		// If player can't afford upgrade, darken menu icon
		case 'towerArcherT1':
			ctx.drawImage(
				btnArcherUpImg,
				btnFirst.position.x,
				btnFirst.position.y
			);
			if (
				tile.name == 'towerArcherT1' &&
				towersData.archer.costUpgrade > gold
			) {
				ctx.fillRect(
					btnFirst.position.x,
					btnFirst.position.y,
					btnFirst.size.x,
					btnFirst.size.y
				);
			}
			break;

		case 'towerMageT1':
			ctx.drawImage(
				btnMageUpImg,
				btnFirst.position.x,
				btnFirst.position.y
			);
			if (towersData.mage.costUpgrade > gold) {
				ctx.fillRect(
					btnFirst.position.x,
					btnFirst.position.y,
					btnFirst.size.x,
					btnFirst.size.y
				);
				break;
			}
	}
}
