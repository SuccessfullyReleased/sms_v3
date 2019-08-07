import {FormComponentProps} from "antd/es/form";

export interface EditDialogProps<T> extends FormComponentProps {
	record: T,
	visible: boolean,
	onSure: (record: T) => void,
	onCancel: () => void
}