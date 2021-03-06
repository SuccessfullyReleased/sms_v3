import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";
import md5 from "md5";
import axios, {Canceler} from "axios";

export interface Student extends Model {
	sid: string,
	name: string,
	password: string
}

export const defaultStudent: Partial<Student> = {
	sid: '',
	name: '',
	password: md5('123456')
};

class StudentService extends BaseService<Student> {

	constructor() {
		super('student');
	}

	isModel(record: Partial<Student>) {
		return !!(record.sid || record.name);
	}

	filter(record: Partial<Student>): Partial<Student> {
		let _record: Partial<Student> = {};
		if (record.id) {
			_record.id = record.id;
		}
		if (record.sid) {
			_record.sid = record.sid;
		}
		if (record.name) {
			_record.name = record.name;
		}
		if (record.password) {
			_record.password = record.password;
		}
		return _record;
	}

	selectOneRecord(record: Partial<Student>): HttpServiceResponse<SearchResult<Student>> {
		return super.selectOne(record, this.isModel);
	}

	selectRecords(record: Partial<Student>, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Student>> {
		return super.select(record, this.isModel, pageNum, pageSize);
	}

	selectAllRecords(pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Student>> {
		return super.selectAll(pageNum, pageSize);
	}

	insertRecord(record: Partial<Student>): HttpServiceResponse<number> {
		return super.insert(this.filter(record), this.isModel);
	}

	updateRecord(record: Partial<Student>): HttpServiceResponse<number> {
		return super.update(this.filter(record), this.isModel);
	}

	//自定义业务
	selectByName(name: string): HttpServiceResponse<SearchResult<Student>> {
		if (cancel) {
			cancel("请求取消")
		}
		return axios.request({
			method: 'post',
			url: '/sms/student/list/search',
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

export default new StudentService();