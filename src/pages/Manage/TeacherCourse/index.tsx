import React from 'react';
import {Teacher} from "../../../services/TeacherService";
import TeacherCourseSearch from "../../../components/Search/TeacherCourseSearch";
import {Course, defaultCourse} from "../../../services/CourseService";
import {ManagePaginationProps} from "../../../components/Table";
import TeacherCourseService from "../../../services/TeacherCourseService";
import {PageInfo} from "../../../services/service";
import {message} from "antd";
import {
	TeacherBatchSelectCourseDialog,
	TeacherSelectedCourseDialog
} from "./TeacherCourseModal";
import {TeacherUnSelectedCourseTable} from "../../../components/Table/TeacherCourseTable";

/*
 * @class TeacherCourseState
 * @description 教师管理课程的state
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 18:55
 **/
export interface TeacherCourseState {
	/*
	 * @var 教师id
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 18:59
	 **/
	id: number
	/*
	 * @var 搜索结果
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:00
	 **/
	search: Partial<Course>,
	/*
	 * @var 批量选择的模态框提示是否显示
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:01
	 **/
	batchSelectStatus: boolean
	/*
	 * @var 查看以选择课程的模态框提示是否显示
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:02
	 **/
	selectedDialogStatus: boolean
	/*
	 * @var 已经选择的课程
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:02
	 **/
	selectedData: Array<Course>,
	/*
	 * @var 将要从已选择课程中删除的课程
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:03
	 **/
	unSelectedRows: Array<Course>
	/*
	 * @var 未选择的课程
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:03
	 **/
	unSelectedData: Array<Course>,
	/*
	 * @var 将要选择的课程
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:04
	 **/
	selectedRows: Array<Course>,
	/*
	 * @var 未选择课程的分页参数
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 19:04
	 **/
	unSelectedDataPagination: Omit<Omit<ManagePaginationProps, 'onChange'>, 'onShowSizeChange'>,
}

/*
 * @class TeacherCourse
 * @description 教师管理课程界面
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 18:50
 **/
class TeacherCourse extends React.Component<{}, TeacherCourseState> {

	state: TeacherCourseState = {
		id: 0,
		search: defaultCourse,
		batchSelectStatus: false,
		selectedDialogStatus: false,

		selectedData: [],
		unSelectedRows: [],

		unSelectedData: [],
		selectedRows: [],
		unSelectedDataPagination: {
			current: 1,
			pageSize: 5,
			total: NaN,
		}
	};

	handleIdChange = (id: number) => {
		/*
		 * @method handleIdChange
		 * @param id 教师id
		 * @description 搜索组件的id有变化，重新刷新表格
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 18:54
		 **/
		this.getData(id, this.state.search, this.state.unSelectedDataPagination.current, this.state.unSelectedDataPagination.pageSize);
	};

	handleSearchCommand = (id: number, search: Partial<Course>) => {
		/*
		 * @method handleSearchCommand
		 * @param id 教师id
		 * @param search 搜索结果
		 * @description 搜索结果变化，重新刷新表格
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:06
		 **/
		this.getData(id, search, this.state.unSelectedDataPagination.current, this.state.unSelectedDataPagination.pageSize);
	};

	handleUnSelectedCourseBatchSelectCommand = () => {
		/*
		 * @method handleUnSelectedCourseBatchSelectCommand
		 * @description 点击了批量选择课程按钮的回调，显示批量选择的提示
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:07
		 **/
		if (!this.state.id) {
			message.warn('No selected teacher!');
			return;
		}
		if (this.state.selectedRows.length === 0) {
			message.warn('No course selected！');
			return;
		}
		this.setState({
			batchSelectStatus: true
		})
	};

	handleShowSelectedCommand = () => {
		/*
		 * @method handleShowSelectedCommand
		 * @description 点击了显示以选择课程的回调，显示以选择课程表格
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:08
		 **/
		if (!this.state.id) {
			message.warn('No selected teacher!');
			return;
		}
		if (this.state.selectedData.length === 0) {
			message.warn('No selected courses!');
			return;
		}
		this.setState({
			selectedDialogStatus: true
		})
	};

	handleUnSelectedCourseSelect = (record: Course) => {
		/*
		 * @method handleUnSelectedCourseSelect
		 * @param record 确定选择的课程
		 * @description 收到确定选择的课程，调用后台接口
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:09
		 **/
		TeacherCourseService.choose({tid: this.state.id, cid: record.id as number}).then(() => {
			message.success("Successfully chose！");
			this.getData(this.state.id, this.state.search, this.state.unSelectedDataPagination.current, this.state.unSelectedDataPagination.pageSize);
		}).catch(() => {
			message.error("Choice failed！")
		});
	};


	handleUnSelectedCourseBatchSelect = (records: Course[]) => {
		/*
		 * @method handleUnSelectedCourseBatchSelect
		 * @param records 批量选择的课程(数组)
		 * @description 收到批量选择的课程(数组)，调用后台接口
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:11
		 **/
		TeacherCourseService.batchChoose(records.map(course => ({
			tid: this.state.id,
			cid: course.id as number
		}))).then(() => {
			this.setState({
				selectedRows: [],
				batchSelectStatus: false
			});
			message.success("Successfully chose！");
			this.getData(this.state.id, this.state.search, this.state.unSelectedDataPagination.current, this.state.unSelectedDataPagination.pageSize);
		}).catch(() => {
			this.setState({
				batchSelectStatus: false
			});
			message.error("Choice failed！")
		});
	};

