import React from 'react';
import CourseManageSearch from "../../components/Search/CourseManageSearch";
import CourseManageTable from "../../components/Table/CourseManageTable";
import CourseService, {Course} from "../../services/CourseService";
import {ManagePaginationProps} from "../../components/Table";
import {PageInfo} from "../../services/service";
import {message} from "antd";
import CourseEditDialog from "../../components/EditModal/CourseEditDialog";

interface CourseManageState {
	tableData: Array<Course>,
	pagination: Omit<Omit<ManagePaginationProps, 'onChange'>, 'onShowSizeChange'>,
	search: Partial<Course>,
	addRecord: Course,
	addStatus: boolean
}

class CourseManage extends React.Component<{}, CourseManageState> {

	state: CourseManageState = {
		tableData: [],
		pagination: {
			current: 1,
			pageSize: 5,
			total: NaN,
		},
		search: {
			name: undefined,
			type: undefined,
			status: undefined
		},
		addRecord: {
			id: 0,
			name: '',
			type: 1,
			status: 1
		},
		addStatus: false
	};

	componentDidMount() {
		this.getData({}, this.state.pagination.current, this.state.pagination.pageSize);
	}

	handleSearch = (search: Partial<Course>) => {
		this.getData(CourseService.filter(search), this.state.pagination.current, this.state.pagination.pageSize);
	};

	handleAdd = () => {
		this.setState({
			addStatus: true
		});
	};

	handleBatchDelete = () => {

	};

	handleUpdate = (course: Course) => {
		CourseService.update(course).then(res => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(err => {
			message.error("Update failed！")
		})
	};

	handleDelete = (course: Course) => {
		CourseService.deleteById(course.id).then(res => {
			message.success("Successfully deleted！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(err => {
			message.error("Failed to delete！")
		})
	};

	handlePageChange = (page: number, pageSize?: number | undefined) => {
		this.getData(this.state.search, page, pageSize as number);
	};

	handleShowSizeChange = (current: number, size: number) => {
		this.getData(this.state.search, current, size);
	};

	handleRecordInsert = (record: Course) => {
		this.setState({
			addRecord: {
				id: 0,
				name: '',
				type: 1,
				status: 1
			},
			addStatus: false
		});
		CourseService.insert(CourseService.filter(record)).then(res => {
			message.success("Successfully saved！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(err => {
			message.error("Save failed！")
		})
	};
	handleRecordInsertCancel = () => {
		this.setState({
			addRecord: {
				id: 0,
				name: '',
				type: 1,
				status: 1
			},
			addStatus: false
		});
	};

	render() {
		return (
			<div>
				<CourseManageSearch onSearch={this.handleSearch} onAdd={this.handleAdd} onBatchDelete={this.handleBatchDelete}/>
				<CourseManageTable tableData={this.state.tableData}
													 onUpdate={this.handleUpdate}
													 onDelete={this.handleDelete}
													 pagination={{
														 ...this.state.pagination,
														 onChange: this.handlePageChange,
														 onShowSizeChange: this.handleShowSizeChange
													 }}/>
				<CourseEditDialog record={this.state.addRecord}
													visible={this.state.addStatus}
													onSure={this.handleRecordInsert}
													onCancel={this.handleRecordInsertCancel}/>
			</div>
		);
	}

	getData = (search: Partial<Course>, pageNum: number, pageSize: number) => {
		console.log(search);
		CourseService.select(search, pageNum, pageSize).then(res => {
			const data: PageInfo<Course> = res.data.data as PageInfo<Course>;
			this.setState({
				tableData: data.list,
				pagination: {
					current: data.pageNum,
					pageSize: data.pageSize,
					total: data.total
				},
				search: {
					name: search.name,
					type: search.type,
					status: search.status
				}
			});
		})
	}

}

export default CourseManage;