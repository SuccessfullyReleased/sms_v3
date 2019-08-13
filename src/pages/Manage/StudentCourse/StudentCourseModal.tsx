import React, {useEffect, useState} from 'react';
import {Modal} from "antd";
import {StudentSelectedCourseTable} from "../../../components/Table/StudentCourseTable";
import {Dialog} from "../../../components/Dialog";
import {StudentCourseModel} from "../../../services/StudentCourseService";

/*
 * @class StudentSelectCourseDialogProps
 * @description 选择课程的提示框props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 21:15
 **/
export interface StudentSelectCourseDialogProps {
	/*
	 * @var 选择的课程
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:16
	 **/
	record: StudentCourseModel,
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
	onSure: (record: StudentCourseModel) => void,
	/*
	 * @var 点击取消按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:17
	 **/
	onCancel: () => void
}

export const StudentSelectCourseDialog: React.FC<StudentSelectCourseDialogProps> = (props) => {
	return (
		<Dialog type={'primary'}
						title={'Choose StudentCourseModel'}
						content={`Will choose ${props.record.course}-${props.record.teacher}, are you sure?`}
						visible={props.visible} record={props.record}
						width={400}
						onSure={props.onSure}
						onCancel={props.onCancel}/>
	)
};

/*
 * @see StudentSelectCourseDialogProps
 */
export interface StudentBatchSelectCourseDialogProps {
	record: StudentCourseModel[],
	visible: boolean,
	onSure: (record: StudentCourseModel[]) => void,
	onCancel: () => void
}

/*
 * @see StudentSelectCourseDialog
 */
export const StudentBatchSelectCourseDialog: React.FC<StudentBatchSelectCourseDialogProps> = (props) => {
	return (
		<Dialog type={'primary'}
						title={'Choose StudentCourseModel'}
						content={`Will choose ${props.record.map(course => (`${course.course}-${course.teacher}`)).join(',')}, are you sure?`}
						visible={props.visible} record={props.record}
						width={400}
						onSure={props.onSure}
						onCancel={props.onCancel}/>
	)
};

/*
 * @class StudentSelectedCourseDialogProps
 * @description 包含已选择课程表格的模态框props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 21:19
 **/
export interface StudentSelectedCourseDialogProps {
	/*
	 * @var 已选择课程的数据源
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 21:20
	 **/
	dataSource: StudentCourseModel[]
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
	onSure: (records: StudentCourseModel[]) => void
}

/*
 * @class StudentSelectedCourseDialog
 * @description 包含已选择课程表格的模态框
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 21:21
 **/
export const StudentSelectedCourseDialog: React.FC<StudentSelectedCourseDialogProps> = (props) => {
	/*
	 * @var 删除课程的缓存数组
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:29
	 **/
	const [dropRecords, setDropRecords] = useState([] as StudentCourseModel[]);
	/*
	 * @var 已选择课程的副本，做缓存
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:29
	 **/
	const [dataSourceCache, setDataSourceCache] = useState([] as StudentCourseModel[]);

	useEffect(() => {
		/*
		 * @description 当dataSource更新时更新缓存
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 22:31
		 **/
		setDataSourceCache([...props.dataSource]);
	}, [props.dataSource]);

	const handleDrop = (record: StudentCourseModel) => {
		/*
		 * @method handleDrop
		 * @param record 删除的课程
		 * @description 接受删除的课程，存入缓存数组
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 22:31
		 **/
		const prev = dropRecords;
		setDataSourceCache(dataSourceCache.filter((course) => (course.cid !== record.cid || course.tid !== record.tid)));
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
			title: 'Drop StudentCourseModel',
			content: `Will drop ${dropRecords.map(course => (`${course.course}-${course.teacher}`)).join(',')}, are you sure?`,
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
			title="Selected StudentCourseModel"
			visible={props.visible}
			width={600}
			onCancel={handleCancel}
			onOk={handleOk}
		>
			<StudentSelectedCourseTable
				dataSource={dataSourceCache}
				onDrop={handleDrop}/>
		</Modal>
	)
};