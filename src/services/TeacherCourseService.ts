import {SingleApi} from "../apis";


class TeacherCourseService extends SingleApi {

	constructor() {
		super(TeacherCourseService.name, {
			baseURL: "/sms/teacher-course"
		})
	}

	choose(tid: number, cid: number) {
		return this.request({
			method: 'get',
			params: {
				tid, cid
			}
		})
	}

	batchChoose(tid: number, cids: number[]) {
		return this.request({
			method: 'post',
			url: '/list',
			params: {
				tid
			},
			data: cids
		})
	}

	drop(tid: number, cid: number) {
		return this.request({
			method: 'delete',
			params: {
				tid, cid
			}
		})
	}

	batchDrop(tid: number, cids: number[]) {
		return this.request({
			method: 'put',
			url: '/list',
			params: {
				tid
			},
			data: cids
		})
	}

	selected(tid: number, pageNum?: number, pageSize?: number) {
		if (pageNum && pageSize) {
			return this.request({
				method: 'get',
				url: `/list/selected/${tid}`,
				headers: {
					pageNum, pageSize
				}
			})
		} else {
			return this.request({
				method: 'get',
				url: `/list/selected/${tid}`,
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

}

export default new TeacherCourseService();