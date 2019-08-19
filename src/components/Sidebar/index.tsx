import React from "react";
import {Menu} from 'antd';
import {RouteComponentProps, withRouter} from "react-router";
import IconFont from "../IconFont";
import Menus from './Menus'
import {getUserInfo, UserInfo} from "../../router/Check";

interface SidebarState {
	level: number
}

class Sidebar extends React.Component<RouteComponentProps, SidebarState> {

	state: SidebarState = {
		level: 0
	};

	componentDidMount(): void {
		const user: UserInfo | null = getUserInfo();
		if (user) {
			this.setState({
				level: user.role
			})
		} else {
			this.props.history.push('/login');
		}
	}

	onMenuSelect = ({key}: { key: string }) => {
		this.props.history.push(key);
	};

	render() {
		const {history} = this.props;
		return (
			<div>
				<Menu
					defaultSelectedKeys={[history.location.pathname]}
					selectedKeys={[history.location.pathname]}
					mode="inline"
					theme="dark"
					onClick={this.onMenuSelect}
				>
					{
						Menus.map((items) => {
							if (items.levels.length === 0 || items.levels.includes(this.state.level)) {
								if (items.subs) {
									return (
										<Menu.SubMenu
											key={items.path}
											title={
												<span>
												<IconFont className="sidebar-icon" type={items.icon}/>
												<span>{items.title}</span>
											</span>
											}
										>
											{
												items.subs.map((item) => {
													if (item.levels.length === 0 || item.levels.includes(this.state.level)) {
														if (item.subs) {
															return (
																<Menu.SubMenu
																	key={item.path}
																	title={<span>{item.title}</span>}
																>
																	{
																		item.subs.map((sub) => {
																			if (sub.levels.length === 0 || sub.levels.includes(this.state.level)) {
																				return <Menu.Item key={sub.path}>{sub.title}</Menu.Item>
																			} else {
																				return null
																			}
																		})
																	}
																</Menu.SubMenu>
															)
														} else {
															return <Menu.Item key={item.path}>{item.title}</Menu.Item>
														}
													} else {
														return null;
													}
												})
											}
										</Menu.SubMenu>
									)
								} else {
									return <Menu.Item key={items.path}>
										<IconFont className="sidebar-icon" type={items.icon}/>
										<span>{items.title}</span>
									</Menu.Item>
								}
							} else {
								return null;
							}
						})
					}
				</Menu>
			</div>
		);
	}
}

export default withRouter(Sidebar);
