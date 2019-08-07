import React, {useState} from 'react';
import {Button, Col, Form, Icon, Input, Row, Select} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import {Course} from "../../services/CourseService";

interface CourseManageProps extends FormComponentProps {
	onSearch: (search: Partial<Course>) => void
	onAdd: () => void
	onBatchDelete: () => void
}

const CourseManageSearchContent: React.FC<CourseManageProps> = (props) => {

	const [expanded, setExpanded] = useState(false);

	const handleCourseSearch: React.MouseEventHandler = (e) => {
		e.preventDefault();
		const {getFieldValue} = props.form;
		props.onSearch({
			name: getFieldValue('courseName'),
			type: Number(getFieldValue('courseType')),
			status: Number(getFieldValue('courseStatus'))
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
								getFieldDecorator('courseName')(
									<Input addonBefore="courseName"/>
								)
							}
						</Form.Item>
					</Col>
					{expanded ?
						<div>
							<Col span={4}>
								<Form.Item>
									{
										getFieldDecorator('courseType')(
											<Select
												allowClear
												placeholder="courseType"
											>
												<Select.Option value="1">Compulsory</Select.Option>
												<Select.Option value="2">Elective</Select.Option>
											</Select>
										)
									}
								</Form.Item>
							</Col>
							<Col span={4}>
								<Form.Item>
									{
										getFieldDecorator('courseStatus')(
											<Select
												allowClear
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
							</Col>
							<Col span={2}>
								<span className={styles.MoreLink} onClick={() => setExpanded(false)}>More<Icon type="up"/></span>
							</Col>
						</div>
						:
						<Col span={2}>
							<span className={styles.MoreLink} onClick={() => setExpanded(true)}>More<Icon type="down"/></span>
						</Col>
					}
					<Col span={2}>
						<Button type="primary" onClick={handleCourseSearch}>Search<Icon type="search"/></Button>
					</Col>
					<Col span={2}>
						<Button icon="plus" onClick={props.onAdd}>Add</Button>
					</Col>
					<Col span={3}>
						<Button type="danger" icon="delete" onClick={props.onBatchDelete}>batch deletion</Button>
					</Col>
				</Row>
			</Form>
			{/*<Row className={styles.RowLine}>*/}
			{/*	<Col span={2}>*/}
			{/*		<Button type="primary" onClick={handleCourseSearch}>查找<Icon type="search"/></Button>*/}
			{/*	</Col>*/}
			{/*	<Col span={2}>*/}
			{/*		<Button icon="plus">插入</Button>*/}
			{/*	</Col>*/}
			{/*	<Col span={2}>*/}
			{/*		<Button type="danger" icon="delete">批量删除</Button>*/}
			{/*	</Col>*/}
			{/*</Row>*/}
		</div>
	);
};

const CourseManageSearch = Form.create<CourseManageProps>({})(CourseManageSearchContent);

export default CourseManageSearch;