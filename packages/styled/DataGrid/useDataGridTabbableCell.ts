import { useEffect, useState } from "react";
import type {
	ColumnVisibilityModel,
	DataGridInternalColumn,
	RowId,
	TabbableCell,
} from "./DataGrid.types";

export function useDataGridTabbableCell<T extends object>(
	rows: T[],
	columns: DataGridInternalColumn<T>[],
	columnVisibilityModel: ColumnVisibilityModel<T>,
	rowId: RowId<T>
) {
	const [tabbableCell, setTabbableCell] = useState<TabbableCell<T>>({
		field: columns[0].field,
		rowId: undefined,
	});

	useEffect(() => {
		const isTabbableCellHidden =
			columnVisibilityModel[tabbableCell.field] === false;

		const isHeaderFocused = tabbableCell.rowId === undefined;

		const isFocusedRowRemoved =
			!isHeaderFocused &&
			!rows.some(
				(row) => row[rowId ?? "id"]?.toString() === tabbableCell.rowId
			);

		if (isTabbableCellHidden || isFocusedRowRemoved) {
			setTabbableCell({
				field: columns[0].field,
				rowId: undefined,
			});
		}
	}, [
		columnVisibilityModel,
		columns,
		rowId,
		rows,
		tabbableCell.field,
		tabbableCell.rowId,
	]);

	return { tabbableCell, setTabbableCell };
}
