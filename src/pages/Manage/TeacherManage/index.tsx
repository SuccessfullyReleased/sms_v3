import React from 'react';
import TeacherManageSearch from "../../../components/Search/TeacherManageSearch";
import TeacherManageTable from "../../../components/Table/TeacherManageTable";
import TeacherService, {defaultTeacher, Teacher} from "../../../services/TeacherService";
import {PageInfo} from "../../../services/service";
import {message} from "antd";
import TeacherEditDialog from "../../../components/Dialog/EditModal/TeacherEditDialog";
import {DeleteDialog} from "../../../components/Dialog/DeleteModal";
import {ManageState} from "../index";

/*
 * @class TeacherManage
 * @description 教师管理系统
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/11 0:01
 * @see CourseManage
 **/
class TeacherManage extends React.Component<{}, ManageState<Teacher>> {

	state: ManageState<Teacher> = {
		tableData: [],
		pagination: {
			current: 1,
			pageSize: 5,
			total: NaN,
		},
		search: defaultTeacher,
		insertRecord: defaultTeacher,
		insertStatus: false,
		batchDeleteRecords: [],
		batchDeleteStatus: false
	};

	componentDidMount() {
		this.getData({}, this.state.pagination.current, this.state.pagination.pageSize);
	}

	handleSearchCommand = (search: Partial<Teacher>) => {
		this.getData(search, this.state.pagination.current, this.state.pagination.pageSize);
	};

	handleInsertCommand = () => {
		this.setState({
			insertStatus: true
		});
	};

	handleBatchDeleteCommand = () => {
		if (this.state.batchDeleteRecords.length===0){
			message.warn('No selected teacher!');
			return;
		}
		this.setState({
			batchDeleteStatus: true
		})
	};

	handleUpdate = (record: Partial<Teacher>) => {
		TeacherService.updateRecord(record).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleDelete = (record: Partial<Teacher>) => {
		TeacherService.deleteById(record.id as number).then(() => {
			message.success("Successfully deleted！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Failed to delete！")
		})
	};

	handlePageChange = (page: number, pageSize?: number) => {
		this.getData(this.state.search, page, pageSize as number);
	};

	handleShowSizeChange = (current: number, size: number) => {
		this.getData(this.state.search, current, size);
	};

	handleInsert = (record: Partial<Teacher>) => {
		this.setState({
			insertRecord: defaultTeacher,
			insertStatus: false
		});
		TeacherService.insertRecord(record).then(() => {
			message.success("Successfully saved！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Save failed！")
		})
	};
	handleInsertCancel = () => {
		this.setState({
			insertRecord: defaultTeacher,
			insertStatus: false
		});
	};

	handleSelectionChange = (selectedRowKeys: number[]) => {
		this.setState({
			batchDeleteRecords: selectedRowKeys
		});
	};

	handleBatchDelete = (ids: number[]) => {
		TeacherService.deleteByIds(ids).then(() => {
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
				<TeacherManageSearch onSearch={this.handleSearchCommand} onInsert={this.handleInsertCommand}
														 onBatchDelete={this.handleBatchDeleteCommand}/>
				<TeacherManageTable tableData={this.state.tableData}
														onUpdate={this.handleUpdate}
														onDelete={this.handleDelete}
														pagination={{
															...this.state.pagination,
															onChange: this.handlePageChange,
															onShowSizeChange: this.handleShowSizeChange
														}}
														onSelectionChange={this.handleSelectionChange}
				/>
				<TeacherEditDialog record={this.state.insertRecord}
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

	getData = (search: Partial<Teacher>, pageNum: number, pageSize: number) => {
		console.log(search);
		TeacherService.selectRecords(TeacherService.filter(search), pageNum, pageSize).then(res => {
			const data: PageInfo<Teacher> = res.data.data as PageInfo<Teacher>;
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

export default TeacherManage;