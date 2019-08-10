import React from 'react';
import {Modal} from 'antd';
import {ButtonType} from "antd/es/button";

/*
 * @class DialogProps
 * @description 基本模态框props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:45
 **/
export interface DialogProps<T> {
	type: ButtonType,
	title: string | React.ReactNode,
	content: string | React.ReactNode,
	visible: boolean,
	width: number,

	record: T,
	onSure: (record: T) => void,
	onCancel: () => void
}
/*
 * @class Dialog
 * @description 基本模态框封装
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:45
 **/
export function Dialog<T>(props: DialogProps<T>) {
	return (
		<Modal
			okType={props.type}
			title={props.title}
			visible={props.visible}
			width={props.width}
			onCancel={() => {
				props.onCancel()
			}}
			onOk={() => {
				props.onSure(props.record as T)
			}}
		>
			<div style={{
				fontSize: '16px',
				textAlign: 'center'
			}}>
				{props.content}
			</div>
		</Modal>
	)
}
