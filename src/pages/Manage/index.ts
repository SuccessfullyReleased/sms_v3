import {ManagePaginationProps} from "../../components/Table";


export interface ManageState<T> {
	tableData: Array<T>,
	pagination: Omit<Omit<ManagePaginationProps, 'onChange'>, 'onShowSizeChange'>,
	search: Partial<T>,
	insertRecord: Partial<T>,
	insertStatus: boolean,
	batchDeleteRecords: Array<number>,
	batchDeleteStatus: boolean
}