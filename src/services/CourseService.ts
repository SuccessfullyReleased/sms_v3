import {BaseService, HttpServiceResponse, Model, PageInfo, SearchResult} from "./service";

export interface Course extends Model {
	name: string,
	type: number,
	status: number
}

export const CourseType = {
	Compulsory: 1,
	Elective: 2
};

export const CourseStatus = {
	Initial: 1,
	Selection: 2,
	Teaching: 3,
	Settlement: 4
};

export const defaultCourse: Partial<Course> = {
	name: '',
	type: 1,
	status: 1
};

class CourseService extends BaseService<Course> {

	constructor() {
		super('course');
	}

	isModel(record: Partial<Course>): boolean {
		return !!(record.name || record.type || record.status);
	}

	filter(record: Partial<Course>): Partial<Course> {
		console.log(record);
		if (!record.id) {
			record.id = undefined;
		}
		if (!record.name) {
			record.name = undefined;
		}
		if (!record.type) {
			record.type = undefined;
		}
		if (!record.status) {
			record.status = undefined;
		}
		return record;
	}

	selectOneRecord(record: Partial<Course>): HttpServiceResponse<SearchResult<Course>> {
		return super.selectOne(record, this.isModel);
	}

	selectRecords(record: Partial<Course>, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Course>> {
		return super.select(record, this.isModel, pageNum, pageSize);
	}

	selectAllRecords(pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Course>> {
		return super.selectAll(pageNum, pageSize);
	}

	insertRecord(record: Partial<Course>): HttpServiceResponse<number> {
		return super.insert(this.filter(record), this.isModel);
	}

	updateRecord(record: Partial<Course>): HttpServiceResponse<number> {
		return super.update(this.filter(record), this.isModel);
	}

}

export default new CourseService();