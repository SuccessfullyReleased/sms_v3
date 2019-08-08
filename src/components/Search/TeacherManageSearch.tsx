import React from 'react';
import {Button, Col, Form, Icon, Input, Row} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import {Teacher} from "../../services/TeacherService";

interface TeacherManageProps extends FormComponentProps {
	onSearch: (search: Partial<Teacher>) => void
	onInsert: () => void
	onBatchDelete: () => void
}

const TeacherManageSearchContent: React.FC<TeacherManageProps> = (props) => {

	const handleTeacherSearch: React.MouseEventHandler = (e) => {
		e.preventDefault();
		const {getFieldValue} = props.form;
		props.onSearch({
			tid: getFieldValue('TeacherID'),
			name: getFieldValue('TeacherName')
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
								getFieldDecorator('TeacherID')(
									<Input addonBefore="TeacherID"/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item>
							{
								getFieldDecorator('TeacherName')(
									<Input addonBefore="TeacherName"/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={8}>
						<div>
							<Button className={styles.Btn} type="primary" onClick={handleTeacherSearch}>Search<Icon
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

const TeacherManageSearch = Form.create<TeacherManageProps>({})(TeacherManageSearchContent);

export default TeacherManageSearch;