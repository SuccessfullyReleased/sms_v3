import {SingleApi} from "../apis";
import md5 from 'md5'
import StudentService, {Student} from "./StudentService";
import {message} from "antd";
import TeacherService, {Teacher} from "./TeacherService";
import ManagerService, {Manager} from "./ManagerService";
import {HttpServiceResponse} from "./service";

export interface User {
	role: number,
	account: string,
	password?: string
}

const STUDENT = '1';
const TEACHER = '2';
const MANAGER = '3';

class UserService extends SingleApi {

	constructor() {
		super(UserService.name, {
			baseURL: "/sms/user"
		})
	}

	login(user: Required<User>): HttpServiceResponse<Student | Teacher | Manager> {
		user.password = md5(`${user.account}${user.password}`);
		return this.request({
			method: "post",
			url: "/verify",
			data: user
		})
	}

	verify(password: string): HttpServiceResponse<Student | Teacher | Manager> {
		const role = localStorage.getItem('sms_role');
		const account = localStorage.getItem('sms_account');
		if (role && account) {
			return this.request({
				method: "post",
				url: "/verify",
				data: {
					role: Number(role),
					account: account,
					password: md5(`${account}${password}`)
				}
			})
		} else {
			throw new Error("不存在用户信息");
		}
	}

	getUser({id, role}: { id: number, role: number }): HttpServiceResponse<Student | Teacher | Manager> {
		return this.request({
			method: 'get',
			params: {id, role}
		})
	}

	updatePassword(password: string): void {
		const id = localStorage.getItem('sms_id');
		const role = localStorage.getItem('sms_role');
		const account = localStorage.getItem('sms_account');
		password = md5(`${account}${password}`);
		switch (role) {
			case STUDENT:
				StudentService.update({id: Number(id), password}).then(res => {
					message.success("修改成功");
				}).catch(err => {
					message.error("修改失败");
				});
				break;
			case TEACHER:
				TeacherService.update({id: Number(id), password}).then(res => {
					message.success("修改成功");
				}).catch(err => {
					message.error("修改失败");
				});
				break;
			case MANAGER:
				ManagerService.update({id: Number(id), password}).then(res => {
					message.success("修改成功");
				}).catch(err => {
					message.error("修改失败");
				});
				break;
			default:
				message.error("can't find this role!");
		}
	}
}

export default new UserService();