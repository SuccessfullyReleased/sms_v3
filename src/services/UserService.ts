import {SingleApi} from "../apis";
import md5 from 'md5'

export interface User {
	role: number,
	account: string,
	password?: string
}

export default class UserService extends SingleApi {

	constructor() {
		super(UserService.name, {
			baseURL: "/sms/"
		})
	}

	login(user: Required<User>) {
		user.password = md5(`${user.account}${user.password}`);
		return this.request({
			method: "post",
			url: "user/login",
			data: user
		})
	}

	getUser({id, role}: { id: number, role: number }) {
		return this.request({
			method: 'get',
			params: {id, role}
		})
	}

}