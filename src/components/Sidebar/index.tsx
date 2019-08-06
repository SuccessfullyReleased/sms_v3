import React from "react";
import {Menu} from 'antd';
import {RouteComponentProps, withRouter} from "react-router";
import IconFont from "../IconFont";
import Menus from './Menus'
import './index.css';

class Sidebar extends React.Component<RouteComponentProps> {

	onMenuSelect = ({key}: { key: string }) => {
		this.props.history.push(key);
	};

	render() {
		const {history} = this.props;
		return (
			<div className="Sidebar">
				<Menu
					selectedKeys={[history.location.pathname]}
					mode="inline"
					theme="dark"
					onClick={this.onMenuSelect}
				>
					{
						// 遍历一级菜单
						Menus.map((items) => {
							// 如果有子菜单，则再对子菜单进行遍历渲染
							if (items.subs) {
								return (
									<Menu.SubMenu
										key={items.index}
										title={
											<span>
												<IconFont className="sidebar-icon" type={items.icon}/>
												<span>{items.title}</span>
											</span>
										}
									>
										{
											// 遍历二级菜单
											items.subs.map((item) => {
												// 如果有子菜单，则再对子菜单进行遍历渲染
												if (item.subs) {
													return (
														<Menu.SubMenu
															key={item.index}
															title={<span>{item.title}</span>}
														>
															{
																// 遍历三级菜单，最多支持三级
																item.subs.map((sub) => {
																	return <Menu.Item key={sub.index}>{sub.title}</Menu.Item>
																})
															}
														</Menu.SubMenu>
													)
												} else {
													return <Menu.Item key={item.index}>{item.title}</Menu.Item>
												}
											})
										}
									</Menu.SubMenu>
								)
							} else {
								return <Menu.Item key={items.index}>
									<IconFont className="sidebar-icon" type={items.icon}/>
									<span>{items.title}</span>
								</Menu.Item>
							}
						})
					}
				</Menu>
			</div>
		);
	}
}

export default withRouter(Sidebar);
