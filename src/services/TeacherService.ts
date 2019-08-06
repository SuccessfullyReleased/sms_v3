import {SingleApi} from "../apis";

export type Teacher = {
	id?: number,
	sid?: string,
	name?: string,
	password?: string
}

class TeacherService extends SingleApi {

	constructor() {
		super(TeacherService.name, {
			baseURL: "/sms/teacher"
		})
	}

	selectById(id: number) {
		return this.request({
			url: `/id/${id}`
		});
	}

	selectOne(Teacher: Teacher) {
		return this.request({
			method: "post",
			url: '/search',
			data: Teacher
		});
	}

	selectAll() {
		return this.request({
			url: '/list',
			headers: {
				noPage: true
			}
		});
	}

	update(Teacher: Teacher) {
		return this.request({
			method:'put',
			data: Teacher
		})
	}

}

export default new TeacherService();