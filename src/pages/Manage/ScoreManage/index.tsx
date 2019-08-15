import React from "react";
import {Form, InputNumber, Table} from 'antd';
import {ColumnProps} from "antd/es/table";
import {StudentScoreModel} from "../../../services/StudentCourseService";
import {FormComponentProps} from "antd/es/form";

export interface EditTableCellProps extends FormComponentProps {
	editable: boolean,
	record: StudentScoreModel,
	onChange: (record: StudentScoreModel) => void
}

const EditTableCellContent: React.FC<EditTableCellProps> = (props) => {


	const handleChange = (value: number | undefined) => {
		props.onChange({
			...props.record,
			score: value as number
		});
	};

	const {getFieldDecorator} = props.form;

	return (
		<div>
			<Form>
				{
					props.editable ?
						<Form.Item>
							{
								getFieldDecorator('score', {
									initialValue: props.record.score === 0 ? null : props.record.score
								})(
									<InputNumber min={0} max={100} onChange={handleChange}/>
								)
							}
						</Form.Item>
						: (props.record.score !== 0 ? props.record.score : '无数据')
				}
			</Form>
		</div>
	)
};

export const EditTableCell = Form.create<EditTableCellProps>({})(EditTableCellContent);


export interface EditTableProps {
	dataSource: Array<StudentScoreModel>,
	editable: boolean,
	onChange: (id: number, score: number) => void
}

export const EditTable: React.FC<EditTableProps> = (props) => {

	const columns: ColumnProps<StudentScoreModel>[] = [{
		title: 'StudentID',
		dataIndex: 'sno',
		key: 'sno',
		align: 'center'
	}, {
		title: 'StudentName',
		dataIndex: 'studentName',
		key: 'studentName',
		align: 'center'
	}, {
		title: 'Score',
		width: 400,
		dataIndex: 'score',
		key: 'score',
		render: (text, record) => renderScore(props.editable, record),
		align: 'center'
	}];

	const renderScore = (editable: boolean, record: StudentScoreModel) => {
		return (
			<EditTableCell
				editable={editable}
				record={record}
				onChange={handleRowChange}
			/>
		);
	};

	const handleRowChange = (record: StudentScoreModel) => {
		props.onChange(record.id as number, record.score);
	};

	return (
		<Table dataSource={props.dataSource}
					 columns={columns}
					 rowKey={'id'}/>
	)
};
