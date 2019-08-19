import React from 'react';
import {CompulsoryScoreSearch, CompulsoryScoreSearchResult} from "../../../../components/Search/ScoreManageSearch";
import StudentCourseService, {SCRelation, StudentScoreModel} from "../../../../services/StudentCourseService";
import {Empty} from "antd";
import {EditTable} from "../index";

interface ScoreManageState<T> {

	search: CompulsoryScoreSearchResult,

	tableData: Array<T>,

	editable: boolean

}

class CompulsoryScoreManage extends React.Component<{}, ScoreManageState<StudentScoreModel>> {

	state: ScoreManageState<StudentScoreModel> = {
		search: {
			tid: 0,
			cid: 0,
			zid: 0
		},
		tableData: [],
		editable: false
	};

	render() {
		return (
			<div>
				<CompulsoryScoreSearch
					search={this.state.search}
					onChange={this.handleSearchChange}
					onEdit={this.handleClickEdit}
					onSubmit={this.handleClickSubmit}/>
				<div className="container">
					{
						this.state.tableData.length === 0 ? <Empty/> :
							<EditTable
								dataSource={this.state.tableData}
								editable={this.state.editable}
								onChange={this.handleScoreChange}/>
					}
				</div>
			</div>
		);
	}

	handleSearchChange = (search: CompulsoryScoreSearchResult) => {
		StudentCourseService.selectCScore(search).then(res => {
			const data = (res.data.data as StudentScoreModel[]).map(tmp => {
				if (tmp.score === undefined) {
					tmp.score = 0;
				}
				return tmp;
			});
			this.setState({
				search: search,
				tableData: data
			})
		});
	};

	handleClickEdit = (search: CompulsoryScoreSearchResult) => {
		StudentCourseService.selectCScore(search).then(res => {
			const data = (res.data.data as StudentScoreModel[]).map(tmp => {
				if (tmp.score === undefined) {
					tmp.score = 0;
				}
				return tmp;
			});
			this.setState({
				search: search,
				tableData: data,
				editable: true
			})
		});
	};

	handleClickSubmit = () => {
		this.setState({
			editable: false
		});
		const data: Partial<SCRelation>[] = this.state.tableData.map(elem => ({
			id: elem.id,
			score: elem.score
		}));
		StudentCourseService.updateList(data).then(res => {
			console.log(res);
		})
	};

	handleScoreChange = (id: number, score: number) => {
		const data = this.state.tableData;
		let elem = data.find(elem => elem.id as number === id);
		if (elem) {
			elem.score = score;
		}
		this.setState({
			tableData: data
		})
	}

}

export default CompulsoryScoreManage;