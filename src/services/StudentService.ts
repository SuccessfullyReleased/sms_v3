import {SingleApi} from "../apis";
import {HttpServiceResponse, SearchResult} from "./service";

export type Student = {
	id?: number,
	sid?: string,
	name?: string,
	password?: string
}

class StudentService extends SingleApi {

	constructor() {
		super(StudentService.name, {
			baseURL: "/sms/student"
		})
	}

	selectById(id: number): HttpServiceResponse<Student> {
		return this.request({
			url: `/id/${id}`
		});
	}

	selectOne(student: Student): HttpServiceResponse<SearchResult<Student>> {
		return this.request({
			method: "post",
			url: '/search',
			data: student
		});
	}

	selectAll(): HttpServiceResponse<SearchResult<Student>> {
		return this.request({
			url: '/list',
			headers: {
				noPage: true
			}
		});
	}

	update(student: Student): HttpServiceResponse<number> {
		return this.request({
			method: 'put',
			data: student
		})
	}

}

export default new StudentService();