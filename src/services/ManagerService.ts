import {BaseService, HttpServiceResponse, Model, SearchResult} from "./service";

export interface Manager extends Model {
	name: string,
	password: string
}

class ManagerService extends BaseService<Manager> {

	constructor() {
		super('manager');
	}

	isModel(record: Partial<Manager>): boolean {
		return !!(record.name || record.name);
	}

	filter(record: Partial<Manager>): Partial<Manager> {
		console.log(record);
		if (!record.id) {
			record.id = undefined;
		}
		if (!record.name) {
			record.name = undefined;
		}
		if (!record.password) {
			record.password = undefined;
		}
		return record;
	}

	selectOneRecord(record: Partial<Manager>): HttpServiceResponse<SearchResult<Manager>> {
		return super.selectOne(record, this.isModel);
	}

	selectRecords(record: Partial<Manager>, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Manager>> {
		return super.select(record, this.isModel, pageNum, pageSize);
	}

	selectAllRecords(pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<Manager>> {
		return super.selectAll(pageNum, pageSize);
	}

	insertRecord(record: Partial<Manager>): HttpServiceResponse<number> {
		return super.insert(this.filter(record), this.isModel);
	}

	updateRecord(record: Partial<Manager>): HttpServiceResponse<number> {
		return super.update(this.filter(record), this.isModel);
	}

}

export default new ManagerService();