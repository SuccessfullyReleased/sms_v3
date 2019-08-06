import React from 'react';
import styles from "./index.module.css";
import {Button, Form, Input} from "antd";
import {FormComponentProps} from "antd/es/form";
import UserService from "../../services/UserService";


interface SettingProps extends FormComponentProps {
}


const Setting: React.FC<SettingProps> = (props) => {


	const {getFieldDecorator} = props.form;

	const handleSubmit: React.MouseEventHandler<HTMLElement> = (e) => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			UserService.updatePassword(values.new_password);
		});
	};

	const handleOldPassword = (rule: any, value: any, callback: any) => {
		try {
			UserService.verify(value).then(res => {
				callback();
			}).catch(err => {
				callback(<span className={styles.Error}>The password is incorrect!</span>);
			});
		} catch (e) {
			console.log(e);
		}
	};

	const handleNewPassword = (rule: any, value: any, callback: any) => {
		try {
			UserService.verify(value).then(res => {
				callback(<span className={styles.Error}>Same as old password!</span>);
			}).catch(() => {
				callback();
			});
		} catch (e) {
			console.log(e);
		}
	};

	const handleConfirmPassword = (rule: any, value: any, callback: any) => {
		const {getFieldValue} = props.form;
		if (value && value !== getFieldValue('new_password')) {
			callback(<span className={styles.Error}>The two inputs are inconsistent!</span>)
		} else {
			callback()
		}
	};

	return (
		<div className="container">
			<div className={styles.SettingWarp}>
				<Form className={styles.Content}>
					<Form.Item>
						{
							getFieldDecorator('old_password', {
								initialValue: '123456',
								rules: [{
									required: true,
									message: <span className={styles.Error}>Please input your Password!</span>
								}, {
									validator: handleOldPassword
								}],
							})(
								<Input type="password" addonBefore="old password" placeholder="Password"/>
							)
						}
					</Form.Item>
					<Form.Item>
						{
							getFieldDecorator('new_password', {
								initialValue: '123456',
								rules: [{
									required: true,
									message: <span className={styles.Error}>Please input your Password!</span>
								}, {
									validator: handleNewPassword
								}],
							})(
								<Input type="password" addonBefore="new password" placeholder="Password"/>
							)
						}
					</Form.Item>
					<Form.Item>
						{
							getFieldDecorator('confirm_password', {
								initialValue: '123456',
								rules: [{
									required: true,
									message: <span className={styles.Error}>Please input your Password!</span>
								}, {
									validator: handleConfirmPassword
								}],
							})(
								<Input type="password" addonBefore="confirm password" placeholder="Password"/>
							)
						}
					</Form.Item>
					<Form.Item>
						<div className={styles.save}>
							<Button type="primary" onClick={handleSubmit}>Update</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
};

export default Form.create({name: 'login'})(Setting);