export interface DeleteDialogProps<T> {
	record: T,
	visible: boolean,
	onSure: (record: T) => void,
	onCancel: () => void
}