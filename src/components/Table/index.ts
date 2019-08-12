import {ColumnProps} from "antd/lib/table";

/*
 * @class ManagePaginationProps
 * @description 表格的分页参数props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:30
 **/
export interface ManagePaginationProps {
	current: number,
	pageSize: number,
	total: number,
	onChange: (page: number, pageSize?: number | undefined) => void,
	onShowSizeChange: (current: number, size: number) => void
}

/*
 * @class BaseManageTableProps
 * @description 基础表格props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:30
 **/
export interface BaseManageTableProps<T> {
	columns: ColumnProps<T>[];
	tableData: Array<T>,
	pagination: ManagePaginationProps,
	rowKey?: (record: T, index: number) => string
	showRowSelection?: boolean,
	onSelectionChange: (selectedRowKeys: number[], selectedRows: T[]) => void
}

/*
 * @class ManageTableProps
 * @description 管理表格的props
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:36
 **/
export interface ManageTableProps<T> {
	tableData: Array<T>,
	pagination: ManagePaginationProps
	onUpdate: (record: Partial<T>) => void,
	onDelete: (record: Partial<T>) => void,
	onSelectionChange: (selectedRowKeys: number[], selectedRows: T[]) => void
}