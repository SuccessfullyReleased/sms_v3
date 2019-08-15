import {SingleApi} from "../apis";
import {Model} from "./service";

export interface ZCRelation extends Model {
	zid: number,
	cid: number,
	tid: number
}

export interface ClazzCourseModel {
	cid: number,
	course: string,
	tid: number,
	teacher: string
}

export const defaultClazzCourse = {
	course: '',
	teacher: ''
};

class ClazzCourseService extends SingleApi {

	constructor() {
		super(ClazzCourseService.name, {
			baseURL: "/sms/clazz-course"
		})
	}

	choose(record: ZCRelation) {
		return this.request({
			method: 'post',
			data: record
		})
	}

	batchChoose(records: Array<ZCRelation>) {
		return this.request({
			method: 'post',
			url: '/list',
			data: records
		})
	}

	drop(record: ZCRelation) {
		return this.request({
			method: 'delete',
			data: record
		})
	}

	batchDrop(records: Array<ZCRelation>) {
		return this.request({
			method: 'delete',
			url: '/list',
			data: records
		})
	}

	selected(zid: number, type: number | null, status: number | null, pageNum?: number, pageSize?: number) {
		if (pageNum && pageSize) {
			return this.request({
				method: 'get',
				url: `/list/selected/${zid}`,
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
				url: `/list/selected/${zid}`,
				params: {
					type, status
				},
				headers: {
					noPage: true
				}
			})
		}
	}

	unSelected(zid: number, courseName: string, teacherName: string, pageNum?: number, pageSize?: number) {
		return this.request({
			method: 'get',
			url: '/list/unSelected',
			params: {
				zid, courseName, teacherName
			},
			headers: {
				pageNum, pageSize
			}
		})
	}

}

export default new ClazzCourseService();