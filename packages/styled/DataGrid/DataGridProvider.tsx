import { type Context, useMemo, useState } from "react";
import { DataGridContext, type IDataGridContext } from "./DataGridContext";
import type { DataGridProviderProps } from "./DataGrid.types";
import { useDataGridColumns } from "./useDataGridColumns";
import { useDataGridSortModel } from "./useDataGridSortModel";
import { useDataGridRows } from "./useDataGridRows";

export function DataGridProvider<T extends object>(
	props: DataGridProviderProps<T>
) {
	const { children, ...providerProps } = props;

	const [pageNumber, setPageNumber] = useState(0);
	const {
		columnWidths,
		columns,
		pinnedColumns,
		setColumnWidths,
		columnOrder,
		setColumnOrder,
		columnVisibilityModel,
		setInternalColumnVisibilityModel,
	} = useDataGridColumns(props);

	const { sortModel, setSortModel } = useDataGridSortModel(columns);
	const rows = useDataGridRows(props.rows, sortModel);

	const rowWidth = useMemo(() => {
		{
			return columns.reduce(
				(total, column) => total + Number(column.width),
				0
			);
		}
	}, [columns]);

	const value = {
		...providerProps,
		pageNumber,
		setPageNumber,
		columns,
		pinnedColumns,
		columnWidths,
		setColumnWidths,
		columnOrder,
		setColumnOrder,
		rowWidth,
		columnVisibilityModel,
		setColumnVisibilityModel: setInternalColumnVisibilityModel,
		sortModel,
		setSortModel,
		rows,
	} as IDataGridContext<T>;

	const ctx = DataGridContext as unknown as Context<typeof value>;
	return <ctx.Provider value={value}>{children}</ctx.Provider>;
}
