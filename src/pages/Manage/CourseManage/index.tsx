import React from 'react';
import CourseManageSearch from "../../../components/Search/CourseManageSearch";
import CourseManageTable from "../../../components/Table/CourseManageTable";
import CourseService, {Course, defaultCourse} from "../../../services/CourseService";
import {PageInfo} from "../../../services/service";
import {message, Modal} from "antd";
import CourseEditDialog from "../../../components/Dialog/EditModal/CourseEditDialog";
import {ManagePaginationProps} from "../../../components/Table";

export interface CourseManageState {
	/*
	 * @var 表格数据源
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:43
	 **/
	tableData: Array<Course>,
	/*
	 * @var 分页参数，onChange,onShowSizeChange由组件自定义实现
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:43
	 **/
	pagination: Omit<Omit<ManagePaginationProps, 'onChange'>, 'onShowSizeChange'>,
	/*
	 * @var 搜索结果
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:44
	 **/
	search: Partial<Course>,
	/*
	 * @var 添加的记录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:44
	 **/
	insertRecord: Partial<Course>,
	/*
	 * @var 添加模态框状态
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:45
	 **/
	insertStatus: boolean,
	/*
	 * @var 批量删除记录的id
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:45
	 **/
	selectedRows: Array<Course>
}

/*
 * @class CourseManage
 * @description 课程管理界面
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:47
 **/
class CourseManage extends React.Component<{}, CourseManageState> {

	state: CourseManageState = {
		tableData: [],
		pagination: {
			current: 1,
			pageSize: 5,
			total: NaN,
		},
		search: defaultCourse,
		insertRecord: defaultCourse,
		insertStatus: false,

		selectedRows: []
	};

	componentDidMount() {
		/*
		 * @method componentDidMount
		 * @description 初始化
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:46
		 **/
		this.getData({}, this.state.pagination.current, this.state.pagination.pageSize);
	}

	handleSearchCommand = (search: Partial<Course>) => {
		/*
		 * @method handleSearchCommand
		 * @param search 搜索结果
		 * @description 点击了搜索按钮，重新获取数据
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:46
		 **/
		this.getData(search, this.state.pagination.current, this.state.pagination.pageSize);
	};

	handleInsertCommand = () => {
		/*
		 * @method handleInsertCommand
		 * @description 点击了添加按钮，显示添加模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:47
		 **/
		this.setState({
			insertStatus: true
		});
	};

	handleBatchDeleteCommand = () => {
		/*
		 * @method handleBatchDeleteCommand
		 * @description 点击了批量删除按钮，显示批量删除模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:48
		 **/
		if (this.state.selectedRows.length === 0) {
			message.warn('No selected courses!');
			return;
		}
		Modal.confirm({
			type: 'danger',
			title: 'Delete',
			content: 'Delete is not recoverable, are you sure？',
			okType: 'danger',
			onOk: this.handleBatchDelete
		});
	};

	handleStartChooseCommand = () => {
		if (this.state.selectedRows.length === 0) {
			message.warn('No selected courses!');
			return;
		}
		Modal.confirm({
			type: 'warn',
			title: 'Alter',
			content: 'Will change the stage of these courses, are you sure？',
			okType: 'primary',
			onOk: this.handleStartChoose
		});
	};

	handleEndChooseCommand = () => {
		if (this.state.selectedRows.length === 0) {
			message.warn('No selected courses!');
			return;
		}
		Modal.confirm({
			type: 'warn',
			title: 'Alter',
			content: 'Will change the stage of these courses, are you sure？',
			okType: 'primary',
			onOk: this.handleEndChoose
		});
	};

	handleStartSettlementCommand = () => {
		if (this.state.selectedRows.length === 0) {
			message.warn('No selected courses!');
			return;
		}
		Modal.confirm({
			type: 'warn',
			title: 'Alter',
			content: 'Will change the stage of these courses, are you sure？',
			okType: 'primary',
			onOk: this.handleStartSettlement
		});
	};

	handleEndSettlementCommand = () => {
		if (this.state.selectedRows.length === 0) {
			message.warn('No selected courses!');
			return;
		}
		Modal.confirm({
			type: 'warn',
			title: 'Alter',
			content: 'Will change the stage of these courses, are you sure？',
			okType: 'primary',
			onOk: this.handleEndSettlement
		});
	};

