import React from 'react';
import {Button, Col, Form, Icon, Input, Row} from "antd";
import styles from './index.module.css';
import {ManageSearchProps} from "./index";
import {StudentClazz} from "../../services/StudentClazzService";

/*
 * @class StudentManageSearchContent
 * @description 学生管理界面的搜索组件的内容
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:54
 **/
const StudentManageSearchContent: React.FC<ManageSearchProps<StudentClazz>> = (props) => {

	const handleStudentSearch: React.MouseEventHandler = (e) => {
		e.preventDefault();
		const {getFieldValue} = props.form;
		props.onSearch({
			sid: getFieldValue('StudentID'),
			name: getFieldValue('StudentName'),
			className: getFieldValue('ClassName')
		});
	};

	const {getFieldDecorator} = props.form;

	return (
		<div className="container">
			<Form>
				<Row gutter={16}>
					<Col span={5}>
						<Form.Item>
							{
								getFieldDecorator('StudentID')(
									<Input addonBefore="StudentID"/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item>
							{
								getFieldDecorator('StudentName')(
									<Input addonBefore="StudentName"/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item>
							{
								getFieldDecorator('ClassName')(
									<Input addonBefore="ClassName"/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={8}>
						<div>
							<Button className={styles.Btn} type="primary" onClick={handleStudentSearch}>Search<Icon
								type="search"/></Button>
							<Button className={styles.Btn} icon="plus" onClick={props.onInsert}>Add</Button>
							<Button className={styles.Btn} type="danger" icon="delete" onClick={props.onBatchDelete}>batch
								deletion</Button>
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const StudentManageSearch = Form.create<ManageSearchProps<StudentClazz>>({})(StudentManageSearchContent);

export default StudentManageSearch;