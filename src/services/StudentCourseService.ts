import {SingleApi} from "../apis";
import {Model} from "./service";

export interface SCRelation extends Model {
	sid: number,
	cid: number,
	tid: number,
	score?: number
}

export interface StudentCourseModel {
	cid: number,
	course: string,
	tid: number,
	teacher: string
}

export interface StudentScoreModel extends SCRelation {
	sno: string,
	studentName: string,
	courseName: string,
	teacherName: string,
	score: number
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

	selected(sid: number, type: number | null, status: number | null, pageNum?: number, pageSize?: number) {
		if (pageNum && pageSize) {
			return this.request({
				method: 'get',
				url: `/list/selected/${sid}`,
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
				url: `/list/selected/${sid}`,
				params: {
					type, status
				},
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

	selectCScore({tid, cid, zid}: { tid: number, cid: number, zid: number }) {
		return this.request({
			method: 'get',
			url: '/list/c-score',
			params: {
				tid, cid, zid
			}
		})
	}

	selectEScore({tid, cid}: { tid: number, cid: number }) {
		return this.request({
			method: 'get',
			url: '/list/e-score',
			params: {
				tid, cid
			}
		})
	}

	selectScore(sid: number) {
		return this.request({
			method: 'get',
			url: `/list/score/id/${sid}`
		})
	}

	updateList(records: Partial<SCRelation>[]) {
		return this.request({
			method: 'put',
			url: '/list',
			data: records
		})
	}

}

export default new StudentCourseService();