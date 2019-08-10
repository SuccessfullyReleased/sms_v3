import {ManagePaginationProps} from "../../components/Table";

/*
 * @class ManageState
 * @description 管理界面props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:43
 **/
export interface ManageState<T> {
	/*
	 * @var 表格数据源
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:43
	 **/
	tableData: Array<T>,
	/*
	 * @var 分页参数，onChange,onShowSizeChange由组件自定义实现
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:43
	 **/
	pagination: Omit<Omit<ManagePaginationProps, 'onChange'>, 'onShowSizeChange'>,
	/*
	 * @var 搜索结果
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:44
	 **/
	search: Partial<T>,
	/*
	 * @var 添加的记录
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:44
	 **/
	insertRecord: Partial<T>,
	/*
	 * @var 添加模态框状态
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:45
	 **/
	insertStatus: boolean,
	/*
	 * @var 批量删除记录的id
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:45
	 **/
	batchDeleteRecords: Array<number>,
	/*
	 * @var 批量删除模态框状态
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:45
	 **/
	batchDeleteStatus: boolean
}