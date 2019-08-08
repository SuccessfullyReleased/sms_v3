import {FormComponentProps} from "antd/es/form";

export interface EditDialogProps<T> extends FormComponentProps {
	record: Partial<T>,
	visible: boolean,
	onSure: (record: Partial<T>) => void,
	onCancel: () => void
}