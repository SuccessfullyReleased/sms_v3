import React from 'react';
import {Card, Col, Progress, Row} from "antd";
import styles from './index.module.css'

const Dashboard: React.FC = () => {

	const name: string | null = localStorage.getItem('sms_name');
	const role: string | null = localStorage.getItem('sms_role');

	const getRoleName = (role: string | null): string => {
		switch (role) {
			case '1':
				return 'Student';
			case '2':
				return 'Teacher';
			case '3':
				return 'Manager';
			default:
				return 'Other'
		}
	};

	return (
		<div className="container">
			<Row gutter={20} className={styles.mgb20}>
				<Col span={8}>
					<Card hoverable className={styles.mgb20} style={{height: '252px'}}>
						<div className={styles.userInfo}>
							<img src={require('../../assets/img/user.jpg')} className={styles.userAvator} alt=""/>
							<div className={styles.userInfoCont}>
								<div className={styles.userInfoName}>{name}</div>
								<div>{getRoleName(role)}</div>
							</div>
						</div>
						<div className={styles.userInfoList}>上次登录时间：<span>2019-08-15</span></div>
						<div className={styles.userInfoList}>上次登录地点：<span>广东东莞</span></div>
					</Card>
					<Card hoverable style={{height: '252px'}} title="语言详情">
						TypeScript
						<Progress percent={96.9} strokeColor="#2B7489"/>
						CSS
						<Progress percent={2.2} strokeColor="#563D7C"/>
						Other
						<Progress percent={0.9} strokeColor="#f56c6c"/>
					</Card>
				</Col>
				<Col span={16}>
					<Card hoverable className={styles.text}>
						<img src={require('../../assets/svg/typescript.svg')} alt=""/>
						<span style={{fontSize: 36}}>TypeScript</span>
					</Card>
					<Row gutter={20}>
						<Col span={12}>
							<Card hoverable className={styles.text}>
								<img src={require('../../assets/svg/react.svg')} style={{width: 150}} alt=""/>
								<div>
									<span style={{fontSize: 36}}>React</span>
								</div>
							</Card>
						</Col>
						<Col span={12}>
							<Card hoverable className={styles.text}>
								<img src={require('../../assets/svg/antd.svg')} style={{width: 150}} alt=""/>
								<div>
									<span style={{fontSize: 36}}>Ant Design</span>
								</div>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;