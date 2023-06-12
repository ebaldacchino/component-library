import {
	createContext,
	type Dispatch,
	type Key,
	type SetStateAction,
} from "react";
import type {
	ColumnVisibilityModel,
	ColumnWidths,
	DataGridInternalColumn,
	DataGridInternalPinnedColumns,
	DataGridProps,
	RowId,
	SortModel,
} from "./DataGrid.types";

export type IDataGridContext<T extends object> = Omit<
	DataGridProps<T>,
	"rowId" | "columns" | "columnVisibilityModel"
> & {
	pageNumber: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
	rowId: RowId<T>;
	columns: DataGridInternalColumn<T>[];
	pinnedColumns: DataGridInternalPinnedColumns<T>;
	setColumnWidths: Dispatch<SetStateAction<ColumnWidths<T>>>;
	columnOrder: (keyof T)[];
	setColumnOrder: Dispatch<SetStateAction<(keyof T)[]>>;
	rowWidth: number;
	setColumnVisibilityModel: Dispatch<
		SetStateAction<ColumnVisibilityModel<T>>
	>;
	columnVisibilityModel: ColumnVisibilityModel<T>;
	sortModel: SortModel<T> | null;
	setSortModel: Dispatch<SetStateAction<SortModel<T> | null>>;
};

export const DataGridContext = createContext<IDataGridContext<{ id: Key }>>({
	columns: [],
	rows: [],
	paginationSize: 0,
	pageNumber: 0,
	setPageNumber: () => {
		/**/
	},
	rowId: "id",
	pinnedColumns: { left: [], right: [] },
	columnWidths: {},
	setColumnWidths: () => {
		/**/
	},
	columnOrder: [],
	setColumnOrder: () => {
		/**/
	},
	rowWidth: 0,
	setColumnVisibilityModel: () => {
		/**/
	},
	columnVisibilityModel: {},
	sortModel: null,
	setSortModel: () => {
		/**/
	},
});
