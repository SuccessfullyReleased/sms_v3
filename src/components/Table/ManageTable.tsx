import React from 'react';
import {Empty, Table} from "antd";
import {BaseManageTableProps} from "./index";
import {TableRowSelection} from "antd/lib/table";

export const paginationItemRender: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', originalElement: React.ReactElement<HTMLElement>) => React.ReactNode =
	(page, type, originalElement) => {
		/*
		 * @method paginationItemRender
		 * @description 分页美化
		 * @author 戴俊明 <idaijunming@163.com>
		 * @date 2019/8/10 23:37
		 **/
		if (type === 'prev') {
			return <span>Previous</span>;
		} else if (type === 'next') {
			return <span>Next</span>;
		}
		return originalElement;
	};

/*
 * @class ManageTable
 * @description 管理表格
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:37
 **/
function ManageTable<T>(props: BaseManageTableProps<T>) {

	const rowSelection: TableRowSelection<T> = {
		onChange: (selectedRowKeys: string[] | number[], selectedRows: T[]) => {
			props.onSelectionChange(selectedRowKeys as number[], selectedRows);
		}
	};

	return (
		<div className="container">
			{
				props.tableData.length === 0 ? <Empty/> :
					<Table dataSource={props.tableData}
								 columns={props.columns}
								 rowKey={'id'}
								 rowSelection={props.showRowSelection === false ? undefined : rowSelection}
								 pagination={{
									 ...props.pagination,
									 defaultCurrent: 1,
									 defaultPageSize: 10,
									 pageSizeOptions: ['5', '10', '20', '50'],
									 showQuickJumper: true,
									 showSizeChanger: true,
									 itemRender: paginationItemRender
								 }}/>
			}
		</div>
	);
}

export default ManageTable;