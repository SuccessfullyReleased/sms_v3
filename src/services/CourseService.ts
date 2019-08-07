import {SingleApi} from "../apis";
import {HttpServiceResponse, SearchResult} from "./service";

export type Course = {
	id: number,
	name: string,
	type: number,
	status: number
}

export const CourseType = {
	Compulsory: 0,
	Elective: 1
};

export const CourseStatus = {
	Initial: 0,
	Selection: 1,
	Teaching: 2,
	Settlement: 3
};

class CourseService extends SingleApi {

	constructor() {
		super(CourseService.name, {
			baseURL: "/sms/course"
		})
	}

	selectById(id: number): HttpServiceResponse<Course> {
		return this.request({
			url: `/id/${id}`
		});
	}

	selectOne(course: Course): HttpServiceResponse<SearchResult<Course>> {
		return this.request({
			method: "post",
			url: '/search',
			data: course
		});
	}

	select(course: Partial<Course>, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Course>> {
		if (course.id || course.name || course.type || course.status) {
			if (pageNum && pageSize) {
				return this.request({
					method: 'post',
					url: '/search/list',
					headers: {
						pageNum, pageSize
					},
					data: course
				});
			} else {
				return this.request({
					method: 'post',
					url: '/search/list',
					headers: {
						noPage: true
					},
					data: course
				});
			}
		} else {
			return this.selectAll(pageNum, pageSize);
		}
	}

	selectAll(pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Course>> {
		if (pageNum && pageSize) {
			return this.request({
				url: '/list',
				headers: {
					pageNum, pageSize
				}
			});
		} else {
			return this.request({
				url: '/list',
				headers: {
					noPage: true
				}
			});
		}
	}

	insert(course: Partial<Course>): HttpServiceResponse<number> {
		return this.request({
			method: 'post',
			data: course
		})
	}

	update(course: Partial<Course>): HttpServiceResponse<number> {
		return this.request({
			method: 'put',
			data: course
		})
	}

	deleteById(id: number): HttpServiceResponse<number> {
		return this.request({
			method: 'delete',
			url: `/id/${id}`
		})
	}

	filter(record: Partial<Course>): Partial<Course> {
		console.log(record);
		if (!record.id) {
			record.id = undefined;
		}
		if (!record.name) {
			record.name = undefined;
		}
		if (!record.type) {
			record.type = undefined;
		}
		if (!record.status) {
			record.status = undefined;
		}
		return record;
	}

}

export default new CourseService();