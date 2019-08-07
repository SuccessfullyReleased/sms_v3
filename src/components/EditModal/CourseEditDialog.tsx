import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import {Course} from "../../services/CourseService";
import styles from './index.module.css';
import {EditDialogProps} from "./index";


const EditDialogContent: React.FC<EditDialogProps<Course>> = (props) => {

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
							name: values.courseName as string,
							type: Number(values.courseType),
							status: Number(values.courseStatus)
						});
					}
				});
			}}
		>
			<Form labelCol={{span: 2}} wrapperCol={{span: 20}}>
				<Form.Item>
					{
						getFieldDecorator('courseName', {
							initialValue: props.record.name,
							rules: [{
								required: true,
								message: <span className={styles.msError}>Please input courseName!</span>
							}],
						})(
							<Input addonBefore="courseName"/>
						)
					}
				</Form.Item>
				<Form.Item>
					{
						getFieldDecorator('courseType', {
							initialValue: String(props.record.type)
						})(
							<Select
								placeholder="courseType"
							>
								<Select.Option value="1">Compulsory</Select.Option>
								<Select.Option value="2">Elective</Select.Option>
							</Select>
						)
					}
				</Form.Item>
				<Form.Item>
					{
						getFieldDecorator('courseStatus', {
							initialValue: String(props.record.status)
						})(
							<Select
								placeholder="courseStatus"
							>
								<Select.Option value="1">Initial stage</Select.Option>
								<Select.Option value="2">Selection stage</Select.Option>
								<Select.Option value="3">Teaching stage</Select.Option>
								<Select.Option value="4">Settlement stage</Select.Option>
							</Select>
						)
					}
				</Form.Item>
			</Form>
		</Modal>
	)

};

const CourseEditDialog = Form.create<EditDialogProps<Course>>({})(EditDialogContent);

export default CourseEditDialog;