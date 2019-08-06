import React, {useState} from 'react';
import {Button, Col, Form, Icon, Input, Row, Select} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";

export type CourseManageSearch = {
	courseName: string,
	courseType: string,
	courseStatus: string
}

interface CourseManageProps extends FormComponentProps {
	onSearch: (search: CourseManageSearch) => void
}

const CourseManageSearch: React.FC<CourseManageProps> = (props) => {

	const [expanded, setExpanded] = useState(false);

	const handleCourseSearch: React.MouseEventHandler = (e) => {
		e.preventDefault();
		const {getFieldValue} = props.form;
		console.log(getFieldValue('courseName'));
		console.log(getFieldValue('courseType'));
		console.log(getFieldValue('courseStatus'));
		props.onSearch({
			courseName: getFieldValue('courseName'),
			courseType: getFieldValue('courseType'),
			courseStatus: getFieldValue('courseStatus')
		});
	};

	const {getFieldDecorator} = props.form;

	return (
		<div>
			<Form>
				<Row gutter={16}>
					<Col span={6}>
						<Form.Item>
							{
								getFieldDecorator('courseName')(
									<Input addonBefore="课程名"/>
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
												placeholder="课程类别"
											>
												<Select.Option value="0">必修</Select.Option>
												<Select.Option value="1">选修</Select.Option>
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
												placeholder="课程状态"
											>
												<Select.Option value="0">初始状态</Select.Option>
												<Select.Option value="1">选课阶段</Select.Option>
												<Select.Option value="2">授课阶段</Select.Option>
												<Select.Option value="3">结算阶段</Select.Option>
											</Select>
										)
									}
								</Form.Item>
							</Col>
							<Col span={2}>
								<a className={styles.MoreLink} onClick={() => setExpanded(false)}>More<Icon type="up"/></a>
							</Col>
						</div>
						:
						<Col span={2}>
							<a className={styles.MoreLink} onClick={() => setExpanded(true)}>More<Icon type="down"/></a>
						</Col>
					}
					<Col span={2}>
						<Button type="primary" onClick={handleCourseSearch}>查找<Icon type="search"/></Button>
					</Col>
					<Col span={2}>
						<Button icon="plus">插入</Button>
					</Col>
					<Col span={3}>
						<Button type="danger" icon="delete">批量删除</Button>
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

export default Form.create({})(CourseManageSearch);