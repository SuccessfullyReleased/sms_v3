import React, {useEffect, useState} from 'react';
import {Course} from "../../services/CourseService";
import {Modal} from "antd";
import {TeacherSelectedCourseTable} from "../Table/TeacherCourseTable";
import {Dialog} from "./index";

/*
 * @class TeacherSelectCourseDialogProps
 * @description 选择课程的提示框props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 21:15
 **/
export interface TeacherSelectCourseDialogProps {
	/*
	 * @var 选择的课程
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:16
	 **/
	record: Course,
	/*
	 * @var 是否显示该模态框
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:16
	 **/
	visible: boolean,
	/*
	 * @var 点击确定按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:17
	 **/
	onSure: (record: Course) => void,
	/*
	 * @var 点击取消按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:17
	 **/
	onCancel: () => void
}

export const TeacherSelectCourseDialog: React.FC<TeacherSelectCourseDialogProps> = (props) => {
	return (
		<Dialog type={'primary'}
						title={'Choose Course'}
						content={`Will choose ${props.record.name}, are you sure?`}
						visible={props.visible} record={props.record}
						width={400}
						onSure={props.onSure}
						onCancel={props.onCancel}/>
	)
};

/*
 * @see TeacherSelectCourseDialogProps
 */
export interface TeacherBatchSelectCourseDialogProps {
	record: Course[],
	visible: boolean,
	onSure: (record: Course[]) => void,
	onCancel: () => void
}

/*
 * @see TeacherSelectCourseDialog
 */
export const TeacherBatchSelectCourseDialog: React.FC<TeacherBatchSelectCourseDialogProps> = (props) => {
	return (
		<Dialog type={'primary'}
						title={'Choose Course'}
						content={`Will choose ${props.record.map(course => course.name).join(',')}, are you sure?`}
						visible={props.visible} record={props.record}
						width={400}
						onSure={props.onSure}
						onCancel={props.onCancel}/>
	)
};

/*
 * @class TeacherSelectedCourseDialogProps
 * @description 包含已选择课程表格的模态框props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 21:19
 **/
export interface TeacherSelectedCourseDialogProps {
	/*
	 * @var 已选择课程的数据源
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:20
	 **/
	dataSource: Course[]
	/*
	 * @var 是否显示该模态框
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:20
	 **/
	visible: boolean
	/*
	 * @var 点击取消按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:21
	 **/
	onCancel: () => void
	/*
	 * @var 点击确定按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:21
	 **/
	onSure: (records: Course[]) => void
}

/*
 * @class TeacherSelectedCourseDialog
 * @description 包含已选择课程表格的模态框
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 21:21
 **/
export const TeacherSelectedCourseDialog: React.FC<TeacherSelectedCourseDialogProps> = (props) => {
	/*
	 * @var 删除课程的缓存数组
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:29
	 **/
	const [dropRecords, setDropRecords] = useState([] as Course[]);
	/*
	 * @var 已选择课程的副本，做缓存
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:29
	 **/
	const [dataSourceCache, setDataSourceCache] = useState([] as Course[]);

	useEffect(() => {
		/*
		 * @description 当dataSource更新时更新缓存
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 22:31
		 **/
		setDataSourceCache([...props.dataSource]);
	}, [props.dataSource]);

	const handleDrop = (record: Course) => {
		/*
		 * @method handleDrop
		 * @param record 删除的课程
		 * @description 接受删除的课程，存入缓存数组
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 22:31
		 **/
		const prev = dropRecords;
		setDataSourceCache(dataSourceCache.filter((course) => course.id !== record.id));
		setDropRecords([...prev, record]);
	};

	const handleOk = () => {
		/*
		 * @method handleOk
		 * @description 关闭模态框时再次确认是否删除课程
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 22:32
		 **/
		Modal.confirm({
			title: 'Drop Course',
			content: `Will drop ${dropRecords.map(course => course.name).join(',')}, are you sure?`,
			okType: 'danger',
			onOk() {
				props.onSure(dropRecords);
				setDropRecords([]);
				setDataSourceCache([]);
			}
		});
	};

	const handleCancel = () => {
		/*
		 * @method handleCancel
		 * @description 取消删除课程
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 22:33
		 **/
		props.onCancel();
		setDropRecords([]);
		setDataSourceCache([]);
	};

	return (
		<Modal
			title="Selected Course"
			visible={props.visible}
			width={600}
			onCancel={handleCancel}
			onOk={handleOk}
		>
			<TeacherSelectedCourseTable
				dataSource={dataSourceCache}
				onDrop={handleDrop}/>
		</Modal>
	)
};