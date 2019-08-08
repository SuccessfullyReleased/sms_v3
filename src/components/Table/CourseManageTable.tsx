import React, {useState} from 'react';
import {Button} from "antd";
import {Course} from "../../services/CourseService";
import {ColumnProps} from "antd/es/table";
import styles from './index.module.css';
import {ManageTableProps} from "./index";
import ManageTable from "./ManageTable";
import CourseEditDialog from "../EditModal/CourseEditDialog";
import DeleteDialog from "../DeleteModal";

const formatCourseStatus = (status: number) => {
	switch (status) {
		case 1:
			return 'Initial stage';
		case 2:
			return 'Selection stage';
		case 3:
			return 'Teaching stage';
		case 4:
			return 'Settlement stage';
	}
};

const CourseManageTable: React.FC<ManageTableProps<Course>> = (props) => {

	const courseColumns: ColumnProps<Course>[] = [{
		title: 'courseName',
		dataIndex: 'name',
		key: 'name',
		align: 'center'
	}, {
		title: 'courseType',
		dataIndex: 'type',
		key: 'type',
		align: 'center',
		render: (text, record, index) => (
			text === 1 ? 'Compulsory' : 'Elective'
		)
	}, {
		title: 'courseStatus',
		dataIndex: 'status',
		key: 'status',
		align: 'center',
		render: (text, record, index) => (
			formatCourseStatus(text)
		)
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

	const [editRecord, setEditRecord] = useState({} as Course);
	const [editStatus, setEditStatus] = useState(false);

	const [deleteRecord, setDeleteRecord] = useState({} as Course);
	const [deleteStatus, setDeleteStatus] = useState(false);

	const handleEdit = (record: any, index: number) => {
		setEditRecord(record);
		setEditStatus(true);
	};

	const handleDelete = (record: any, index: number) => {
		setDeleteRecord(record);
		setDeleteStatus(true);
	};

	const handleRecordUpdate = (course: Course) => {
		setEditStatus(false);
		setEditRecord({} as Course);
		props.onUpdate(course);
	};

	const handleRecordUpdateCancel = () => {
		setEditStatus(false);
		setEditRecord({} as Course);
	};

	const handleRecordDelete = (course: Course | Course[]) => {
		setDeleteStatus(false);
		setDeleteRecord({} as Course);
		props.onDelete(course as Course);
	};

	const handleRecordDeleteCancel = () => {
		setDeleteStatus(false);
		setDeleteRecord({} as Course);
	};

	return (
		<div className="container">
			<ManageTable columns={courseColumns}
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