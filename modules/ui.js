/** @format */

import { ctx } from '../main.js';
const btnArcherImg = new Image();
btnArcherImg.src = '../gfx/shop_archer.png';

const btnMageImg = new Image();
btnMageImg.src = '../gfx/shop_mage.png';

export const btnArcher = {
	position: { x: 780, y: 200 },
	size: { x: btnArcherImg.width, y: btnArcherImg.height },
	text: 'Archer tower',
};
export const btnMage = {
	position: { x: 780, y: 310 },
	size: { x: btnMageImg.width, y: btnMageImg.height },
	text: 'Magic tower',
};

export function openMenu() {
	ctx.drawImage(btnArcherImg, btnArcher.position.x, btnArcher.position.y);
	ctx.drawImage(btnMageImg, btnMage.position.x, btnMage.position.y);
}
