import {FormComponentProps} from "antd/es/form";

/*
 * @class EditDialogProps
 * @description 编辑模态框的props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:38
 **/
export interface EditDialogProps<T> extends FormComponentProps {
	/*
	 * @var 编辑的记录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:38
	 **/
	record: Partial<T>,
	/*
	 * @var 是否显示模态框
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:39
	 **/
	visible: boolean,
	/*
	 * @var 确定编辑完成的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:39
	 **/
	onSure: (record: Partial<T>) => void,
	/*
	 * @var 编辑取消的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:40
	 **/
	onCancel: () => void
}