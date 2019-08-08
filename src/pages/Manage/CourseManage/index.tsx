import React from 'react';
import CourseManageSearch from "../../../components/Search/CourseManageSearch";
import CourseManageTable from "../../../components/Table/CourseManageTable";
import CourseService, {Course, defaultCourse} from "../../../services/CourseService";
import {PageInfo} from "../../../services/service";
import {message} from "antd";
import CourseEditDialog from "../../../components/EditModal/CourseEditDialog";
import DeleteDialog from "../../../components/DeleteModal";
import {ManageState} from "../index";


class CourseManage extends React.Component<{}, ManageState<Course>> {

	state: ManageState<Course> = {
		tableData: [],
		pagination: {
			current: 1,
			pageSize: 5,
			total: NaN,
		},
		search: defaultCourse,
		insertRecord: defaultCourse,
		insertStatus: false,
		batchDeleteRecords: [],
		batchDeleteStatus: false
	};

	componentDidMount() {
		this.getData({}, this.state.pagination.current, this.state.pagination.pageSize);
	}

	handleSearchCommand = (search: Partial<Course>) => {
		this.getData(search, this.state.pagination.current, this.state.pagination.pageSize);
	};

	handleInsertCommand = () => {
		this.setState({
			insertStatus: true
		});
	};

	handleBatchDeleteCommand = () => {
		this.setState({
			batchDeleteStatus: true
		})
	};

	handleUpdate = (record: Partial<Course>) => {
		CourseService.updateRecord(record).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleDelete = (record: Partial<Course>) => {
		CourseService.deleteById(record.id as number).then(() => {
			message.success("Successfully deleted！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Failed to delete！")
		})
	};

	handlePageChange = (page: number, pageSize?: number | undefined) => {
		this.getData(this.state.search, page, pageSize as number);
	};

	handleShowSizeChange = (current: number, size: number) => {
		this.getData(this.state.search, current, size);
	};

	handleInsert = (record: Partial<Course>) => {
		this.setState({
			insertRecord: defaultCourse,
			insertStatus: false
		});
		CourseService.insertRecord(record).then(() => {
			message.success("Successfully saved！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Save failed！")
		})
	};
	handleInsertCancel = () => {
		this.setState({
			insertRecord: defaultCourse,
			insertStatus: false
		});
	};

	handleSelectionChange = (selectedRowKeys: number[]) => {
		this.setState({
			batchDeleteRecords: selectedRowKeys
		});
	};

	handleBatchDelete = (records: number | number[]) => {
		CourseService.deleteByIds(records as number[]).then(() => {
			this.setState({
				batchDeleteStatus: false
			});
			message.success("Successfully deleted！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			this.setState({
				batchDeleteStatus: false
			});
			message.error("Failed to delete！")
		})
	};

	handleBatchDeleteCancel = () => {
		this.setState({
			batchDeleteStatus: false
		});
	};

	render() {
		return (
			<div>
				<CourseManageSearch onSearch={this.handleSearchCommand} onInsert={this.handleInsertCommand}
														onBatchDelete={this.handleBatchDeleteCommand}/>
				<CourseManageTable tableData={this.state.tableData}
													 onUpdate={this.handleUpdate}
													 onDelete={this.handleDelete}
													 pagination={{
														 ...this.state.pagination,
														 onChange: this.handlePageChange,
														 onShowSizeChange: this.handleShowSizeChange
													 }}
													 onSelectionChange={this.handleSelectionChange}
				/>
				<CourseEditDialog record={this.state.insertRecord}
													visible={this.state.insertStatus}
													onSure={this.handleInsert}
													onCancel={this.handleInsertCancel}/>
				<DeleteDialog record={this.state.batchDeleteRecords}
											visible={this.state.batchDeleteStatus}
											onSure={this.handleBatchDelete}
											onCancel={this.handleBatchDeleteCancel}/>
			</div>
		);
	}

	getData = (search: Partial<Course>, pageNum: number, pageSize: number) => {
		console.log(search);
		CourseService.selectRecords(CourseService.filter(search), pageNum, pageSize).then(res => {
			const data: PageInfo<Course> = res.data.data as PageInfo<Course>;
			this.setState({
				tableData: data.list,
				pagination: {
					current: data.pageNum,
					pageSize: data.pageSize,
					total: data.total
				},
				search: search
			});
		})
	}

}

export default CourseManage;