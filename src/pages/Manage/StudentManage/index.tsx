import React from 'react';
import StudentManageSearch from "../../../components/Search/StudentManageSearch";
import StudentManageTable from "../../../components/Table/StudentManageTable";
import StudentService, {defaultStudent, Student} from "../../../services/StudentService";
import {PageInfo} from "../../../services/service";
import {message} from "antd";
import StudentEditDialog from "../../../components/Dialog/EditModal/StudentEditDialog";
import {DeleteDialog} from "../../../components/Dialog/DeleteModal";
import {ManageState} from "../index";

/*
 * @class StudentManage
 * @description 学生管理界面
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/11 0:01
 * @see CourseManage
 **/
class StudentManage extends React.Component<{}, ManageState<Student>> {

	state: ManageState<Student> = {
		tableData: [],
		pagination: {
			current: 1,
			pageSize: 5,
			total: NaN,
		},
		search: defaultStudent,
		insertRecord: defaultStudent,
		insertStatus: false,
		batchDeleteRecords: [],
		batchDeleteStatus: false
	};

	componentDidMount() {
		this.getData({}, this.state.pagination.current, this.state.pagination.pageSize);
	}

	handleSearchCommand = (search: Partial<Student>) => {
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

	handleUpdate = (record: Partial<Student>) => {
		StudentService.updateRecord(record).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleDelete = (record: Partial<Student>) => {
		StudentService.deleteById(record.id as number).then(() => {
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

	handleInsert = (record: Partial<Student>) => {
		this.setState({
			insertRecord: defaultStudent,
			insertStatus: false
		});
		StudentService.insertRecord(record).then(() => {
			message.success("Successfully saved！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Save failed！")
		})
	};
	handleInsertCancel = () => {
		this.setState({
			insertRecord: defaultStudent,
			insertStatus: false
		});
	};

	handleSelectionChange = (selectedRowKeys: number[]) => {
		this.setState({
			batchDeleteRecords: selectedRowKeys
		});
	};

	handleBatchDelete = (ids: number[]) => {
		StudentService.deleteByIds(ids).then(() => {
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
				<StudentManageSearch onSearch={this.handleSearchCommand} onInsert={this.handleInsertCommand}
														 onBatchDelete={this.handleBatchDeleteCommand}/>
				<StudentManageTable tableData={this.state.tableData}
														onUpdate={this.handleUpdate}
														onDelete={this.handleDelete}
														pagination={{
															...this.state.pagination,
															onChange: this.handlePageChange,
															onShowSizeChange: this.handleShowSizeChange
														}}
														onSelectionChange={this.handleSelectionChange}
				/>
				<StudentEditDialog record={this.state.insertRecord}
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

	getData = (search: Partial<Student>, pageNum: number, pageSize: number) => {
		console.log(search);
		StudentService.selectRecords(StudentService.filter(search), pageNum, pageSize).then(res => {
			const data: PageInfo<Student> = res.data.data as PageInfo<Student>;
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

export default StudentManage;