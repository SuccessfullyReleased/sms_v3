import {HttpConfig, InstanceCallback} from '../http';
import {AxiosRequestConfig} from 'axios';
import BaseApi from "./BaseApi";

export default class Api extends BaseApi {

	constructor(config?: AxiosRequestConfig, callback?: InstanceCallback) {
		let _config: HttpConfig = config as HttpConfig;
		_config.id = Symbol("Api");
		super(_config, callback);
	}

}