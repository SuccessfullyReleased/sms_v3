import {SingleApi} from "../apis";

export type Student = {
	id?: number,
	sid?: string,
	name?: string,
	phone?: string
}
export default class StudentService extends SingleApi {

	constructor() {
		super(StudentService.name, {
			baseURL: "/sms/"
		})
	}

	selectById(id: number): Promise<any> {
		return this.request({
			url: `student/id/${id}`
		});
	}

	selectOne(student: Student): Promise<any> {
		return this.request({
			method: "post",
			url: 'student/search',
			data: student
		});
	}

	selectAll() {
		return this.request({
			url: 'student/list',
			headers: {
				noPage: true
			}
		});
	}

}