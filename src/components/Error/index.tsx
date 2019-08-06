import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {Button} from 'antd';
import styles from './index.module.css';

export interface ErrorProps extends RouteComponentProps {
	code?: string,
	tips?: string
}

class Error extends React.Component<ErrorProps> {

	static defaultProps = {
		code: '404',
		tips: '啊哦~ 你所访问的页面不存在'
	};

	render() {
		const {history, code, tips} = this.props as Required<ErrorProps>;
		return (
			<div className={styles.error}>
				<div className={styles.errorCode}>
					{
						code.split('').map((item, index) => {
							return <span key={index}>{item}</span>;
						})
					}
				</div>
				<div className={styles.errorDesc}>{tips}</div>
				<div className={styles.errorHandle}>
					<Link to="/main/dashboard" replace>
						<Button type="primary" size="large">返回首页</Button>
					</Link>
					<Button className={styles.errorBtn} type="primary" size="large" onClick={() => {
						history.goBack()
					}}>返回上一页</Button>
				</div>
			</div>
		)
	}
}


export default withRouter(Error);