import React from 'react';
import {Button, Col, Form, Icon, Input, Row} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import {StudentCourseModel} from "../../services/StudentCourseService";


/*
 * @class StudentCourseSearchProps
 * @description 学生课程管理界面的搜索组件的props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:11
 **/
interface ChooseCourseSearchProps extends FormComponentProps {
	/*
	 * @var 点击搜索按钮后触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:13
	 **/
	onSearch: (search: Partial<StudentCourseModel>) => void
	/*
	 * @var 点击批量选择按钮后触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:13
	 **/
	onBatchSelect: () => void
	/*
	 * @var 点击显示以选择课程按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:14
	 **/
	onShowSelected: () => void
}

/*
 * @class StudentCourseSearchContent
 * @description 学生课程管理界面的搜索组件,该组件需要Form包裹
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:27
 **/
const ChooseCourseSearchContent: React.FC<ChooseCourseSearchProps> = (props) => {

	const handleStudentSearch: React.MouseEventHandler = (e) => {
		/*
		 * @method handleStudentSearch
		 * @param e 点击事件的Event对象
		 * @description 点击搜索按钮后触发，触发回调返回搜索结果
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:20
		 **/
		e.preventDefault();
		const {getFieldValue} = props.form;
		props.onSearch({
			course: getFieldValue('CourseName'),
			teacher: getFieldValue('TeacherName')
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
							<Button className={styles.Btn} type="primary" onClick={handleStudentSearch}>Search<Icon
								type="search"/></Button>
							<Button className={styles.Btn} icon="table" onClick={() => {
								props.onShowSelected()
							}}>Selected</Button>
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const ChooseCourseSearch = Form.create<ChooseCourseSearchProps>({})(ChooseCourseSearchContent);

export default ChooseCourseSearch;