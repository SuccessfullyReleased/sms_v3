export function isLogin() {
	/*
	 * @method isLogin
	 * @description 检查是否登录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/11 0:08
	 **/
	const id: string | null = localStorage.getItem('sms_id');
	const name: string | null = localStorage.getItem('sms_name');
	const role: string | null = localStorage.getItem('sms_role');
	return !!(id && name && role);
}


export function isAuth(level: number) {
	/*
	 * @method isAuth
	 * @param
	 * @description 检查是否有权限
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/15 15:54
	 **/
	const role: string | null = localStorage.getItem('sms_role');
	if (role) {
		return parseInt(role) === level;
	} else {
		return false;
	}
}

export interface UserInfo {
	id: number
	role: number
	account: string
	name: string
}

export const getUserInfo = (): UserInfo | null => {
	const id: string | null = localStorage.getItem('sms_id');
	const role: string | null = localStorage.getItem('sms_role');
	const account: string | null = localStorage.getItem('sms_account');
	const name: string | null = localStorage.getItem('sms_name');
	if (id && role && account && name) {
		return {id: parseInt(id), role: parseInt(role), account: account, name: name};
	} else {
		return null;
	}
};