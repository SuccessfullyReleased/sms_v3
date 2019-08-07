import {SingleApi} from "../apis";
import {HttpServiceResponse, SearchResult} from "./service";

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

	selectById(id: number): HttpServiceResponse<Teacher> {
		return this.request({
			url: `/id/${id}`
		});
	}

	selectOne(Teacher: Teacher): HttpServiceResponse<SearchResult<Teacher>> {
		return this.request({
			method: "post",
			url: '/search',
			data: Teacher
		});
	}

	selectAll(): HttpServiceResponse<SearchResult<Teacher>> {
		return this.request({
			url: '/list',
			headers: {
				noPage: true
			}
		});
	}

	update(Teacher: Teacher): HttpServiceResponse<number> {
		return this.request({
			method: 'put',
			data: Teacher
		})
	}

}

export default new TeacherService();