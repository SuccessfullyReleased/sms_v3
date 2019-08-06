import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Dropdown, Icon, Menu, Tooltip} from 'antd';
import IconFont from '../IconFont';
import styles from './index.module.css';

interface HeaderProps extends RouteComponentProps {
	handleCollapse: () => void,
	handleFullScreen: () => void,
	fullscreen: boolean
}

interface HeaderState {
	username: string
}

class Header extends Component<HeaderProps, HeaderState> {

	state = {
		username: localStorage.getItem('sms_name') || '?'
	};

	render() {
		return (
			<div className={styles.header}>
				<div className={styles.collapseBtn} onClick={this.props.handleCollapse}>
					<Icon type="appstore"/>
				</div>
				<div className={styles.logo}>React Manage System</div>
				<div className={styles.headerRight}>
					<div className={styles.headerUserCon}>
						<Tooltip title={this.props.fullscreen ? 'close' : 'full screen'} placement="bottom">
							<div className={styles.btnFullscreen} onClick={this.props.handleFullScreen}>
								{this.props.fullscreen ? <IconFont type="icon-fullscreen-exit"/> : <IconFont type="icon-fullscreen"/>}
							</div>
						</Tooltip>
						{/*消息提示*/}
						{/*<Tooltip title={'Message'} placement="bottom">*/}
						{/*	<Link to="tabs">*/}
						{/*		<div className={styles.btnBell}>*/}
						{/*			<IconFont type="icon-notice"/>*/}
						{/*			<span className={styles.btnBellBadge}/>*/}
						{/*		</div>*/}
						{/*	</Link>*/}
						{/*</Tooltip>*/}
						{/* 用户头像 */}
						{/*<Avatar className={styles.userAvator} src={require('../../assets/img/img.jpg')}/>*/}
						{/* 用户名下拉菜单 */}
						<Dropdown className={styles.userName} trigger={["click"]} overlay={(
							<Menu onClick={this.handleDropdown}>
								{/* Menu.Item必须设置唯一的key */}
								<Menu.Item key="1" className={styles.dropItemLink}>
									个人中心
								</Menu.Item>
								<Menu.Divider/>
								<Menu.Item key="2" className={styles.dropItemLink}>退出登录</Menu.Item>
							</Menu>
						)}>
							<span className={styles.elDropdownLink}>
								{this.state.username}
								<Icon type="down"/>
							</span>
						</Dropdown>
					</div>
				</div>
			</div>
		)
	}

	// 用户名下拉菜单操作
	handleDropdown = ({key}: { key: string }) => {
		switch (key) {
			case '1':
				this.props.history.push('/main/setting');
				break;
			case '2':
				localStorage.removeItem('username');
				this.props.history.push('/login');
				break;
			default:
				break;
		}
	}
}

export default withRouter(Header);