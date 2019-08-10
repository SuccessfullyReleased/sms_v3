import React, {useState} from 'react';
import {Button, Col, Form, Icon, Input, Row, Select} from "antd";
import styles from './index.module.css';
import {Course} from "../../services/CourseService";
import {ManageSearchProps} from "./index";

/*
 * @class CourseManageSearchContent
 * @description 课程管理界面的搜索组件的内容
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:54
 **/
const CourseManageSearchContent: React.FC<ManageSearchProps<Course>> = (props) => {
	/*
	 * @var 是否展开搜索组件
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:56
	 **/
	const [expanded, setExpanded] = useState(false);

	const handleCourseSearch: React.MouseEventHandler = (e) => {
		e.preventDefault();
		const {getFieldValue} = props.form;
		props.onSearch({
			name: getFieldValue('CourseName'),
			type: Number(getFieldValue('CourseType')),
			status: Number(getFieldValue('CourseStatus'))
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
								getFieldDecorator('CourseName')(
									<Input addonBefore="CourseName"/>
								)
							}
						</Form.Item>
					</Col>
					{expanded ?
						<div>
							<Col span={4}>
								<Form.Item>
									{
										getFieldDecorator('CourseType')(
											<Select
												allowClear
												placeholder="CourseType"
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
										getFieldDecorator('CourseStatus')(
											<Select
												allowClear
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
					<Col span={8}>
						<div>
							<Button className={styles.Btn} type="primary" onClick={handleCourseSearch}>Search<Icon
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

const CourseManageSearch = Form.create<ManageSearchProps<Course>>({})(CourseManageSearchContent);

export default CourseManageSearch;