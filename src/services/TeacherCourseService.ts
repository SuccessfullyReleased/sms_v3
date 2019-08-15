import {SingleApi} from "../apis";
import {Model} from "./service";

export interface TCRelation extends Model {
	tid: number,
	cid: number
}

class TeacherCourseService extends SingleApi {

	constructor() {
		super(TeacherCourseService.name, {
			baseURL: "/sms/teacher-course"
		})
	}

	choose(record: TCRelation) {
		return this.request({
			method: 'post',
			data: record
		})
	}

	batchChoose(records: Array<TCRelation>) {
		return this.request({
			method: 'post',
			url: '/list',
			data: records
		})
	}

	drop(record: TCRelation) {
		return this.request({
			method: 'delete',
			data: record
		})
	}

	batchDrop(records: Array<TCRelation>) {
		return this.request({
			method: 'delete',
			url: '/list',
			data: records
		})
	}

	selected(tid: number, type: number | null, status: number | null, pageNum?: number, pageSize?: number) {
		if (pageNum && pageSize) {
			return this.request({
				method: 'get',
				url: `/list/selected/${tid}`,
				params: {
					type, status
				},
				headers: {
					pageNum, pageSize
				}
			})
		} else {
			return this.request({
				method: 'get',
				url: `/list/selected/${tid}`,
				params: {
					type, status
				},
				headers: {
					noPage: true
				}
			})
		}
	}

	unSelected(tid: number, courseName: string, pageNum?: number, pageSize?: number) {
		return this.request({
			method: 'get',
			url: '/list/unSelected',
			params: {
				tid, courseName
			},
			headers: {
				pageNum, pageSize
			}
		})
	}

	selectClass(tid: number, cid: number) {
		return this.request({
			method: 'get',
			url: `/clazz/list/${tid}`,
			params: {
				cid
			}
		})
	}

	selectStudent(tid: number, cid: number) {
		return this.request({
			method: 'get',
			url: `/student/list/${tid}`,
			params: {
				cid
			}
		})
	}

}

export default new TeacherCourseService();