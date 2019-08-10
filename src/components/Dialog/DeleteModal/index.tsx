import React from 'react';
import {DeleteDialogProps} from "./index";
import {Dialog} from "../index";

/*
 * @class DeleteDialogProps
 * @description 删除模态框props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:34
 **/
export interface DeleteDialogProps<T> {
	/*
	 * @var 删除的记录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:35
	 **/
	record: T,
	/*
	 * @var 是否显示该模态框
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:35
	 **/
	visible: boolean,
	/*
	 * @var 确定删除触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:37
	 **/
	onSure: (record: T) => void,
	/*
	 * @var 确定取消触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:37
	 **/
	onCancel: () => void
}

/*
 * @class DeleteDialog
 * @description 删除模态框
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:35
 **/
export function DeleteDialog<T>(props: DeleteDialogProps<T>) {
	return (
		<Dialog<T> type={'danger'}
							 title={'Delete'}
							 content={'Delete is not recoverable, are you sure？'}
							 visible={props.visible} record={props.record}
							 width={400}
							 onSure={props.onSure as (record: T) => void}
							 onCancel={props.onCancel}/>
	)
}
