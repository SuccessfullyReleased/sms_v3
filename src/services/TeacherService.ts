import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";
import {Teacher} from "./TeacherService";
import md5 from "md5";

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
		console.log(record);
		if (!record.id) {
			record.id = undefined;
		}
		if (!record.tid) {
			record.tid = undefined;
		}
		if (!record.name) {
			record.name = undefined;
		}
		if (!record.password) {
			record.password = undefined;
		}
		return record;
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

}

export default new TeacherService();