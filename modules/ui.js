/** @format */

import { ctx } from '../main.js';
const btnArcherImg = new Image();
btnArcherImg.src = '../gfx/shop_archer.png';

const btnMageImg = new Image();
btnMageImg.src = '../gfx/shop_mage.png';

export const btnArcher = {
	position: { x: 780, y: 200 },
	size: { x: btnArcherImg.width || 170, y: btnArcherImg.height || 100 },
};
export const btnMage = {
	position: { x: 780, y: 310 },
	size: { x: btnMageImg.width || 170, y: btnMageImg.height || 100 },
};

export function openMenu() {
	ctx.drawImage(btnArcherImg, btnArcher.position.x, btnArcher.position.y);
	ctx.drawImage(btnMageImg, btnMage.position.x, btnMage.position.y);
}
