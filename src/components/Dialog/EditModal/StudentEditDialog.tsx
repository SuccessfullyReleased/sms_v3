import React, {useEffect, useState} from 'react';
import {AutoComplete, Col, Form, Input, Modal, Row} from 'antd';
import {Student} from "../../../services/StudentService";
import styles from './index.module.css';
import {EditDialogProps} from "./index";
import ClazzService, {Clazz} from "../../../services/ClazzService";
import {StudentClazz} from "../../../services/StudentClazzService";

/*
 * @class EditDialogContent
 * @description 学生的编辑模态框
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:38
 **/
const EditDialogContent: React.FC<EditDialogProps<StudentClazz>> = (props) => {

	const {getFieldDecorator} = props.form;

	const [dataSource, setDataSource] = useState([] as string[]);

	useEffect(() => {
		ClazzService.selectAllRecords().then(res => {
			const data = res.data.data as Clazz[];
			setDataSource(data.map(clazz => clazz.name));
		})
	}, []);

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
							name: values.StudentName as string,
							className: values.ClassName as string
						});
					}
				});
			}}
		>
			<Form labelCol={{span: 2}} wrapperCol={{span: 20}}>
				<Form.Item>
					<Row gutter={16}>
						<Col span={6}>
							<span>StudentID</span>
						</Col>
						<Col span={18}>
							{
								getFieldDecorator('StudentID', {
									initialValue: props.record.sid,
									rules: [{
										required: true,
										message: <span className={styles.invalid}>Please input StudentName!</span>
									}],
								})(
									<Input/>
								)
							}
						</Col>
					</Row>
				</Form.Item>
				<Form.Item>
					<Row gutter={16}>
						<Col span={6}>
							<span>StudentName</span>
						</Col>
						<Col span={18}>
							{
								getFieldDecorator('StudentName', {
									initialValue: props.record.name,
									rules: [{
										required: true,
										message: <span className={styles.invalid}>Please input StudentName!</span>
									}],
								})(
									<Input/>
								)
							}
						</Col>
					</Row>
				</Form.Item>
				<Form.Item>
					<Row gutter={16}>
						<Col span={6}>
							<span>ClassName</span>
						</Col>
						<Col span={18}>
							{
								getFieldDecorator('ClassName', {
									initialValue: props.record.className,
									rules: [{
										required: true,
										message: <span className={styles.invalid}>Please select ClassName!</span>
									}],
								})(
									<AutoComplete
										dataSource={dataSource}
										allowClear
										backfill={true}
									/>
								)
							}
						</Col>
					</Row>
				</Form.Item>
			</Form>
		</Modal>
	)

};

const StudentEditDialog = Form.create<EditDialogProps<Student>>({})(EditDialogContent);

export default StudentEditDialog;