import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {Button} from 'antd';
import styles from './index.module.css';

/*
 * @class ErrorProps
 * @description 错误组件props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:47
 **/
export interface ErrorProps extends RouteComponentProps {
	/*
	 * @var 错误代码
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:47
	 **/
	code?: string,
	/*
	 * @var 错误提示
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:47
	 **/
	tips?: string
}
/*
 * @class Error
 * @description 错误组件
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:47
 **/
class Error extends React.Component<ErrorProps> {

	/*
	 * @var 默认错误
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:48
	 **/
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