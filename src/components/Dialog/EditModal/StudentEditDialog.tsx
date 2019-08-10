import React from 'react';
import {Form, Input, Modal} from 'antd';
import {Student} from "../../../services/StudentService";
import styles from './index.module.css';
import {EditDialogProps} from "./index";

/*
 * @class EditDialogContent
 * @description 学生的编辑模态框
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:38
 **/
const EditDialogContent: React.FC<EditDialogProps<Student>> = (props) => {

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
							sid: values.StudentID as string,
							name: values.StudentName as string
						});
					}
				});
			}}
		>
			<Form labelCol={{span: 2}} wrapperCol={{span: 20}}>
				<Form.Item>
					{
						getFieldDecorator('StudentID', {
							initialValue: props.record.name,
							rules: [{
								required: true,
								message: <span className={styles.invalid}>Please input StudentName!</span>
							}],
						})(
							<Input addonBefore="StudentID"/>
						)
					}
				</Form.Item>
				<Form.Item>
					{
						getFieldDecorator('StudentName', {
							initialValue: props.record.name,
							rules: [{
								required: true,
								message: <span className={styles.invalid}>Please input StudentName!</span>
							}],
						})(
							<Input addonBefore="StudentName"/>
						)
					}
				</Form.Item>
			</Form>
		</Modal>
	)

};

const StudentEditDialog = Form.create<EditDialogProps<Student>>({})(EditDialogContent);

export default StudentEditDialog;