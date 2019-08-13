import React from 'react';
import {Button, Col, Form, Icon, Input, Row} from "antd";
import styles from './index.module.css';
import {Clazz} from "../../services/ClazzService";
import {ManageSearchProps} from "./index";

/*
 * @class ClazzManageSearchContent
 * @description 学生管理界面的搜索组件的内容
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:54
 **/
const ClazzManageSearchContent: React.FC<ManageSearchProps<Clazz>> = (props) => {

	const handleClazzSearch: React.MouseEventHandler = (e) => {
		e.preventDefault();
		const {getFieldValue} = props.form;
		props.onSearch({
			name: getFieldValue('ClazzName')
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
								getFieldDecorator('ClazzName')(
									<Input addonBefore="ClazzName"/>
								)
							}
						</Form.Item>
					</Col>
					<Col span={8}>
						<div>
							<Button className={styles.Btn} type="primary" onClick={handleClazzSearch}>Search<Icon
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

const ClazzManageSearch = Form.create<ManageSearchProps<Clazz>>({})(ClazzManageSearchContent);

export default ClazzManageSearch;