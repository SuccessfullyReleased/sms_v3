import React, {useState} from 'react';
import {Button} from "antd";
import {ColumnProps} from "antd/es/table";
import styles from './index.module.css';
import {ManageTableProps} from "./index";
import ManageTable from "./ManageTable";
import StudentEditDialog from "../Dialog/EditModal/StudentEditDialog";
import {DeleteDialog} from "../Dialog/DeleteModal";
import {StudentClazz} from "../../services/StudentClazzService";

/*
 * @class StudentManageTable
 * @description 学生管理表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:07
 * @see CourseManageTable
 **/
const StudentManageTable: React.FC<ManageTableProps<StudentClazz>> = (props) => {

	const columns: ColumnProps<StudentClazz>[] = [{
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
		title: 'ClassName',
		dataIndex: 'className',
		key: 'className',
		render: (text) => text ? text : '暂无班级',
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

	const [editRecord, setEditRecord] = useState({} as StudentClazz);
	const [editStatus, setEditStatus] = useState(false);

	const [deleteRecord, setDeleteRecord] = useState({} as StudentClazz);
	const [deleteStatus, setDeleteStatus] = useState(false);

	const handleEdit = (record: any, index: number) => {
		setEditRecord(record);
		setEditStatus(true);
	};

	const handleDelete = (record: any, index: number) => {
		setDeleteRecord(record);
		setDeleteStatus(true);
	};

	const handleRecordUpdate = (record: Partial<StudentClazz>) => {
		setEditStatus(false);
		setEditRecord({} as StudentClazz);
		props.onUpdate(record);
	};

	const handleRecordUpdateCancel = () => {
		setEditStatus(false);
		setEditRecord({} as StudentClazz);
	};

	const handleRecordDelete = (record: StudentClazz | StudentClazz[]) => {
		setDeleteStatus(false);
		setDeleteRecord({} as StudentClazz);
		props.onDelete(record as StudentClazz);
	};

	const handleRecordDeleteCancel = () => {
		setDeleteStatus(false);
		setDeleteRecord({} as StudentClazz);
	};

	return (
		<div className="container">
			<ManageTable
				columns={columns}
				tableData={props.tableData}
				pagination={props.pagination}
				onSelectionChange={props.onSelectionChange}/>
			<StudentEditDialog
				key={editRecord.id}
				record={editRecord}
				visible={editStatus}
				onSure={handleRecordUpdate}
				onCancel={handleRecordUpdateCancel}/>
			<DeleteDialog
				record={deleteRecord}
				visible={deleteStatus}
				onSure={handleRecordDelete}
				onCancel={handleRecordDeleteCancel}/>
		</div>
	);
};

export default StudentManageTable;