import {ColumnProps} from "antd/lib/table";

export interface ManagePaginationProps {
	current: number,
	pageSize: number,
	total: number,
	onChange: (page: number, pageSize?: number | undefined) => void,
	onShowSizeChange: (current: number, size: number) => void
}

export interface BaseManageTableProps<T> {
	columns: ColumnProps<T>[];
	tableData: Array<T>,
	pagination: ManagePaginationProps,
	onSelectionChange: (selectedRowKeys: number[], selectedRows: T[]) => void
}

export interface ManageTableProps<T> {
	tableData: Array<T>,
	pagination: ManagePaginationProps
	onUpdate: (record: T) => void,
	onDelete: (record: T) => void,
	onSelectionChange: (selectedRowKeys: number[], selectedRows: T[]) => void
}