export type KeyOfType<T, Type> = {
	[K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];

export type RowId<T> = KeyOfType<T, Key>;

type RowIdProps<T> = T extends { id: Key }
	? { rowId?: RowId<T> }
	: { rowId: RowId<T> };

export interface IDataGridColumn<T extends object, TField = keyof T & string> {
	field: TField;
	label?: string;
	render?: (props: { row: T; field: TField }) => ReactNode;
	width?: number;
}

export type DataGridProps<T extends object> = RowIdProps<T> & {
	columns: IDataGridColumn<T>[];
	rows: T[];
	paginationSize?: number;
};
