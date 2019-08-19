import React from 'react';
import {Empty, Table} from "antd";
import StudentCourseService, {StudentScoreModel} from "../../../services/StudentCourseService";
import {ColumnProps} from "antd/es/table";

const getId = () => {
	const id: string | null = localStorage.getItem('sms_id');
	if (id) {
		return parseInt(id);
	} else {
		return 0;
	}
};

interface ViewScoreProps<T> {
	tableData: Array<T>
}

class ViewScore extends React.Component<{}, ViewScoreProps<StudentScoreModel>> {

	state: ViewScoreProps<StudentScoreModel> = {
		tableData: []
	};

	componentDidMount(): void {
		const id: number = getId();
		StudentCourseService.selectScore(id).then(res => {
			const data = res.data.data as StudentScoreModel[];
			this.setState({tableData: data})
		})
	}

	render() {
		return (
			<div>
				<div className="container">
					{
						this.state.tableData.length === 0 ? <Empty/> :
							<Table dataSource={this.state.tableData}
										 columns={this.columns}
										 rowKey={'id'}/>
					}
				</div>
			</div>
		);
	}

	columns: ColumnProps<StudentScoreModel>[] = [{
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
		title: 'CourseName',
		dataIndex: 'courseName',
		key: 'courseName',
		align: 'center'
	}, {
		title: 'Score',
		dataIndex: 'score',
		key: 'score',
		align: 'center'
	}];

}

export default ViewScore;