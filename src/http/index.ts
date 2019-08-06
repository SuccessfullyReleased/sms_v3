import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic} from 'axios'

export interface HttpMethod {
	[propName: string]: string
}

export interface HttpConfig extends AxiosRequestConfig {
	id?: symbol
}

export interface InstanceCallback {
	(instance: AxiosInstance): void
}

let instances: Map<symbol, AxiosInstance> = new Map();

export interface Http {
	development: boolean,
	method: HttpMethod;

	create(config?: HttpConfig, callback?: InstanceCallback): symbol;

	destory(id: symbol): boolean;

	request<T = any, R = AxiosResponse<T>>(config: HttpConfig): Promise<R>;

	all<T>(configs: Array<HttpConfig>): Promise<AxiosResponse<T>[]>;

	raw(): AxiosStatic;

	showMemory(): void;
}

let http: Http = {

	development: false,

	method: {
		GET: "get",
		POST: "post",
		PUT: "put",
		DELETE: "delete"
	},

	create(config, callback) {
		if (config && config.id) {
			if (instances.has(config.id)) {
				console.warn("config.id is repeated!");
			} else {
				let instance = axios.create(config);
				if (callback) {
					callback(instance);
				}
				instances.set(config.id, instance);
			}
			if (this.development && process.env.NODE_ENV === 'development') {
				this.showMemory();
			}
			return config.id;
		} else {
			let id = Symbol('Api');
			console.warn("config or config.id is null,return Symbol('Api')");
			let instance = axios.create();
			if (callback) {
				callback(instance);
			}
			instances.set(id, instance);
			if (this.development && process.env.NODE_ENV === 'development') {
				this.showMemory();
			}
			return id;
		}
	},

	destory(id) {
		let res = instances.delete(id);
		if (this.development && process.env.NODE_ENV === 'development') {
			this.showMemory();
		}
		return res;
	},

	request(config) {
		let instance: AxiosInstance | AxiosStatic = axios;
		if (config.id) {
			if (instances.get(config.id)) {
				instance = instances.get(config.id) || axios;
			} else {
				console.warn(`unable to find the value of ${config.id.toString} in instances.`);
			}
		} else {
			console.warn("config.id is undefined!")
		}
		return instance.request(config);
	},

	all(configs) {
		return new Promise((resolve, reject) => {
			axios.all(configs.map(config => (this.request(config))))
				.then(axios.spread((...results) => {
					resolve(results);
				})).catch(error => {
				reject(error);
			})
		});
	},

	raw() {
		return axios;
	},

	showMemory(): void {
		if (instances.size === 0) {
			console.warn("no memory");
		} else {
			console.warn("start show memory");
			instances.forEach((value: AxiosInstance, key: symbol) => {
				console.log(key.toString());
			});
			console.warn("end show memory");
		}
	}
};

export default http;