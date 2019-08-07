import React from 'react';
import {Modal} from 'antd';

import {Course} from "../../services/CourseService";
import {DeleteDialogProps} from "./index";


const CourseDeleteDialog: React.FC<DeleteDialogProps<Course>> = (props) => {
	return (
		<Modal
			okType="danger"
			title="Delete"
			visible={props.visible}
			width={400}
			onCancel={() => {
				props.onCancel()
			}}
			onOk={() => {
				props.onSure(props.record)
			}}
		>
			<div style={{
				fontSize: '16px',
				textAlign: 'center'
			}}>Delete is not recoverable, are you sure？
			</div>
		</Modal>
	)
};

export default CourseDeleteDialog;