import React, {useState} from 'react';
import {Button, Empty, Table} from "antd";
import {Course, formatCourseStatus, formatCourseType} from "../../services/CourseService";
import {ColumnProps} from "antd/es/table";
import {ManagePaginationProps} from "./index";
import ManageTable, {paginationItemRender} from "./ManageTable";
import {TeacherSelectCourseDialog} from "../../pages/Manage/TeacherCourse/TeacherCourseModal";
import styles from './index.module.css';

/*
 * @class TeacherUnSelectedCourseTableProps
 * @description 教师未选择课程的表格props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:31
 **/
export interface TeacherUnSelectedCourseTableProps<T> {
	/*
	 * @var 未选择课程的数据源
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:32
	 **/
	dataSource: Array<T>,
	/*
	 * @var 未选择课程的分页参数
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:32
	 **/
	pagination: ManagePaginationProps
	/*
	 * @var 确定选择一门课程的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:33
	 **/
	onSelect: (record: T) => void,
	/*
	 * @var 选择项变化的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:33
	 **/
	onSelectionChange: (selectedRowKeys: number[], selectedRows: T[]) => void
}

/*
 * @class TeacherUnSelectedCourseTable
 * @description 教师未选择课程的表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:31
 **/
export const TeacherUnSelectedCourseTable: React.FC<TeacherUnSelectedCourseTableProps<Course>> = (props) => {
	/*
	 * @var 表格每列的格式
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:14
	 **/
	const columns: ColumnProps<Course>[] = [{
		title: 'CourseName',
		dataIndex: 'name',
		key: 'name',
		align: 'center'
	}, {
		title: 'CourseType',
		dataIndex: 'type',
		key: 'type',
		align: 'center',
		render: (text) => formatCourseType(text)
	}, {
		title: 'CourseStatus',
		dataIndex: 'status',
		key: 'status',
		align: 'center',
		render: (text) => formatCourseStatus(text)
	}, {
		title: 'Action',
		key: 'action',
		render: (text, record) => {
			return (
				<span>
					<Button type="link" size="small" onClick={() => {
						handleSelectCommand(record)
					}}>Select</Button>
				</span>
			)
		},
		align: 'center'
	}];
	/*
	 * @var 选择的课程
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:45
	 **/
	const [selectRecord, setSelectRecord] = useState({} as Course);
	/*
	 * @var 选择此课程的模态框提示
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:45
	 **/
	const [selectStatus, setSelectStatus] = useState(false);

	const handleSelectCommand = (record: Course) => {
		/*
		 * @method handleSelectCommand
		 * @param record 选择的课程
		 * @description 点击选择按钮触发的回调，显示提示模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:45
		 **/
		setSelectRecord(record);
		setSelectStatus(true);
	};

	const handleRecordSelect = (record: Course) => {
		/*
		 * @method handleRecordSelect
		 * @param record 确定选择的课程
		 * @description 确定选择课程，点击模态框确定按钮触发的回调，隐藏提示模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:46
		 **/
		setSelectStatus(false);
		setSelectRecord({} as Course);
		props.onSelect(record);
	};

	const handleRecordSelectCancel = () => {
		/*
		 * @method handleRecordSelectCancel
		 * @description 不选择课程，点击模态框取消按钮触发的回调，隐藏提示模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:47
		 **/
		setSelectStatus(false);
		setSelectRecord({} as Course);
	};

	return (
		<div className="container">
			<ManageTable columns={columns}
									 tableData={props.dataSource}
									 pagination={props.pagination}
									 onSelectionChange={props.onSelectionChange}/>
			<TeacherSelectCourseDialog record={selectRecord}
																 visible={selectStatus}
																 onSure={handleRecordSelect}
																 onCancel={handleRecordSelectCancel}/>
		</div>
	);
};

/*
 * @class TeacherSelectedCourseTableProps
 * @description 已选择课程表格的props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:49
 **/
export interface TeacherSelectedCourseTableProps<T> {
	/*
	 * @var 已选择课程的数据源
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:50
	 **/
	dataSource: Array<T>,
	/*
	 * @var 点击删除按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:50
	 **/
	onDrop: (record: T) => void,
}

/*
 * @class TeacherSelectedCourseTable
 * @description 已选择课程表格的
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:52
 **/
export const TeacherSelectedCourseTable: React.FC<TeacherSelectedCourseTableProps<Course>> = (props) => {
	/*
	 * @var 表格每列的格式
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:14
	 **/
	const columns: ColumnProps<Course>[] = [{
		title: 'CourseName',
		dataIndex: 'name',
		key: 'name',
		align: 'center'
	}, {
		title: 'CourseType',
		dataIndex: 'type',
		key: 'type',
		align: 'center',
		render: (text) => formatCourseType(text)
	}, {
		title: 'CourseStatus',
		dataIndex: 'status',
		key: 'status',
		align: 'center',
		render: (text) => formatCourseStatus(text)
	}, {
		title: 'Action',
		key: 'action',
		render: (text, record) => {
			return (
				<span>
					<Button type="link" size="small" className={styles.red} onClick={() => {
						handleDrop(record)
					}}>Drop</Button>
				</span>
			)
		},
		align: 'center'
	}];

	const handleDrop = (record: Course) => {
		/*
		 * @method handleDrop
		 * @param record 点击删除按钮返回的删除的课程
		 * @description 触发回调返回课程
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:54
		 **/
		props.onDrop(record);
	};

	return (
		<div>
			<div className="container">
				{
					props.dataSource.length === 0 ? <Empty/> :
						<Table dataSource={props.dataSource}
									 columns={columns}
									 rowKey="id"
									 pagination={{
										 pageSize: 5,
										 showQuickJumper: true,
										 itemRender: paginationItemRender
									 }}/>
				}
			</div>
		</div>
	);
};