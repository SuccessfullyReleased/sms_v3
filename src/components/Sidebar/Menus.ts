export interface Menu {
	index: string,
	title: string,
	icon?: string,
	subs?: Array<Menu>
}

const Menus: Array<Menu> = [{
	icon: 'icon-user',
	index: '/main/dashboard',
	title: 'Dashboard'
}, {
	icon: 'icon-setting',
	index: '/main/setting',
	title: 'Setting'
}];

export default Menus