import {FormComponentProps} from "antd/es/form";

/*
 * @class ManageSearchProps
 * @description 管理界面的搜索组件的props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 22:52
 **/
export interface ManageSearchProps<T> extends FormComponentProps {
	/*
	 * @var 点击搜索按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:52
	 **/
	onSearch: (search: Partial<T>) => void
	/*
	 * @var 点击添加按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:53
	 **/
	onInsert: () => void
	/*
	 * @var 点击批量删除按钮触发的回调
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 22:53
	 **/
	onBatchDelete: () => void
}