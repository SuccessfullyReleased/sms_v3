import React from 'react';
import {Modal} from 'antd';
import {DeleteDialogProps} from "./index";

export interface DeleteDialogProps<T> {
	record: T | T[],
	visible: boolean,
	onSure: (record: T | T[]) => void,
	onCancel: () => void
}

function DeleteDialog<T>(props: DeleteDialogProps<T>) {
	return (
		<Modal
			okType="danger"
			title="Delete"
			visible={props.visible}
			width={400}
			onCancel={() => {
				props.onCancel()
			}}
			onOk={() => {
				props.onSure(props.record)
			}}
		>
			<div style={{
				fontSize: '16px',
				textAlign: 'center'
			}}>Delete is not recoverable, are you sure？
			</div>
		</Modal>
	)
}

export default DeleteDialog;