import React from 'react';
import {Form, Input, Modal} from 'antd';
import {Clazz} from "../../../services/ClazzService";
import styles from './index.module.css';
import {EditDialogProps} from "./index";

/*
 * @class EditDialogContent
 * @description 班级的编辑模态框
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:38
 **/
const EditDialogContent: React.FC<EditDialogProps<Clazz>> = (props) => {

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
							name: values.ClazzName as string
						});
					}
				});
			}}
		>
			<Form labelCol={{span: 2}} wrapperCol={{span: 20}}>
				<Form.Item>
					{
						getFieldDecorator('ClazzName', {
							initialValue: props.record.name,
							rules: [{
								required: true,
								message: <span className={styles.invalid}>Please input ClazzName!</span>
							}],
						})(
							<Input addonBefore="ClazzName"/>
						)
					}
				</Form.Item>
			</Form>
		</Modal>
	)

};

const ClazzEditDialog = Form.create<EditDialogProps<Clazz>>({})(EditDialogContent);

export default ClazzEditDialog;