	handleBatchDelete = () => {
		/*
		 * @method handleBatchDelete
		 * @param record id数组
		 * @description 批量删除，将id数组返回给后台
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:54
		 **/
		CourseService.deleteByIds(this.state.selectedRows.map(course => course.id) as number[]).then(() => {
			message.success("Successfully deleted！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Failed to delete！")
		})
	};

	handleStartChoose = () => {
		CourseService.updateRecords(this.state.selectedRows.filter(course => course.status !== 2).map(course => {
			course.status = 2;
			return course;
		})).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleEndChoose = () => {
		CourseService.updateRecords(this.state.selectedRows.filter(course => course.status !== 3).map(course => {
			course.status = 3;
			return course;
		})).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleStartSettlement = () => {
		CourseService.updateRecords(this.state.selectedRows.filter(course => course.status !== 4).map(course => {
			course.status = 4;
			return course;
		})).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleEndSettlement = () => {
		CourseService.updateRecords(this.state.selectedRows.filter(course => course.status !== 1).map(course => {
			course.status = 1;
			return course;
		})).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleUpdate = (record: Partial<Course>) => {
		/*
		 * @method handleUpdate
		 * @param record 编辑结果
		 * @description  将编辑结果返回给后台
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:48
		 **/
		CourseService.updateRecord(record).then(() => {
			message.success("Update completed！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Update failed！")
		})
	};

	handleDelete = (record: Partial<Course>) => {
		/*
		 * @method handleDelete
		 * @param record 删除的记录
		 * @description 将删除数据的id返回给后台
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:49
		 **/
		CourseService.deleteById(record.id as number).then(() => {
			message.success("Successfully deleted！");
			this.getData(this.state.search, this.state.pagination.current, this.state.pagination.pageSize);
		}).catch(() => {
			message.error("Failed to delete！")
		})
	};

	handlePageChange = (page: number, pageSize?: number) => {
		/*
		 * @method handlePageChange
		 * @param page 当前页
		 * @param pageSize 当前页记录数
		 * @description 当前页发生变化，重新获取数据
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:50
		 **/
		this.getData(this.state.search, page, pageSize as number);
	};

	handleShowSizeChange = (current: number, size: number) => {
		/*
		 * @method handleShowSizeChange
		 * @param current 当前页
		 * @param size 每一页的记录数
		 * @description 每一页的记录数发生变化，重新获取数据
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:51
		 **/
		this.getData(this.state.search, current, size);
	};

	handleInsert = (record: Partial<Course>) => {
		/*
		 * @method handleInsert
		 * @param record 添加的记录
		 * @description 将添加的记录返回给后台
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:52
		 **/
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
		/*
		 * @method handleInsertCancel
		 * @description 添加取消
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:52
		 **/
		this.setState({
			insertRecord: defaultCourse,
			insertStatus: false
		});
	};

	handleSelectionChange = (selectedRowKeys: number[], selectedRows: Course[]) => {
		/*
		 * @method handleSelectionChange
		 * @param selectedRowKeys 选择项id的数组
		 * @description 选择项发生变换，保存数据
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:53
		 **/
		this.setState({
			selectedRows: selectedRows
		});
	};

	render() {
		return (
			<div>
				<CourseManageSearch
					onSearch={this.handleSearchCommand}
					onInsert={this.handleInsertCommand}
					onBatchDelete={this.handleBatchDeleteCommand}
					onStartChoose={this.handleStartChooseCommand}
					onEndChoose={this.handleEndChooseCommand}
					onStartSettlement={this.handleStartSettlementCommand}
					onEndSettlement={this.handleEndSettlementCommand}
				/>
				<CourseManageTable
					tableData={this.state.tableData}
					onUpdate={this.handleUpdate}
					onDelete={this.handleDelete}
					pagination={{
						...this.state.pagination,
						onChange: this.handlePageChange,
						onShowSizeChange: this.handleShowSizeChange
					}}
					onSelectionChange={this.handleSelectionChange}
				/>
				<CourseEditDialog
					record={this.state.insertRecord}
					visible={this.state.insertStatus}
					onSure={this.handleInsert}
					onCancel={this.handleInsertCancel}/>
			</div>
		);
	}

	getData = (search: Partial<Course>, pageNum: number, pageSize: number) => {
		/*
		 * @method getData
		 * @param search 搜索结果
		 * @param pageNum 当前页
		 * @param pageSize 当前页记录数
		 * @description 获取数据
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/11 0:00
		 **/
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