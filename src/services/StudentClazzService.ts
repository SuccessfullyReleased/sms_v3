import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";

export interface StudentClazz extends Model {
	sid: string,
	name: string,
	zid: number,
	className: string
}

export const defaultStudentClazz: Partial<StudentClazz> = {
	sid: '',
	name: '',
	className: ''
};

class StudentClazzService extends BaseService<StudentClazz> {

	constructor() {
		super('student-clazz');
	}

	isModel(record: Partial<StudentClazz>) {
		return !!(record.sid || record.name || record.className);
	}

	filter(record: Partial<StudentClazz>): Partial<StudentClazz> {
		let _record: Partial<StudentClazz> = {};
		if (record.id) {
			_record.id = record.id;
		}
		if (record.sid) {
			_record.sid = record.sid;
		}
		if (record.name) {
			_record.name = record.name;
		}
		if (record.className) {
			_record.className = record.className;
		}
		return _record;
	}


	selectRecords(record: Partial<StudentClazz>, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<StudentClazz>> {
		if (pageNum && pageSize) {
			return this.request({
				method: 'post',
				url: '/list/search',
				headers: {
					pageNum, pageSize
				},
				data: record
			});
		} else {
			return this.request({
				method: 'post',
				url: '/list/search',
				headers: {
					noPage: true
				},
				data: record
			});
		}
	}

	insertRecord(record: Partial<StudentClazz>): HttpServiceResponse<number> {
		return super.insert(this.filter(record), this.isModel);
	}

	updateRecord(record: Partial<StudentClazz>): HttpServiceResponse<number> {
		return super.update(this.filter(record), this.isModel);
	}

}

export default new StudentClazzService();