import {HttpResponse} from "../apis/BaseApi";
import {SingleApi} from "../apis";
import {AxiosResponse} from "axios";

export interface Model {
	id?: number
}

export type HttpBodyEntity<T> = {
	status: number,
	msg: {
		description: string,
		detail: string
	},
	data: T
}

export type HttpServiceResponse<T> = HttpResponse<HttpBodyEntity<T>>;

export type PageInfo<T> = {
	pageNum: number,
	pageSize: number,
	pages: number,
	list: Array<T>
	hasNextPage: boolean,
	hasPreviousPage: boolean,
	isFirstPage: boolean,
	isLastPage: boolean,
	navigatepageNums: Array<number>
	nextPage: number,
	prePage: number
	size: number,
	total: number
};

export type SearchResult<T> = Array<T> | PageInfo<T>;

export class BaseService<T extends Model> extends SingleApi {

	constructor(key: string) {
		super(key, {
			baseURL: `/sms/${key}`
		})
	}

	selectById(id: number): HttpServiceResponse<T> {
		return this.request({
			url: `/id/${id}`
		});
	}

	selectOne(record: Partial<T>, isModel: (record: Partial<T>) => boolean): HttpServiceResponse<SearchResult<T>> {
		if (isModel(record)) {
			return this.request({
				method: "post",
				url: '/search',
				data: record
			});
		} else {
			return new Promise<AxiosResponse<HttpBodyEntity<Array<T>>>>((resolve, reject) => {
				reject(record);
			});
		}
	}

	select(record: Partial<T>, isModel: (record: Partial<T>) => boolean, pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<T>> {
		if (isModel(record)) {
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
		} else {
			return this.selectAll(pageNum, pageSize);
		}
	}

	selectAll(pageNum?: number, pageSize?: number): HttpServiceResponse<SearchResult<T>> {
		if (pageNum && pageSize) {
			return this.request({
				url: '/list',
				headers: {
					pageNum, pageSize
				}
			});
		} else {
			return this.request({
				url: '/list',
				headers: {
					noPage: true
				}
			});
		}
	}

	insert(record: Partial<T>, isModel: (record: Partial<T>) => boolean): HttpServiceResponse<number> {
		if (isModel(record)) {
			return this.request({
				method: 'post',
				data: record
			})
		} else {
			return new Promise<AxiosResponse<HttpBodyEntity<number>>>((resolve, reject) => {
				reject(record);
			});
		}
	}

	insertList(records: Partial<T>[]): HttpServiceResponse<number> {
		return this.request({
			method: 'post',
			url: '/list',
			data: records
		})
	}

	update(record: Partial<T>, isModel: (record: Partial<T>) => boolean): HttpServiceResponse<number> {
		if (isModel(record) || record.id) {
			return this.request({
				method: 'put',
				data: record
			})
		} else {
			return new Promise<AxiosResponse<HttpBodyEntity<number>>>((resolve, reject) => {
				reject(record);
			});
		}
	}

	deleteById(id: number): HttpServiceResponse<number> {
		return this.request({
			method: 'delete',
			url: `/id/${id}`
		})
	}

	deleteByIds(ids: number[]): HttpServiceResponse<number> {
		return this.request({
			method: 'delete',
			url: `/list/${ids.join(',')}`
		})
	}

}