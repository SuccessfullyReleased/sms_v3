import React from 'react';
import {Button, Col, Form, Icon, Input, Row} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import {Student} from "../../services/StudentService";

interface StudentManageProps extends FormComponentProps {
	onSearch: (search: Partial<Student>) => void
	onInsert: () => void
	onBatchDelete: () => void
}

const StudentManageSearchContent: React.FC<StudentManageProps> = (props) => {

	const handleStudentSearch: React.MouseEventHandler = (e) => {
		e.preventDefault();
		const {getFieldValue} = props.form;
		props.onSearch({
			sid: getFieldValue('StudentID'),
			name: getFieldValue('StudentName')
		});
	};

	const {getFieldDecorator} = props.form;

	return (
		<div className="container">
			<Form>
				<Row gutter={16}>
					<Col span={6}>
						<Form.Item>
							{
								getFieldDecorator('StudentID')(
									<Input addonBefore="StudentID"/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item>
							{
								getFieldDecorator('StudentName')(
									<Input addonBefore="StudentName"/>
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

const StudentManageSearch = Form.create<StudentManageProps>({})(StudentManageSearchContent);

export default StudentManageSearch;