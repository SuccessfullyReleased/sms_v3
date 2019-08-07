import {SingleApi} from "../apis";
import {HttpServiceResponse, SearchResult} from "./service";

export type Manager = {
	id?: number,
	name?: string,
	password?: string
}

class ManagerService extends SingleApi {

	constructor() {
		super(ManagerService.name, {
			baseURL: "/sms/manager"
		})
	}

	selectById(id: number): HttpServiceResponse<Manager> {
		return this.request({
			url: `/id/${id}`
		});
	}

	selectOne(Manager: Manager): HttpServiceResponse<SearchResult<Manager>> {
		return this.request({
			method: "post",
			url: '/search',
			data: Manager
		});
	}

	selectAll(): HttpServiceResponse<SearchResult<Manager>> {
		return this.request({
			url: '/list',
			headers: {
				noPage: true
			}
		});
	}

	update(Manager: Manager): HttpServiceResponse<number> {
		return this.request({
			method: 'put',
			data: Manager
		})
	}

}

export default new ManagerService();