	handleUnSelectedCourseBatchSelectCancel = () => {
		/*
		 * @method handleUnSelectedCourseBatchSelectCancel
		 * @description 取消选择课程的回调，隐藏选择课程的提示
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:11
		 **/
		this.setState({
			batchSelectStatus: false
		});
	};

	handleUnSelectedTablePageChange = (page: number, pageSize?: number | undefined) => {
		/*
		 * @method handleUnSelectedTablePageChange
		 * @param page 当前页
		 * @param pageSize 当前页包含的记录数量
		 * @description 未选择表格的页码发生变化，重新刷新表格
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:14
		 **/
		this.getData(this.state.id, this.state.search, page, pageSize as number);
	};

	handleUnSelectedTablePageSizeChange = (current: number, size: number) => {
		/*
		 * @method handleUnSelectedTablePageSizeChange
		 * @param current 当前页
		 * @param size 一页包含的记录数量
		 * @description 未选择表格的页码发生变化，重新刷新表格
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:16
		 **/
		this.getData(this.state.id, this.state.search, current, size);
	};

	handleUnSelectedTableSelectionChange = (selectedRowKeys: number[], selectedRows: Course[]) => {
		/*
		 * @method handleUnSelectedTableSelectionChange
		 * @param selectedRowKeys 选择的课程的id(数组)
		 * @param selectedRows 选择的课程(数组)
		 * @description 选择项出现变化，将最新的数据保存
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 19:51
		 **/
		this.setState({
			selectedRows: selectedRows
		});
	};

	handleSelectedCourseDrop = (records: Course[]) => {
		/*
		 * @method handleSelectedCourseDrop
		 * @param records 以选择课程的模态框发送的确定删除的课程（数组）
		 * @description 收到确定删除的课程(数组)，调用后台接口
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:04
		 **/
		this.setState({
			selectedDialogStatus: false
		});
		TeacherCourseService.batchDrop(records.map(course => ({
			tid: this.state.id,
			cid: course.id as number
		}))).then(() => {
			message.success("Successfully drop！");
			this.getData(this.state.id, this.state.search, this.state.unSelectedDataPagination.current, this.state.unSelectedDataPagination.pageSize);
		}).catch(() => {
			message.error("Drop failed！")
		})
	};

	handleSelectedCourseDropCancel = () => {
		/*
		 * @method handleSelectedCourseDropCancel
		 * @description 取消删除课程的回调，隐藏已选择课程的模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:06
		 **/
		const {selectedData, selectedRows} = this.state;
		this.setState({
			selectedDialogStatus: false,
			selectedData: [...selectedData],
			selectedRows: [...selectedRows]
		})
	};

	render() {
		return (
			<div>
				<TeacherCourseSearch id={this.state.id}
														 onIdChange={this.handleIdChange}
														 onSearch={this.handleSearchCommand}
														 onBatchSelect={this.handleUnSelectedCourseBatchSelectCommand}
														 onShowSelected={this.handleShowSelectedCommand}
				/>
				<TeacherUnSelectedCourseTable dataSource={this.state.unSelectedData}
																			onSelect={this.handleUnSelectedCourseSelect}
																			pagination={{
																				...this.state.unSelectedDataPagination,
																				onChange: this.handleUnSelectedTablePageChange,
																				onShowSizeChange: this.handleUnSelectedTablePageSizeChange
																			}}
																			onSelectionChange={this.handleUnSelectedTableSelectionChange}
				/>
				<TeacherBatchSelectCourseDialog record={this.state.selectedRows}
																				visible={this.state.batchSelectStatus}
																				onSure={this.handleUnSelectedCourseBatchSelect}
																				onCancel={this.handleUnSelectedCourseBatchSelectCancel}/>
				<TeacherSelectedCourseDialog dataSource={this.state.selectedData}
																		 visible={this.state.selectedDialogStatus}
																		 onCancel={this.handleSelectedCourseDropCancel}
																		 onSure={this.handleSelectedCourseDrop}/>
			</div>
		);
	}

	getData = (id: number, search: Partial<Teacher>, pageNum: number, pageSize: number) => {
		/*
		 * @method getData
		 * @param id 教师id
		 * @param search 搜索结果
		 * @param pageNum 当前页
		 * @param pageSize 当前页的记录数
		 * @description 重新获取数据并保存
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:07
		 **/
		TeacherCourseService.allMethod([
			TeacherCourseService.unSelected(id, search.name as string, pageNum, pageSize),
			TeacherCourseService.selected(id, null, 2)])
			.then(([unSelectResult, selectResult]) => {
				const unSelect: PageInfo<Course> = unSelectResult.data.data as PageInfo<Course>;
				const select: Array<Course> = selectResult.data.data as Array<Course>;

				this.setState({
					id: id,
					search: search,

					selectedData: select,
					unSelectedRows: [],

					unSelectedData: unSelect.list,
					selectedRows: [],
					unSelectedDataPagination: {
						current: unSelect.pageNum,
						pageSize: unSelect.pageSize,
						total: unSelect.total
					}
				});
			});
	}

}

export default TeacherCourse;