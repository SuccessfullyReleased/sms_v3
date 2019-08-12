import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import {Course} from "../../../services/CourseService";
import styles from './index.module.css';
import {EditDialogProps} from "./index";

/*
 * @class EditDialogContent
 * @description 课程的编辑模态框
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:38
 **/
const EditDialogContent: React.FC<EditDialogProps<Course>> = (props) => {

	const {getFieldDecorator} = props.form;

	console.log(props.record);

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
							name: values.CourseName as string,
							type: Number(values.CourseType),
							status: Number(values.CourseStatus)
						});
					}
				});
			}}
		>
			<Form labelCol={{span: 2}} wrapperCol={{span: 20}}>
				<Form.Item>
					{
						getFieldDecorator('CourseName', {
							initialValue: props.record.name,
							rules: [{
								required: true,
								message: <span className={styles.invalid}>Please input CourseName!</span>
							}],
						})(
							<Input addonBefore="CourseName"/>
						)
					}
				</Form.Item>
				<Form.Item>
					{
						getFieldDecorator('CourseType', {
							initialValue: String(props.record.type)
						})(
							<Select
								placeholder="CourseType"
							>
								<Select.Option value="1">Compulsory</Select.Option>
								<Select.Option value="2">Elective</Select.Option>
							</Select>
						)
					}
				</Form.Item>
				<Form.Item>
					{
						getFieldDecorator('CourseStatus', {
							initialValue: String(props.record.status)
						})(
							<Select
								placeholder="CourseStatus"
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