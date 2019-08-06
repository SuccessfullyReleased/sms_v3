import {SingleApi} from "../apis";

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

	selectById(id: number) {
		return this.request({
			url: `/id/${id}`
		});
	}

	selectOne(Manager: Manager) {
		return this.request({
			method: "post",
			url: '/search',
			data: Manager
		});
	}

	selectAll() {
		return this.request({
			url: '/list',
			headers: {
				noPage: true
			}
		});
	}

	update(Manager: Manager) {
		return this.request({
			method:'put',
			data: Manager
		})
	}

}

export default new ManagerService();