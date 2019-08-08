import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";
import md5 from "md5";

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
		console.log(record);
		if (!record.id) {
			record.id = undefined;
		}
		if (!record.sid) {
			record.sid = undefined;
		}
		if (!record.name) {
			record.name = undefined;
		}
		if (!record.password) {
			record.password = undefined;
		}
		return record;
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

}

export default new StudentService();