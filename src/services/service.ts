import {HttpResponse} from "../apis/BaseApi";

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