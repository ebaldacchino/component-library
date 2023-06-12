import { useState } from "react";
import type { SortModel, DataGridInternalColumn } from "./DataGrid.types";

function generateSortModel<T extends object>(
	columns: DataGridInternalColumn<T>[]
) {
	const column = columns.find((column) => !!column.defaultSortDirection);

	if (typeof column?.defaultSortDirection !== "string") {
		return null;
	}

	return { field: column.field, direction: column.defaultSortDirection };
}

export function useDataGridSortModel<T extends object>(
	columns: DataGridInternalColumn<T>[]
) {
	const [sortModel, setSortModel] = useState<SortModel<T> | null>(() =>
		generateSortModel(columns)
	);

	return { sortModel, setSortModel };
}
