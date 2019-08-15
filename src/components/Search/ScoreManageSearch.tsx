import React, {useEffect, useState} from 'react';
import {AutoComplete, Button, Col, Form, Row} from "antd";
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import TeacherService, {Teacher} from "../../services/TeacherService";
import {SelectValue} from "antd/lib/select";
import {debounce} from 'lodash'
import {DataSourceItemType} from "antd/lib/auto-complete";
import {Course} from "../../services/CourseService";
import {Clazz} from "../../services/ClazzService";
import TeacherCourseService from "../../services/TeacherCourseService";


export interface CompulsoryScoreSearchResult {

	tid: number,

	zid: number

	cid: number,

}

export interface CompulsoryScoreSearchProps extends FormComponentProps {

	search: CompulsoryScoreSearchResult

	onChange: (search: CompulsoryScoreSearchResult) => void

	onEdit: (search: CompulsoryScoreSearchResult) => void

	onSubmit: () => void
}

const CompulsoryScoreSearchContent: React.FC<CompulsoryScoreSearchProps> = (props) => {

	const [search, setSearch] = useState(props.search);

	const [teacherData, setTeacherData] = useState([] as DataSourceItemType[]);
	const [courseData, setCourseData] = useState([] as DataSourceItemType[]);
	const [classData, setClassData] = useState([] as Clazz[]);
	const [classDataCache, setClassDataCache] = useState([] as DataSourceItemType[]);

	const [cDisable, setCDisable] = useState(true);
	const [zDisable, setZDisable] = useState(true);
	const [isEdit, setEdit] = useState(false);

	useEffect(() => {
		TeacherService.selectByName('').then(res => {
			const data = (res.data.data as Teacher[]).map(teacher => ({
				text: `${teacher.tid} - ${teacher.name}`,
				value: String(teacher.id)
			}));
			setTeacherData(data);
		});
	}, []);

	const handleTeacherSearch = debounce((value: string) => {
		TeacherService.selectByName(value).then(res => {
			const data = (res.data.data as Teacher[]).map(teacher => ({
				text: `${teacher.tid} - ${teacher.name}`,
				value: String(teacher.id)
			}));
			setTeacherData(data);
			setCDisable(true);
		});
	}, 1000);

	const handleTeacherSelect = (value: SelectValue, option: Object) => {
		setSearch({
			tid: Number(value),
			cid: search.cid,
			zid: search.zid
		});
		TeacherCourseService.selected(Number(value), 1, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
		setCDisable(false);
	};

	const handleCourseSearch = debounce((value: string) => {
		TeacherCourseService.selected(search.tid, 1, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
	}, 1000);

	const handleCourseSelect = (value: SelectValue, option: Object) => {
		setSearch({
			tid: search.tid,
			cid: Number(value),
			zid: search.zid
		});
		TeacherCourseService.selectClass(search.tid, Number(value)).then(res => {
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
			tid: search.tid,
			cid: search.cid,
			zid: Number(value)
		});
		props.onChange({
			tid: search.tid,
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
						TeacherName
					</Col>
					<Col span={4}>
						<Form.Item>
							{
								getFieldDecorator('TeacherName', {
									initialValue: String(search.tid === 0 ? '' : search.tid)
								})(
									<AutoComplete
										className={styles.Complete}
										dataSource={teacherData}
										onSelect={handleTeacherSelect}
										onSearch={handleTeacherSearch}
										allowClear
										backfill={true}
									/>
								)
							}
						</Form.Item>
					</Col>
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
										disabled={cDisable}
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

export const CompulsoryScoreSearch = Form.create<CompulsoryScoreSearchProps>({})(CompulsoryScoreSearchContent);

export interface ElectiveScoreSearchResult {

	tid: number,

	cid: number,

}

export interface ElectiveScoreSearchProps extends FormComponentProps {

	search: ElectiveScoreSearchResult

	onChange: (search: ElectiveScoreSearchResult) => void

	onEdit: (search: ElectiveScoreSearchResult) => void

	onSubmit: () => void
}

const ElectiveScoreSearchContent: React.FC<ElectiveScoreSearchProps> = (props) => {

	const [search, setSearch] = useState(props.search);

	const [teacherData, setTeacherData] = useState([] as DataSourceItemType[]);
	const [courseData, setCourseData] = useState([] as DataSourceItemType[]);

	const [cDisable, setCDisable] = useState(true);
	const [isEdit, setEdit] = useState(false);

	useEffect(() => {
		TeacherService.selectByName('').then(res => {
			const data = (res.data.data as Teacher[]).map(teacher => ({
				text: `${teacher.tid} - ${teacher.name}`,
				value: String(teacher.id)
			}));
			setTeacherData(data);
		});
	}, []);

	const handleTeacherSearch = debounce((value: string) => {
		TeacherService.selectByName(value).then(res => {
			const data = (res.data.data as Teacher[]).map(teacher => ({
				text: `${teacher.tid} - ${teacher.name}`,
				value: String(teacher.id)
			}));
			setTeacherData(data);
			setCDisable(true);
		});
	}, 1000);

	const handleTeacherSelect = (value: SelectValue, option: Object) => {
		setSearch({
			tid: Number(value),
			cid: search.cid
		});
		TeacherCourseService.selected(Number(value), 2, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
		setCDisable(false);
	};

	const handleCourseSearch = debounce((value: string) => {
		TeacherCourseService.selected(search.tid, 2, 4).then(res => {
			const data = (res.data.data as Course[]).map(course => ({
				text: course.name,
				value: String(course.id)
			}));
			setCourseData(data);
		});
	}, 1000);

	const handleCourseSelect = (value: SelectValue, option: Object) => {
		setSearch({
			tid: search.tid,
			cid: Number(value)
		});
		props.onChange({
			tid: search.tid,
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
						TeacherName
					</Col>
					<Col span={4}>
						<Form.Item>
							{
								getFieldDecorator('TeacherName', {
									initialValue: String(search.tid === 0 ? '' : search.tid)
								})(
									<AutoComplete
										className={styles.Complete}
										dataSource={teacherData}
										onSelect={handleTeacherSelect}
										onSearch={handleTeacherSearch}
										allowClear
										backfill={true}
									/>
								)
							}
						</Form.Item>
					</Col>
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
										disabled={cDisable}
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

export const ElectiveScoreSearch = Form.create<ElectiveScoreSearchProps>({})(ElectiveScoreSearchContent);