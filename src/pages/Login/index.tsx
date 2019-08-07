import React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Button, Checkbox, Form, Input, message, Select} from 'antd';
import IconFont from '../../components/IconFont';
import styles from './index.module.css';
import {FormComponentProps} from "antd/es/form";
import UserService from "../../services/UserService";


interface LoginProps extends RouteComponentProps, FormComponentProps {
}

const Login: React.FC<LoginProps> = (props) => {

	const handleSubmit: React.MouseEventHandler<HTMLElement> = (e) => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				UserService.login({account: values.account, password: values.password, role: values.role}).then(res => {
					localStorage.setItem('sms_role', values.role);
					localStorage.setItem('sms_id', String(res.data.data.id));
					localStorage.setItem('sms_account', values.account);
					localStorage.setItem('sms_name', res.data.data.name as string);
					props.history.push('/main/dashboard');
				}).catch(() => {
					message.error('登录失败!');
				});
			}
		});
	};

	const {getFieldDecorator} = props.form;

	return (
		<div className={styles.loginWrap}>
			<div className={styles.msLogin}>
				<div className={styles.msTitle}>React Manage System</div>
				<Form className={styles.msContent}>
					<Form.Item>
						{
							getFieldDecorator('account', {
								initialValue: 'admin',
								rules: [{
									required: true,
									message: <span className={styles.msError}>Please input your username!</span>
								}],
							})(
								<Input addonBefore={<IconFont type="icon-user"/>} placeholder="Username"/>
							)
						}
					</Form.Item>
					<Form.Item>
						{
							getFieldDecorator('password', {
								initialValue: '123456',
								rules: [{
									required: true,
									message: <span className={styles.msError}>Please input your Password!</span>
								}],
							})(
								<Input type="password" addonBefore={<IconFont type="icon-lock"/>} placeholder="Password"/>
							)
						}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('role', {
							initialValue: '3',
							rules: [{required: true, message: <span className={styles.msError}>Please select your role!</span>}],
						})(
							<Select
								suffixIcon={<IconFont type="icon-role"/>}
								placeholder="Role"
							>
								<Select.Option value="1">Student</Select.Option>
								<Select.Option value="2">Teacher</Select.Option>
								<Select.Option value="3">Manager</Select.Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>Remember me</Checkbox>
						)}
						<div className={styles.loginBtn}>
							<Button type="primary" onClick={handleSubmit}>Login</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
};

export default Form.create({name: 'login'})(withRouter(Login));