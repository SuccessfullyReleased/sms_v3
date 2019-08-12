import {SingleApi} from "../apis";
import {Model} from "./service";

export interface SCRelation extends Model {
	sid: number,
	cid: number,
	tid: number
}

export interface StudentCourseModel {
	cid: number,
	course: string,
	tid: number,
	teacher: string
}

export const defaultStudentCourse = {
	course: '',
	teacher: ''
};

class StudentCourseService extends SingleApi {

	constructor() {
		super(StudentCourseService.name, {
			baseURL: "/sms/student-course"
		})
	}

	choose(record: SCRelation) {
		return this.request({
			method: 'post',
			data: record
		})
	}

	batchChoose(records: Array<SCRelation>) {
		return this.request({
			method: 'post',
			url: '/list',
			data: records
		})
	}

	drop(record: SCRelation) {
		return this.request({
			method: 'delete',
			data: record
		})
	}

	batchDrop(records: Array<SCRelation>) {
		return this.request({
			method: 'delete',
			url: '/list',
			data: records
		})
	}

	selected(sid: number, pageNum?: number, pageSize?: number) {
		if (pageNum && pageSize) {
			return this.request({
				method: 'get',
				url: `/list/selected/${sid}`,
				headers: {
					pageNum, pageSize
				}
			})
		} else {
			return this.request({
				method: 'get',
				url: `/list/selected/${sid}`,
				headers: {
					noPage: true
				}
			})
		}
	}

	unSelected(sid: number, courseName: string, teacherName: string, pageNum?: number, pageSize?: number) {
		return this.request({
			method: 'get',
			url: '/list/unSelected',
			params: {
				sid, courseName, teacherName
			},
			headers: {
				pageNum, pageSize
			}
		})
	}

}

export default new StudentCourseService();