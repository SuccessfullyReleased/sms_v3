import React from 'react';
import {Form, Input, Modal} from 'antd';
import {Teacher} from "../../services/TeacherService";
import styles from './index.module.css';
import {EditDialogProps} from "./index";


const EditDialogContent: React.FC<EditDialogProps<Teacher>> = (props) => {

	const {getFieldDecorator} = props.form;

	return (
		<Modal
			title="Edit"
			visible={props.visible}
			onCancel={() => {
				props.onCancel()
			}}
			onOk={() => {
				props.form.validateFields((err, values) => {
					if (!err) {
						props.onSure({
							id: props.record.id,
							tid: values.TeacherID as string,
							name: values.TeacherName as string
						});
					}
				});
			}}
		>
			<Form labelCol={{span: 2}} wrapperCol={{span: 20}}>
				<Form.Item>
					{
						getFieldDecorator('TeacherID', {
							initialValue: props.record.name,
							rules: [{
								required: true,
								message: <span className={styles.msError}>Please input TeacherName!</span>
							}],
						})(
							<Input addonBefore="TeacherID"/>
						)
					}
				</Form.Item>
				<Form.Item>
					{
						getFieldDecorator('TeacherName', {
							initialValue: props.record.name,
							rules: [{
								required: true,
								message: <span className={styles.msError}>Please input TeacherName!</span>
							}],
						})(
							<Input addonBefore="TeacherName"/>
						)
					}
				</Form.Item>
			</Form>
		</Modal>
	)

};

const TeacherEditDialog = Form.create<EditDialogProps<Teacher>>({})(EditDialogContent);

export default TeacherEditDialog;