import React, {useState} from 'react';
import {Button} from "antd";
import {Course, formatCourseStatus, formatCourseType} from "../../services/CourseService";
import {ColumnProps} from "antd/es/table";
import styles from './index.module.css';
import {ManageTableProps} from "./index";
import ManageTable from "./ManageTable";
import CourseEditDialog from "../Dialog/EditModal/CourseEditDialog";
import {DeleteDialog} from "../Dialog/DeleteModal";

/*
 * @class CourseManageTable
 * @description 课程管理表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:07
 **/
const CourseManageTable: React.FC<ManageTableProps<Course>> = (props) => {
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
		render: (text, record, index) => {
			return (
				<span>
				<Button type="link" size="small" icon="edit" onClick={() => {
					handleEdit(record, index)
				}}>Edit</Button>
				<Button type="link" size="small" icon="delete" className={styles.red} onClick={() => {
					handleDelete(record, index)
				}}>Delete</Button>
			</span>
			)
		},
		align: 'center'
	}];
	/*
	 * @var 编辑的记录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:18
	 **/
	const [editRecord, setEditRecord] = useState({} as Course);
	/*
	 * @var 编辑模态框状态
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:16
	 **/
	const [editStatus, setEditStatus] = useState(false);
	/*
	 * @var 删除的记录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:17
	 **/
	const [deleteRecord, setDeleteRecord] = useState({} as Course);
	/*
	 * @var 删除模态框状态
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:18
	 **/
	const [deleteStatus, setDeleteStatus] = useState(false);

	const handleEdit = (record: any, index: number) => {
		/*
		 * @method handleEdit
		 * @param record 编辑记录
		 * @description 点击编辑按钮，显示编辑模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:24
		 **/
		setEditRecord(record);
		setEditStatus(true);
	};

	const handleDelete = (record: any, index: number) => {
		/*
		 * @method handleDelete
		 * @param record 删除记录
		 * @description 点击删除按钮，显示删除模态框
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:25
		 **/
		setDeleteRecord(record);
		setDeleteStatus(true);
	};

	const handleRecordUpdate = (record: Partial<Course>) => {
		/*
		 * @method handleRecordUpdate
		 * @param record 编辑记录
		 * @description 确定编辑完成，触发回调
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:26
		 **/
		setEditStatus(false);
		setEditRecord({} as Course);
		props.onUpdate(record);
	};

	const handleRecordUpdateCancel = () => {
		/*
		 * @method handleRecordUpdateCancel
		 * @description 取消编辑
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:27
		 **/
		setEditStatus(false);
		setEditRecord({} as Course);
	};

	const handleRecordDelete = (record: Course | Course[]) => {
		/*
		 * @method handleRecordDelete
		 * @param record 删除记录
		 * @description 确定删除，触发回调
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:27
		 **/
		setDeleteStatus(false);
		setDeleteRecord({} as Course);
		props.onDelete(record as Course);
	};

	const handleRecordDeleteCancel = () => {
		/*
		 * @method handleRecordDeleteCancel
		 * @description 取消删除
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:27
		 **/
		setDeleteStatus(false);
		setDeleteRecord({} as Course);
	};

	return (
		<div className="container">
			<ManageTable columns={columns}
									 tableData={props.tableData}
									 pagination={props.pagination}
									 onSelectionChange={props.onSelectionChange}/>
			<CourseEditDialog record={editRecord}
												visible={editStatus}
												onSure={handleRecordUpdate}
												onCancel={handleRecordUpdateCancel}/>
			<DeleteDialog record={deleteRecord}
										visible={deleteStatus}
										onSure={handleRecordDelete}
										onCancel={handleRecordDeleteCancel}/>
		</div>
	);
};

export default CourseManageTable;