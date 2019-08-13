import React from 'react';
import ClazzManageSearch from "../../../components/Search/ClazzManageSearch";
import ClazzManageTable from "../../../components/Table/ClazzManageTable";
import ClazzService, {defaultClazz, Clazz} from "../../../services/ClazzService";
import {PageInfo} from "../../../services/service";
import {message} from "antd";
import ClazzEditDialog from "../../../components/Dialog/EditModal/ClazzEditDialog";
import {DeleteDialog} from "../../../components/Dialog/DeleteModal";
import {ManageState} from "../index";

/*
 * @class ClazzManage
 * @description 班级管理界面
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/11 0:01
 * @see CourseManage
 **/
class ClazzManage extends React.Component<{}, ManageState<Clazz>> {

	state: ManageState<Clazz> = {
		tableData: [],
		pagination: {
			current: 1,
			pageSize: 5,
			total: NaN,
		},
		search: defaultClazz,
		insertRecord: defaultClazz,
		insertStatus: false,
		batchDeleteRecords: [],
		batchDeleteStatus: false
	};

	componentDidMount() {
		this.getData({}, this.state.pagination.current, this.state.pagination.pageSize);
	}

	handleSearchCommand = (search: Partial<Clazz>) => {
		this.getData(search, this.state.pagination.current, this.state.pagination.pageSize);
	};

	handleInsertCommand = () => {
		this.setState({
			insertStatus: true
		});
	};

	handleBatchDeleteCommand = () => {
		if (this.state.batchDeleteRecords.length===0){
			message.warn('No selected students!');
			return;
		}
		this.setState({
			batchDeleteStatus: true
		})
	};

	handleUpdate = (record: Partial<Clazz>) => {
		ClazzService.updateRecord(record).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleDelete = (record: Partial<Clazz>) => {
		ClazzService.deleteById(record.id as number).then(() => {
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

	handleInsert = (record: Partial<Clazz>) => {
		this.setState({
			insertRecord: defaultClazz,
			insertStatus: false
		});
		ClazzService.insertRecord(record).then(() => {
			message.success("Successfully saved！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Save failed！")
		})
	};
	handleInsertCancel = () => {
		this.setState({
			insertRecord: defaultClazz,
			insertStatus: false
		});
	};

	handleSelectionChange = (selectedRowKeys: number[]) => {
		this.setState({
			batchDeleteRecords: selectedRowKeys
		});
	};

	handleBatchDelete = (ids: number[]) => {
		ClazzService.deleteByIds(ids).then(() => {
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
				<ClazzManageSearch onSearch={this.handleSearchCommand} onInsert={this.handleInsertCommand}
														 onBatchDelete={this.handleBatchDeleteCommand}/>
				<ClazzManageTable tableData={this.state.tableData}
														onUpdate={this.handleUpdate}
														onDelete={this.handleDelete}
														pagination={{
															...this.state.pagination,
															onChange: this.handlePageChange,
															onShowSizeChange: this.handleShowSizeChange
														}}
														onSelectionChange={this.handleSelectionChange}
				/>
				<ClazzEditDialog record={this.state.insertRecord}
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

	getData = (search: Partial<Clazz>, pageNum: number, pageSize: number) => {
		console.log(search);
		ClazzService.selectRecords(ClazzService.filter(search), pageNum, pageSize).then(res => {
			const data: PageInfo<Clazz> = res.data.data as PageInfo<Clazz>;
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

export default ClazzManage;