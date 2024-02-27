/** @format */

import { ctx } from '../main.js';
const btnArcherImg = new Image();
btnArcherImg.src = '../gfx/shop_archer.png';
const btnArcherUpImg = new Image();
btnArcherUpImg.src = '../gfx/shoparcherUp.png';

const btnMageImg = new Image();
btnMageImg.src = '../gfx/shop_mage.png';
const btnMageUpImg = new Image();
btnMageUpImg.src = '../gfx/shopmageUp.png';

export const btnArcher = {
	position: { x: 780, y: 200 },
	size: { x: btnArcherImg.width || 170, y: btnArcherImg.height || 100 },
};

export const btnMage = {
	position: { x: 780, y: 310 },
	size: { x: btnMageImg.width || 170, y: btnMageImg.height || 100 },
};
export const btnMageUp = {
	position: { x: 780, y: 200 },
	size: { x: btnMageImg.width || 170, y: btnMageImg.height || 100 },
};

export function shopMenu(tile) {
	ctx.drawImage(btnArcherImg, btnArcher.position.x, btnArcher.position.y);
	ctx.drawImage(btnMageImg, btnMage.position.x, btnMage.position.y);
}
export function upgradeMenu(tile) {
	// Check active tower name, then show upgrade to that tower
	switch (tile.name) {
		case 'towerArcherT1':
			ctx.drawImage(
				btnArcherUpImg,
				btnArcher.position.x,
				btnArcher.position.y
			);
			break;
		case 'towerMageT1':
			ctx.drawImage(
				btnMageUpImg,
				btnArcher.position.x,
				btnArcher.position.y
			);
			break;
	}
}
