/*
	sorting - add functionality
	column visibility - add onChange handler
	column order - add onChange handler
	column resizing - add onChange handler
	pinned columns - add onChange handler
*/

import { useMemo, useState } from "react";
import type {
	ColumnVisibilityModel,
	ColumnWidths,
	DataGridColumn,
	DataGridInternalColumn,
	DataGridInternalPinnedColumns,
	DataGridProviderProps,
	PinnedColumns,
} from "./DataGrid.types";

function assignBorderPositionToColumn<T extends object>(
	column: DataGridInternalColumn<T>,
	borderPosition: "left" | "right"
) {
	if (column) {
		column.borderPosition = borderPosition;
	}
}

const DATAGRID_DEFAULT_COLUMN_WIDTH = 150;

function updateColumnPosition<T extends object>(
	position: "left" | "right",
	columns: DataGridInternalColumn<T>[],
	coords: { left: number; right: number }
) {
	for (let index = 0; index < columns.length; index++) {
		const column = columns[index];
		column[position] = coords[position];
		columns[index] = column;
		coords[position] += column.width;
	}
}

function getPinnedPosition<T extends object>(
	column: DataGridColumn<T>,
	pinnedColumns: PinnedColumns<T> | undefined
) {
	if (!pinnedColumns) {
		return column.pinnedPosition;
	}

	if (pinnedColumns.left?.includes(column.field)) {
		return "left";
	}

	if (pinnedColumns.right?.includes(column.field)) {
		return "right";
	}
}

function isColumnHidden<T extends object>(
	column: DataGridColumn<T>,
	columnVisibilityModel?: ColumnVisibilityModel<T>
) {
	if (!columnVisibilityModel) {
		return column.isDefaultHidden;
	}

	return columnVisibilityModel[column.field] === false;
}

function removeHiddenColumns<T extends object>(
	columns: DataGridColumn<T>[],
	columnVisibilityModel?: ColumnVisibilityModel<T>
) {
	return columns.filter((c) => !isColumnHidden(c, columnVisibilityModel));
}

function getColumnWidth<T extends object>(
	column: DataGridColumn<T>,
	columnWidths?: ColumnWidths<T>
) {
	return (
		columnWidths?.[column.field] ??
		column.width ??
		DATAGRID_DEFAULT_COLUMN_WIDTH
	);
}

function orderColumns<T extends object>(
	columns: DataGridColumn<T>[],
	columnOrder: (keyof T)[]
) {
	if (!columnOrder.length) {
		return columns;
	}

	return [...columns].sort(
		(a, b) => columnOrder.indexOf(a.field) - columnOrder.indexOf(b.field)
	);
}

function processColumns<T extends object>(
	columns: DataGridColumn<T>[],
	columnVisibilityModel: ColumnVisibilityModel<T> | undefined,
	pinnedColumns: PinnedColumns<T> | undefined,
	columnWidths: ColumnWidths<T>,
	columnOrder: (keyof T)[]
) {
	const orderedColumns = orderColumns(columns, columnOrder);

	const visibleColumns = removeHiddenColumns(
		orderedColumns,
		columnVisibilityModel
	);

	const internalColumns = visibleColumns.map((column) => ({
		...column,
		width: getColumnWidth(column, columnWidths),
	}));

	const unpinned: DataGridInternalColumn<T>[] = [];
	const pinned: DataGridInternalPinnedColumns<T> = { left: [], right: [] };

	for (const internalColumn of internalColumns) {
		const pinnedPosition = getPinnedPosition(internalColumn, pinnedColumns);
		internalColumn.pinnedPosition = pinnedPosition;

		const collection = !pinnedPosition ? unpinned : pinned[pinnedPosition];
		collection.push(internalColumn);
	}

	const coords = { left: 0, right: 0 };

	const indexOf = (
		c: DataGridInternalColumn<T>,
		position: "left" | "right"
	) => pinnedColumns![position].indexOf(c.field);

	if (pinned.left.length) {
		if (pinnedColumns?.left.length) {
			pinned.left.sort((a, b) => {
				return indexOf(a, "left") - indexOf(b, "left");
			});
		}
		updateColumnPosition("left", pinned.left, coords);
		const innerLeftColumn = pinned.left[pinned.left.length - 1];
		assignBorderPositionToColumn(innerLeftColumn, "right");
	}

	updateColumnPosition("left", unpinned, coords);

	if (pinned.right.length) {
		const lastUnpinnedColumn = unpinned.at(-1);

		if (lastUnpinnedColumn) {
			lastUnpinnedColumn.canResize = false;
		}

		if (pinnedColumns?.right.length) {
			pinned.right.sort(
				(a, b) => indexOf(a, "right") - indexOf(b, "right")
			);
		}

		updateColumnPosition("right", pinned.right.reverse(), coords);
		pinned.right.reverse();

		const innerRightColumn = pinned.right[0];
		assignBorderPositionToColumn(innerRightColumn, "left");
	}

	// Just a temporary hack to not manipulate the order of the unpinned DOM elements. We need to not reorder the DOM elements to support the reordering animation
	unpinned.sort(
		(a, b) =>
			columns.findIndex((c) => c.field === a.field) -
			columns.findIndex((c) => c.field === b.field)
	);

	const result = { ...pinned, unpinned };
	return result;
}

export function useDataGridColumns<T extends object>(
	props: DataGridProviderProps<T>
) {
	const { columns, columnVisibilityModel, pinnedColumns } = props;
	const [columnWidths, setColumnWidths] = useState<ColumnWidths<T>>(
		props.columnWidths ?? {}
	);
	const [columnOrder, setColumnOrder] = useState<(keyof T)[]>([]);

	const [internalColumnVisibilityModel, setInternalColumnVisibilityModel] =
		useState(() => {
			return (
				columnVisibilityModel ??
				props.columns.reduce((model, column) => {
					const { isDefaultHidden } = column;
					const canHide = column.canHide !== false;

					if (canHide) {
						model[column.field] = !isDefaultHidden;
					}
					return model;
				}, {} as { [P in keyof T]?: boolean })
			);
		});

	const { left, right, unpinned } = useMemo(
		() =>
			processColumns(
				columns,
				internalColumnVisibilityModel,
				pinnedColumns,
				columnWidths,
				columnOrder
			),
		[
			columns,
			internalColumnVisibilityModel,
			pinnedColumns,
			columnWidths,
			columnOrder,
		]
	);
	const internalColumns = useMemo(
		() => left.concat(unpinned).concat(right),
		[left, right, unpinned]
	);
	const internalPinnedColumns = useMemo(
		() => ({ left, right }),
		[left, right]
	);

	return {
		columnWidths,
		setColumnWidths,
		columns: internalColumns,
		pinnedColumns: internalPinnedColumns,
		columnOrder,
		setColumnOrder,
		columnVisibilityModel: internalColumnVisibilityModel,
		setInternalColumnVisibilityModel,
	};
}
