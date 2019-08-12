import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";
import axios, {Canceler} from "axios";

export interface Clazz extends Model {
	name: string
}

export const defaultClazz: Partial<Clazz> = {
	name: '',
};

class ClazzService extends BaseService<Clazz> {

	constructor() {
		super('clazz');
	}

	isModel(record: Partial<Clazz>) {
		return !!(record.name);
	}

	filter(record: Partial<Clazz>): Partial<Clazz> {
		let _record: Partial<Clazz> = {};
		if (record.id) {
			_record.id = record.id;
		}
		if (record.name) {
			_record.name = record.name;
		}
		return _record;
	}

	selectOneRecord(record: Partial<Clazz>): HttpServiceResponse<SearchResult<Clazz>> {
		return super.selectOne(record, this.isModel);
	}

	selectRecords(record: Partial<Clazz>, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Clazz>> {
		return super.select(record, this.isModel, pageNum, pageSize);
	}

	selectAllRecords(pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Clazz>> {
		return super.selectAll(pageNum, pageSize);
	}

	insertRecord(record: Partial<Clazz>): HttpServiceResponse<number> {
		return super.insert(this.filter(record), this.isModel);
	}

	updateRecord(record: Partial<Clazz>): HttpServiceResponse<number> {
		return super.update(this.filter(record), this.isModel);
	}

	//自定义业务
	selectByName(name: string): HttpServiceResponse<SearchResult<Clazz>> {
		if (cancel) {
			cancel("请求取消")
		}
		return axios.request({
			method: 'post',
			url: '/sms/clazz/list/search',
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

export default new ClazzService();