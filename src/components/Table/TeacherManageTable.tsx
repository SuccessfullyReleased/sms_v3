import React, {useState} from 'react';
import {Button} from "antd";
import {Teacher} from "../../services/TeacherService";
import {ColumnProps} from "antd/es/table";
import styles from './index.module.css';
import {ManageTableProps} from "./index";
import ManageTable from "./ManageTable";
import TeacherEditDialog from "../Dialog/EditModal/TeacherEditDialog";
import {DeleteDialog} from "../Dialog/DeleteModal";

/*
 * @class TeacherManageTable
 * @description 教师管理表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:07
 * @see CourseManageTable
 **/
const TeacherManageTable: React.FC<ManageTableProps<Teacher>> = (props) => {

	const columns: ColumnProps<Teacher>[] = [{
		title: 'TeacherID',
		dataIndex: 'tid',
		key: 'tid',
		align: 'center'
	}, {
		title: 'TeacherName',
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

	const [editRecord, setEditRecord] = useState({} as Teacher);
	const [editStatus, setEditStatus] = useState(false);

	const [deleteRecord, setDeleteRecord] = useState({} as Teacher);
	const [deleteStatus, setDeleteStatus] = useState(false);

	const handleEdit = (record: any, index: number) => {
		setEditRecord(record);
		setEditStatus(true);
	};

	const handleDelete = (record: any, index: number) => {
		setDeleteRecord(record);
		setDeleteStatus(true);
	};

	const handleRecordUpdate = (record: Partial<Teacher>) => {
		setEditStatus(false);
		setEditRecord({} as Teacher);
		props.onUpdate(record);
	};

	const handleRecordUpdateCancel = () => {
		setEditStatus(false);
		setEditRecord({} as Teacher);
	};

	const handleRecordDelete = (record: Teacher | Teacher[]) => {
		setDeleteStatus(false);
		setDeleteRecord({} as Teacher);
		props.onDelete(record as Teacher);
	};

	const handleRecordDeleteCancel = () => {
		setDeleteStatus(false);
		setDeleteRecord({} as Teacher);
	};

	return (
		<div className="container">
			<ManageTable columns={columns}
									 tableData={props.tableData}
									 pagination={props.pagination}
									 onSelectionChange={props.onSelectionChange}/>
			<TeacherEditDialog record={editRecord}
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

export default TeacherManageTable;