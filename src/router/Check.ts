export function isAuth() {
	let id: string | null = localStorage.getItem('sms_id');
	let name: string | null = localStorage.getItem('sms_name');
	let role: string | null = localStorage.getItem('sms_role');
	return !!(id && name && role);
}