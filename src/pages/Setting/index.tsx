import React from 'react';
import styles from "./index.module.css";
import {Button, Card, Form, Input} from "antd";
import {FormComponentProps} from "antd/es/form";
import UserService from "../../services/UserService";

/*
 * @class SettingProps
 * @description 个人中心界面props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/11 0:04
 **/
interface SettingProps extends FormComponentProps {
}

/*
 * @class Setting
 * @description 个人中心界面
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/11 0:04
 **/
const Setting: React.FC<SettingProps> = (props) => {

	const {getFieldDecorator} = props.form;

	const handleSubmit: React.MouseEventHandler<HTMLElement> = (e) => {
		/*
		 * @method handleSubmit
		 * @param e 点击事件事件对象
		 * @description 提交表单
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/11 0:05
		 **/
		e.preventDefault();
		props.form.validateFields((err, values) => {
			UserService.updatePassword(values.new_password);
		});
	};

	const handleOldPassword = (rule: any, value: any, callback: any) => {
		/*
		 * @method handleOldPassword
		 * @param value 值
		 * @description 检查旧密码是否正确
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/11 0:05
		 **/
		try {
			UserService.verify(value).then(() => {
				callback();
			}).catch(err => {
				callback(<span className={styles.Error}>The password is incorrect!</span>);
			});
		} catch (e) {
			console.log(e);
		}
	};

	const handleNewPassword = (rule: any, value: any, callback: any) => {
		/*
		 * @method handleNewPassword
		 * @param value 值
		 * @description 检查新密码是否与旧密码相等
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/11 0:06
		 **/
		try {
			UserService.verify(value).then(() => {
				callback(<span className={styles.Error}>Same as old password!</span>);
			}).catch(() => {
				callback();
			});
		} catch (e) {
			console.log(e);
		}
	};

	const handleConfirmPassword = (rule: any, value: any, callback: any) => {
		/*
		 * @method handleConfirmPassword
		 * @param value 值
		 * @description 检查确认密码与新密码是否相等
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/11 0:07
		 **/
		const {getFieldValue} = props.form;
		if (value && value !== getFieldValue('new_password')) {
			callback(<span className={styles.Error}>The two inputs are inconsistent!</span>)
		} else {
			callback()
		}
	};

	return (
		<div className={styles.SettingWarp}>
			<Card className={styles.Card}>
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
						<div className={styles.Save}>
							<Button type="primary" onClick={handleSubmit}>Update</Button>
						</div>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
};

export default Form.create({name: 'login'})(Setting);