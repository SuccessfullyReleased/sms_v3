import React, {useState} from 'react';
import {Button, Empty, Table} from "antd";
import {ColumnProps} from "antd/es/table";
import {ManagePaginationProps} from "./index";
import ManageTable, {paginationItemRender} from "./ManageTable";
import styles from './index.module.css';
import {ClazzCourseModel} from "../../services/ClazzCourseService";
import {ClazzSelectCourseDialog} from "../../pages/Manage/ClazzCourse/ClazzCourseModal";

const handleRowKey = (record: ClazzCourseModel, index: number) => {
	return `${record.cid}-${record.tid}`
};

/*
 * @class ClazzUnSelectedCourseTableProps
 * @description 教师未选择课程的表格props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:31
 **/
export interface ClazzUnSelectedCourseTableProps<T> {
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
 * @class ClazzUnSelectedCourseTable
 * @description 教师未选择课程的表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:31
 **/
export const ClazzUnSelectedCourseTable: React.FC<ClazzUnSelectedCourseTableProps<ClazzCourseModel>> = (props) => {
	/*
	 * @var 表格每列的格式
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:14
	 **/
	const columns: ColumnProps<ClazzCourseModel>[] = [{
		title: 'CourseName',
		dataIndex: 'course',
		key: 'course',
		align: 'center'
	}, {
		title: 'TeacherName',
		dataIndex: 'teacher',
		key: 'teacher',
		align: 'center'
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
	const [selectRecord, setSelectRecord] = useState({} as ClazzCourseModel);
	/*
	 * @var 选择此课程的模态框提示
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:45
	 **/
	const [selectStatus, setSelectStatus] = useState(false);

	const handleSelectCommand = (record: ClazzCourseModel) => {
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

	const handleRecordSelect = (record: ClazzCourseModel) => {
		/*
		 * @method handleRecordSelect
		 * @param record 确定选择的课程
		 * @description 确定选择课程，点击模态框确定按钮触发的回调，隐藏提示模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:46
		 **/
		setSelectStatus(false);
		setSelectRecord({} as ClazzCourseModel);
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
		setSelectRecord({} as ClazzCourseModel);
	};

	return (
		<div className="container">
			<ManageTable columns={columns}
									 tableData={props.dataSource}
									 showRowSelection={false}
									 rowKey={handleRowKey}
									 pagination={props.pagination}
									 onSelectionChange={props.onSelectionChange}/>
			<ClazzSelectCourseDialog record={selectRecord}
															 visible={selectStatus}
															 onSure={handleRecordSelect}
															 onCancel={handleRecordSelectCancel}/>
		</div>
	);
};

/*
 * @class ClazzSelectedCourseTableProps
 * @description 已选择课程表格的props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:49
 **/
export interface ClazzSelectedCourseTableProps<T> {
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
 * @class ClazzSelectedCourseTable
 * @description 已选择课程表格的
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:52
 **/
export const ClazzSelectedCourseTable: React.FC<ClazzSelectedCourseTableProps<ClazzCourseModel>> = (props) => {
	/*
	 * @var 表格每列的格式
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:14
	 **/
	const columns: ColumnProps<ClazzCourseModel>[] = [{
		title: 'CourseName',
		dataIndex: 'course',
		key: 'course',
		align: 'center'
	}, {
		title: 'TeacherName',
		dataIndex: 'teacher',
		key: 'teacher',
		align: 'center'
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

	const handleDrop = (record: ClazzCourseModel) => {
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
									 rowKey={handleRowKey}
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