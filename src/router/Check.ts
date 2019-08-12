export function isAuth() {
	/*
	 * @method isAuth
	 * @description 检查是否登录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/11 0:08
	 **/
	const id: string | null = localStorage.getItem('sms_id');
	const name: string | null = localStorage.getItem('sms_name');
	const role: string | null = localStorage.getItem('sms_role');
	return !!(id && name && role);
}