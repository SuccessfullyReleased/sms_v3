import React, {useState} from 'react';
import {Button} from "antd";
import {Clazz} from "../../services/ClazzService";
import {ColumnProps} from "antd/es/table";
import styles from './index.module.css';
import {ManageTableProps} from "./index";
import ManageTable from "./ManageTable";
import ClazzEditDialog from "../Dialog/EditModal/ClazzEditDialog";
import {DeleteDialog} from "../Dialog/DeleteModal";

/*
 * @class ClazzManageTable
 * @description 班级管理表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:07
 * @see CourseManageTable
 **/
const ClazzManageTable: React.FC<ManageTableProps<Clazz>> = (props) => {

	const columns: ColumnProps<Clazz>[] = [{
		title: 'ClazzName',
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

	const [editRecord, setEditRecord] = useState({} as Clazz);
	const [editStatus, setEditStatus] = useState(false);

	const [deleteRecord, setDeleteRecord] = useState({} as Clazz);
	const [deleteStatus, setDeleteStatus] = useState(false);

	const handleEdit = (record: any, index: number) => {
		setEditRecord(record);
		setEditStatus(true);
	};

	const handleDelete = (record: any, index: number) => {
		setDeleteRecord(record);
		setDeleteStatus(true);
	};

	const handleRecordUpdate = (record: Partial<Clazz>) => {
		setEditStatus(false);
		setEditRecord({} as Clazz);
		props.onUpdate(record);
	};

	const handleRecordUpdateCancel = () => {
		setEditStatus(false);
		setEditRecord({} as Clazz);
	};

	const handleRecordDelete = (record: Clazz | Clazz[]) => {
		setDeleteStatus(false);
		setDeleteRecord({} as Clazz);
		props.onDelete(record as Clazz);
	};

	const handleRecordDeleteCancel = () => {
		setDeleteStatus(false);
		setDeleteRecord({} as Clazz);
	};

	return (
		<div className="container">
			<ManageTable
				columns={columns}
				tableData={props.tableData}
				pagination={props.pagination}
				onSelectionChange={props.onSelectionChange}/>
			<ClazzEditDialog
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

export default ClazzManageTable;