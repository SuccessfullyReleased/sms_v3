import {HttpConfig, InstanceCallback} from '../http';
import {AxiosRequestConfig} from 'axios'
import BaseApi from './BaseApi'

export default class SingleApi extends BaseApi {

	constructor(key: string, config?: AxiosRequestConfig, callback?: InstanceCallback) {
		let _config: HttpConfig = config as HttpConfig;
		_config.id = Symbol.for(key);
		super(_config, callback);
	}

}