import type React from "react";
import type { DataGridInternalColumn } from "./DataGrid.types";
import { useDataGridContext } from "./useDataGridContext";

function countVisibleRows(e: React.KeyboardEvent<Element>) {
	const gridBody = e.currentTarget.parentElement?.parentElement;

	if (!gridBody) {
		return 0;
	}

	let visibleCount = 0;
	const children = gridBody.children;

	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		const rowRect = child.getBoundingClientRect();
		const bodyRect = gridBody.getBoundingClientRect();

		if (rowRect.bottom > bodyRect.bottom) {
			break;
		}

		if (rowRect.top >= bodyRect.top) {
			visibleCount++;
		}
	}

	return Math.max(0, visibleCount);
}

export function useDataGridKeyboardNavigation<T extends object>(
	props: DataGridInternalColumn<T> & { rowIndex?: number }
) {
	const { rowIndex = 0, columnIndex } = props;
	const { rows, columns, setTabbableCell, ...ctx } = useDataGridContext<T>();

	function updateTabbableCell(rowIndex: number, columnIndex: number) {
		const field = columns[columnIndex].field;
		const rowId = rows[rowIndex - 1]?.[ctx.rowId ?? "id"]?.toString();

		setTabbableCell((prev) => {
			if (prev.field === field && prev.rowId === rowId) {
				return prev;
			}

			return { field, rowId };
		});
	}

	function navigateToCell(
		cell: Element | null,
		newRowIndex: number,
		newColumnIndex: number
	) {
		if (cell instanceof HTMLElement) {
			updateTabbableCell(newRowIndex, newColumnIndex);
			cell.tabIndex = 0;
			cell.focus({ preventScroll: true });
			cell.scrollIntoView({ block: "nearest", inline: "nearest" });
		}
	}

	function handleKeyNavigation(e: React.KeyboardEvent) {
		const newTabbableCell = { columnIndex, rowIndex };

		const maxColumnIndex = columns.length - 1;
		const maxRowIndex = rows.length;

		switch (e.key) {
			case "ArrowUp":
				newTabbableCell.rowIndex = e.ctrlKey
					? 0
					: Math.max(0, newTabbableCell.rowIndex - 1);
				break;
			case "ArrowDown":
				newTabbableCell.rowIndex = e.ctrlKey
					? maxRowIndex
					: Math.min(newTabbableCell.rowIndex + 1, maxRowIndex);
				break;
			case "ArrowLeft":
				newTabbableCell.columnIndex = e.ctrlKey
					? 0
					: Math.max(0, newTabbableCell.columnIndex - 1);
				break;
			case "ArrowRight":
				newTabbableCell.columnIndex = e.ctrlKey
					? maxColumnIndex
					: Math.min(newTabbableCell.columnIndex + 1, maxColumnIndex);
				break;
			case "Home":
				newTabbableCell.columnIndex = 0;
				if (e.ctrlKey) {
					newTabbableCell.rowIndex = 0;
				}
				break;
			case "End":
				newTabbableCell.columnIndex = maxColumnIndex;
				if (e.ctrlKey) {
					newTabbableCell.rowIndex = maxRowIndex;
				}
				break;
			case "PageUp":
				newTabbableCell.rowIndex = Math.max(
					0,
					newTabbableCell.rowIndex - countVisibleRows(e)
				);
				break;
			case "PageDown":
				newTabbableCell.rowIndex = Math.min(
					newTabbableCell.rowIndex + countVisibleRows(e),
					maxRowIndex
				);
				break;
			default:
				return;
		}
		e.preventDefault();
		e.stopPropagation();

		const { rowIndex: r, columnIndex: c } = newTabbableCell;

		const newCell = document.querySelector(
			`[data-rowindex="${r}"] [data-columnindex="${c}"]`
		);
		navigateToCell(newCell, r, c);
	}

	function handleCellClick(e: React.MouseEvent) {
		navigateToCell(e.currentTarget, rowIndex, columnIndex);
	}

	return { handleKeyNavigation, navigateToCell: handleCellClick };
}
