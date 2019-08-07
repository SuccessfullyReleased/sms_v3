import React from 'react';
import {Empty, Table} from "antd";
import {BaseManageTableProps} from "./index";


function ManageTable<T>(props: BaseManageTableProps<T>) {

	const paginationItemRender: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', originalElement: React.ReactElement<HTMLElement>) => React.ReactNode =
		(page, type, originalElement) => {
			if (type === 'prev') {
				return <span>Previous</span>;
			} else if (type === 'next') {
				return <span>Next</span>;
			}
			return originalElement;
		};

	return (
		<div className="container">
			{
				props.tableData.length === 0 ? <Empty/> :
					<Table dataSource={props.tableData}
								 columns={props.columns}
								 rowKey={'id'}
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