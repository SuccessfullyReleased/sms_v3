import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";
import axios, {Canceler} from "axios";

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

export const formatCourseType = (status: number) => {
	switch (status) {
		case 1:
			return 'Compulsory';
		case 2:
			return 'Elective';
		default:
			return 'ERROR';
	}
};

export const formatCourseStatus = (status: number) => {
	switch (status) {
		case 1:
			return 'Initial stage';
		case 2:
			return 'Selection stage';
		case 3:
			return 'Teaching stage';
		case 4:
			return 'Settlement stage';
		default:
			return 'ERROR';
	}
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
		let _record: Partial<Course> = {};
		if (record.id) {
			_record.id = record.id;
		}
		if (record.name) {
			_record.name = record.name;
		}
		if (record.type) {
			_record.type = record.type;
		}
		if (record.status) {
			_record.status = record.status;
		}
		return _record;
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

	updateRecords(records: Partial<Course>[]): HttpServiceResponse<number> {
		return super.updateList(records.map(this.filter), this.isModel);
	}

	//自定义业务
	selectByName(name: string): HttpServiceResponse<SearchResult<Course>> {
		if (cancel) {
			cancel("请求取消")
		}
		return axios.request({
			method: 'post',
			url: '/sms/course/list/search',
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

export default new CourseService();