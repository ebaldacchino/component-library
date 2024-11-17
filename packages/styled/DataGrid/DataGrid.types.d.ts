import type { CSSProperties, Key } from "react";

export type KeyOfType<T, Type> = {
	[K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];

export type RowId<T> = KeyOfType<T, Key>;

type RowIdProps<T> = T extends { id: Key }
	? { rowId?: RowId<T> }
	: { rowId: RowId<T> };

type PinnedPositions = "left" | "right";

type SortDirection = "ASC" | "DESC";

export interface TabbableCell<T extends object> {
	field: keyof T;
	rowId: string | undefined;
}

export type SortModel<T extends object> = {
	field: keyof T;
	direction: SortDirection;
};

export interface DataGridColumn<T extends object, TField = keyof T & string> {
	field: TField;
	label?: string;
	render?: (props: { row: T; field: TField }) => ReactNode;
	width?: number;
	minWidth?: number;
	maxWidth?: number;
	canAutosize?: boolean;
	canResize?: boolean;
	pinnedPosition?: PinnedPositions;
	borderPosition?: PinnedPositions;
	isDefaultHidden?: boolean;
	canHide?: boolean;
	canSort?: boolean;
	defaultSortDirection?: SortDirection;
}

export type ColumnVisibilityModel<T extends object> = {
	[P in keyof T]?: boolean;
};
export type ColumnWidths<T extends object> = { [P in keyof T]?: number };

export type PinnedColumns<T extends object> = {
	left: (keyof T)[];
	right: (keyof T)[];
};

export type DataGridProps<T extends object> = RowIdProps<T> & {
	columns: DataGridColumn<T>[];
	rows: T[];
	paginationSize?: number;
	className?: string;
	style?: CSSProperties;
	columnVisibilityModel?: ColumnVisibilityModel<T>;
	pinnedColumns?: PinnedColumns<T>;
	columnWidths?: ColumnWidths;
	disableColumnReorder?: boolean;
};

export interface DataGridInternalColumn<T extends object>
	extends DataGridColumn<T> {
	width: number;
	borderPosition?: PinnedPositions;
	pinnedPosition?: PinnedPositions;
	left?: number;
	right?: number;
	columnIndex: number;
}

export interface DataGridInternalPinnedColumns<T extends object> {
	left: DataGridInternalColumn<T>[];
	right: DataGridInternalColumn<T>[];
}

export type DataGridHeaderCellProps<T extends object> =
	DataGridInternalColumn<T>;

export type DataGridProviderProps<T extends object> = React.PropsWithChildren<
	Omit<DataGridProps<T>, "rowId">
> & {
	rowId: RowId<T>;
};
