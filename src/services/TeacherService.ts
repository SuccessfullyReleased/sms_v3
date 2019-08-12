import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";
import {Teacher} from "./TeacherService";
import md5 from "md5";
import axios, {Canceler} from 'axios'

export interface Teacher extends Model {
	tid: string,
	name: string,
	password: string
}

export const defaultTeacher: Partial<Teacher> = {
	tid: '',
	name: '',
	password: md5('123456')
};

class TeacherService extends BaseService<Teacher> {

	constructor() {
		super('teacher');
	}

	isModel(record: Partial<Teacher>) {
		return !!(record.tid || record.name);
	}

	filter(record: Partial<Teacher>): Partial<Teacher> {
		let _record: Partial<Teacher> = {};
		if (record.id) {
			_record.id = record.id;
		}
		if (record.tid) {
			_record.tid = record.tid;
		}
		if (record.name) {
			_record.name = record.name;
		}
		if (record.password) {
			_record.password = record.password;
		}
		return _record;
	}

	selectOneRecord(record: Partial<Teacher>): HttpServiceResponse<SearchResult<Teacher>> {
		return super.selectOne(record, this.isModel);
	}

	selectRecords(record: Partial<Teacher>, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Teacher>> {
		return super.select(record, this.isModel, pageNum, pageSize);
	}

	selectAllRecords(pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Teacher>> {
		return super.selectAll(pageNum, pageSize);
	}

	insertRecord(record: Partial<Teacher>): HttpServiceResponse<number> {
		return super.insert(this.filter(record), this.isModel);
	}

	updateRecord(record: Partial<Teacher>): HttpServiceResponse<number> {
		return super.update(this.filter(record), this.isModel);
	}

	//自定义业务
	selectByName(name: string): HttpServiceResponse<SearchResult<Teacher>> {
		if (cancel) {
			cancel("请求取消")
		}
		return axios.request({
			method: 'post',
			url: '/sms/teacher/list/search',
			data: {
				name
			},
			cancelToken: new axios.CancelToken((c) => {
				cancel = c;
			})
		});
	}
}

let cancel: Canceler;

export default new TeacherService();