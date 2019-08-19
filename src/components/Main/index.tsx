import React, {Component} from 'react';
import {Layout} from 'antd';
import {MainRouter} from "../../router/Router";
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar/index';

import styles from './index.module.css';

interface MainState {
	collapsed: boolean,
	fullscreen: boolean
}

class Main extends Component<{}, MainState> {
	state = {
		collapsed: false,
		fullscreen: false
	};

	handleCollapse = () => {
		const collapsed = this.state.collapsed;
		this.setState({
			collapsed: !collapsed
		})
	};

	handleFullScreen = () => {
		const fullscreen = this.state.fullscreen;
		const doc: any = document as any;
		if (fullscreen) {
			if (doc.exitFullscreen) {
				doc.exitFullscreen().then((res: void) => {
					console.log(res);
				});
			} else if (doc.webkitCancelFullScreen) {
				doc.webkitCancelFullScreen();
			} else if (doc.mozCancelFullScreen) {
				doc.mozCancelFullScreen();
			} else if (doc.msExitFullscreen) {
				doc.msExitFullscreen();
			}
		} else {
			const element: any = doc.documentElement;
			if (element.requestFullscreen) {
				element.requestFullscreen().then((res: void) => {
					console.log(res);
				});
			} else if (element.webkitRequestFullScreen) {
				element.webkitRequestFullScreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		}
		this.setState({
			fullscreen: !fullscreen
		})
	};

	render() {
		return (
			<div className={styles.main}>
				<Header handleCollapse={this.handleCollapse} handleFullScreen={this.handleFullScreen}
								fullscreen={this.state.fullscreen}/>
				<Layout className={styles.mainContent}>
					<Layout.Sider collapsed={this.state.collapsed} width={240} style={{minHeight: '100vh'}}>
						<Sidebar/>
					</Layout.Sider>
					<Layout>
						<Layout.Content className={styles.mainRight}>
							<MainRouter/>
						</Layout.Content>
						<Layout.Footer className={styles.footer}>
							React Manage System ©2019 Created by Daijunming
						</Layout.Footer>
					</Layout>
				</Layout>

			</div>
		)
	}

}

export default Main;