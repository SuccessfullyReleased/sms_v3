import React, {useEffect, useState} from 'react';
import {AutoComplete, Button, Col, Form, Icon, Input, Row} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import StudentService, {Student} from "../../services/StudentService";
import {SelectValue} from "antd/lib/select";
import {DataSourceItemType} from "antd/es/auto-complete";
import {StudentCourseModel} from "../../services/StudentCourseService";
import {debounce} from 'lodash'


/*
 * @class StudentCourseSearchProps
 * @description 学生课程管理界面的搜索组件的props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 20:11
 **/
interface StudentCourseSearchProps extends FormComponentProps {
	/*
	 * @var 学生id
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:12
	 **/
	id: number,
	/*
	 * @var id有变化时触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:12
	 **/
	onIdChange: (id: number) => void
	/*
	 * @var 点击搜索按钮后触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:13
	 **/
	onSearch: (id: number, search: Partial<StudentCourseModel>) => void
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
const StudentCourseSearchContent: React.FC<StudentCourseSearchProps> = (props) => {

	/*
	 * @var 将props给的id缓存下来，与AutoComplete组件的string类型同步的需要
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:15
	 **/
	const [id, setId] = useState(props.id as number);
	/*
	 * @var 学生有关信息的数组，给AutoComplete组件作为数据源
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 20:18
	 **/
	const [dataSource, setDataSource] = useState([] as DataSourceItemType[]);

	useEffect(() => {
		/*
		 * @description 初始化AutoComplete组件的数据源
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:19
		 **/

		StudentService.selectByName('').then(res => {
			const data = (res.data.data as Student[]).map(student => ({
				text: `${student.sid} - ${student.name}`,
				value: String(student.id)
			}));
			setDataSource(data);
		});
	}, []);

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
		props.onSearch(id, {
			course: getFieldValue('CourseName'),
			teacher: getFieldValue('TeacherName')
		});
	};

	const handleSearch = debounce((value: string) => {
		/*
		 * @method handleSearch
		 * @param value AutoComplete组件的值
		 * @description AutoComplete组件的值发生变换，重新获取数据源，并根据当前值决定是否触发回调返回id
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:22
		 **/
		if (!value) {
			setId(0);
			if (props.id !== 0) {
				props.onIdChange(0);
			}
		}
		StudentService.selectByName(value).then(res => {
			const data = (res.data.data as Student[]).map(student => ({
				text: `${student.sid} - ${student.name}`,
				value: String(student.id)
			}));
			setDataSource(data);
		});
	}, 1000);

	const handleSelect = (value: SelectValue, option: Object) => {
		/*
		 * @method handleSelect
		 * @param value AutoComplete组件被选择的选项值
		 * @description 对值做转换，触发回调返回id
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 20:24
		 **/
		setId(Number(value));
		props.onIdChange(Number(value));
	};

	const {getFieldDecorator} = props.form;

	return (
		<div className="container">
			<Form>
				<Row gutter={16}>
					<Col span={4}>
						<Form.Item>
							{
								getFieldDecorator('StudentName', {
									initialValue: String(id === 0 ? '' : id)
								})(
									<AutoComplete
										className={styles.Complete}
										dataSource={dataSource}
										style={{width: 200}}
										onSelect={handleSelect}
										onSearch={handleSearch}
										allowClear
										backfill={true}
										placeholder="StudentName"
									/>
								)
							}
						</Form.Item>
					</Col>
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
							{
								id === 0 ? null : <Button className={styles.Btn} icon="table" onClick={() => {
									props.onShowSelected()
								}}>Selected</Button>
							}
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const StudentCourseSearch = Form.create<StudentCourseSearchProps>({})(StudentCourseSearchContent);

export default StudentCourseSearch;