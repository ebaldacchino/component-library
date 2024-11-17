import type React from "react";
import type { DataGridInternalColumn } from "./DataGrid.types";
import { useDataGridKeyboardNavigation } from "./useDataGridKeyboardNavigation";

export function useDataGridHeaderKeyboardNavigation<T extends object>(
	props: DataGridInternalColumn<T>,
	updateSortModel: ((e: React.KeyboardEvent) => void) | undefined
) {
	const { handleKeyNavigation, navigateToCell } = useDataGridKeyboardNavigation<T>(props);

	function handleHeaderKeyNavigation(e: React.KeyboardEvent) {
		switch (e.key) {
			case "Enter":
				updateSortModel?.(e);
				return;
			default:
				handleKeyNavigation(e);
				return;
		}
	}

	return { handleKeyNavigation: handleHeaderKeyNavigation, navigateToCell };
}
