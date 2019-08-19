import React, {useEffect, useState} from 'react';
import {AutoComplete, Button, Col, Form, Row} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import {SelectValue} from "antd/lib/select";
import {debounce} from 'lodash'
import {DataSourceItemType} from "antd/lib/auto-complete";
import {Course} from "../../services/CourseService";
import {Clazz} from "../../services/ClazzService";
import TeacherCourseService from "../../services/TeacherCourseService";


export interface CompulsoryScoreImportSearchResult {

	zid: number

	cid: number,

}

export interface CompulsoryScoreImportSearchProps extends FormComponentProps {

	id: number,

	search: CompulsoryScoreImportSearchResult

	onChange: (search: CompulsoryScoreImportSearchResult) => void

	onEdit: (search: CompulsoryScoreImportSearchResult) => void

	onSubmit: () => void
}

const CompulsoryScoreImportSearchContent: React.FC<CompulsoryScoreImportSearchProps> = (props) => {

	const [search, setSearch] = useState(props.search);

	const [courseData, setCourseData] = useState([] as DataSourceItemType[]);
	const [classData, setClassData] = useState([] as Clazz[]);
	const [classDataCache, setClassDataCache] = useState([] as DataSourceItemType[]);

	const [zDisable, setZDisable] = useState(true);
	const [isEdit, setEdit] = useState(false);

	useEffect(() => {
		TeacherCourseService.selected(props.id, 1, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
	}, [props.id]);


	const handleCourseSearch = debounce((value: string) => {
		TeacherCourseService.selected(props.id, 1, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
	}, 1000);

	const handleCourseSelect = (value: SelectValue, option: Object) => {
		setSearch({
			cid: Number(value),
			zid: search.zid
		});
		TeacherCourseService.selectClass(props.id, Number(value)).then(res => {
			setClassData(res.data.data);
			const data = (res.data.data as Clazz[]).map(clazz => ({
				text: clazz.name,
				value: String(clazz.id)
			}));
			setClassDataCache(data);
		});
		setZDisable(false);
	};

	const handleClassSearch = debounce((value: string) => {
		setClassDataCache(classData.filter(clazz => clazz.name.includes(value)).map(clazz => ({
			text: clazz.name,
			value: String(clazz.id)
		})));
	}, 1000);

	const handleClassSelect = (value: SelectValue, option: Object) => {
		setSearch({
			cid: search.cid,
			zid: Number(value)
		});
		props.onChange({
			cid: search.cid,
			zid: Number(value)
		})
	};

	const handleEdit: React.MouseEventHandler = (e) => {
		e.preventDefault();
		setEdit(!isEdit);
		props.onEdit(search);
	};

	const handleSubmit: React.MouseEventHandler = (e) => {
		e.preventDefault();
		setEdit(!isEdit);
		props.onSubmit();
	};

	const {getFieldDecorator} = props.form;

	return (
		<div className="container">
			<Form>
				<Row gutter={16}>
					<Col span={2} className={styles.Text}>
						CourseName
					</Col>
					<Col span={4}>
						<Form.Item>
							{
								getFieldDecorator('CourseName', {
									initialValue: String(search.cid === 0 ? '' : search.cid)
								})(
									<AutoComplete
										className={styles.Complete}
										dataSource={courseData}
										onSelect={handleCourseSelect}
										onSearch={handleCourseSearch}
										allowClear
										backfill={true}
									/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={2} className={styles.Text}>
						ClassName
					</Col>
					<Col span={4}>
						<Form.Item>
							{
								getFieldDecorator('ClassName', {
									initialValue: String(search.zid === 0 ? '' : search.zid)
								})(
									<AutoComplete
										className={styles.Complete}
										dataSource={classDataCache}
										disabled={zDisable}
										onSelect={handleClassSelect}
										onSearch={handleClassSearch}
										allowClear
										backfill={true}
									/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={3}>
						<div>
							{
								isEdit ?
									<Button className={styles.Btn} icon="check" type="primary" onClick={handleSubmit}>Save</Button>
									: <Button className={styles.Btn} icon="edit" onClick={handleEdit}>Edit</Button>
							}
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export const CompulsoryScoreImportSearch = Form.create<CompulsoryScoreImportSearchProps>({})(CompulsoryScoreImportSearchContent);

export interface ElectiveScoreImportSearchResult {

	cid: number,

}

export interface ElectiveScoreImportSearchProps extends FormComponentProps {

	id: number,

	search: ElectiveScoreImportSearchResult

	onChange: (search: ElectiveScoreImportSearchResult) => void

	onEdit: (search: ElectiveScoreImportSearchResult) => void

	onSubmit: () => void
}

const ElectiveScoreImportSearchContent: React.FC<ElectiveScoreImportSearchProps> = (props) => {

	const [search, setSearch] = useState(props.search);

	const [courseData, setCourseData] = useState([] as DataSourceItemType[]);

	const [isEdit, setEdit] = useState(false);

	useEffect(() => {
		TeacherCourseService.selected(props.id, 2, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
	}, [props.id]);


	const handleCourseSearch = debounce((value: string) => {
		TeacherCourseService.selected(props.id, 2, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
	}, 1000);

	const handleCourseSelect = (value: SelectValue, option: Object) => {
		setSearch({
			cid: Number(value)
		});
		props.onChange({
			cid: Number(value)
		})
	};

	const handleEdit: React.MouseEventHandler = (e) => {
		e.preventDefault();
		setEdit(!isEdit);
		props.onEdit(search);
	};

	const handleSubmit: React.MouseEventHandler = (e) => {
		e.preventDefault();
		setEdit(!isEdit);
		props.onSubmit();
	};

	const {getFieldDecorator} = props.form;

	return (
		<div className="container">
			<Form>
				<Row gutter={16}>
					<Col span={2} className={styles.Text}>
						CourseName
					</Col>
					<Col span={4}>
						<Form.Item>
							{
								getFieldDecorator('CourseName', {
									initialValue: String(search.cid === 0 ? '' : search.cid)
								})(
									<AutoComplete
										className={styles.Complete}
										dataSource={courseData}
										onSelect={handleCourseSelect}
										onSearch={handleCourseSearch}
										allowClear
										backfill={true}
									/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={3}>
						<div>

							{
								isEdit ?
									<Button className={styles.Btn} icon="check" type="primary" onClick={handleSubmit}>Save</Button>
									: <Button className={styles.Btn} icon="edit" onClick={handleEdit}>Edit</Button>
							}
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export const ElectiveScoreImportSearch = Form.create<ElectiveScoreImportSearchProps>({})(ElectiveScoreImportSearchContent);