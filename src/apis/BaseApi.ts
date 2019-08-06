import {AxiosResponse, AxiosRequestConfig} from 'axios';
import http, {HttpConfig, InstanceCallback, Http} from '../http'
import _ from 'lodash'

const _id = Symbol('id');
const _http = Symbol('http');
export default class BaseApi {

	private [_id]: symbol;

	private [_http]: Http = http;

	constructor(config?: HttpConfig, callback?: InstanceCallback) {
		this[_id] = this.http.create(config, callback);
	}

	destory(): boolean {
		return this.http.destory(this.id);
	}

	get id(): symbol {
		return this[_id];
	}

	get http(): Http {
		return this[_http];
	}

	request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		let _config: HttpConfig = {
			id: this.id
		};
		_.assign(_config, config);
		return this.http.request(_config);
	}

	all<T>(configs: Array<AxiosRequestConfig>): Promise<AxiosResponse<T>[]> {
		return new Promise((resolve, reject) => {
			this.http.raw().all(configs.map(config => (this.request(config))))
				.then(this.http.raw().spread((...results) => {
					resolve(results);
				})).catch(error => {
				reject(error);
			})
		});
	}

	allMethod<T = any>(ApiMethods: (Promise<T>)[]): Promise<T[]> {
		return new Promise((resolve, reject) => {
			this.http.raw().all(ApiMethods)
				.then(this.http.raw().spread((...results) => {
					resolve(results);
				})).catch(error => {
				reject(error);
			})
		});
	}

}