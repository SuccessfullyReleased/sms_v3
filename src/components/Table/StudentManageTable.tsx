import React, {useState} from 'react';
import {Button} from "antd";
import {Student} from "../../services/StudentService";
import {ColumnProps} from "antd/es/table";
import styles from './index.module.css';
import {ManageTableProps} from "./index";
import ManageTable from "./ManageTable";
import StudentEditDialog from "../Dialog/EditModal/StudentEditDialog";
import {DeleteDialog} from "../Dialog/DeleteModal";

/*
 * @class StudentManageTable
 * @description 学生管理表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:07
 * @see CourseManageTable
 **/
const StudentManageTable: React.FC<ManageTableProps<Student>> = (props) => {

	const columns: ColumnProps<Student>[] = [{
		title: 'StudentID',
		dataIndex: 'sid',
		key: 'sid',
		align: 'center'
	}, {
		title: 'StudentName',
		dataIndex: 'name',
		key: 'name',
		align: 'center'
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

	const [editRecord, setEditRecord] = useState({} as Student);
	const [editStatus, setEditStatus] = useState(false);

	const [deleteRecord, setDeleteRecord] = useState({} as Student);
	const [deleteStatus, setDeleteStatus] = useState(false);

	const handleEdit = (record: any, index: number) => {
		setEditRecord(record);
		setEditStatus(true);
	};

	const handleDelete = (record: any, index: number) => {
		setDeleteRecord(record);
		setDeleteStatus(true);
	};

	const handleRecordUpdate = (record: Partial<Student>) => {
		setEditStatus(false);
		setEditRecord({} as Student);
		props.onUpdate(record);
	};

	const handleRecordUpdateCancel = () => {
		setEditStatus(false);
		setEditRecord({} as Student);
	};

	const handleRecordDelete = (record: Student | Student[]) => {
		setDeleteStatus(false);
		setDeleteRecord({} as Student);
		props.onDelete(record as Student);
	};

	const handleRecordDeleteCancel = () => {
		setDeleteStatus(false);
		setDeleteRecord({} as Student);
	};

	return (
		<div className="container">
			<ManageTable columns={columns}
									 tableData={props.tableData}
									 pagination={props.pagination}
									 onSelectionChange={props.onSelectionChange}/>
			<StudentEditDialog record={editRecord}
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

export default StudentManageTable;