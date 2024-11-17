import { useMemo, useRef, useState } from "react";
import type {
	DataGridHeaderCellProps,
	DataGridInternalColumn,
} from "./DataGrid.types";
import { useDataGridContext } from "./useDataGridContext";
import { useHandlePointerDrag } from "./DataGrid.utils";

function calculateColumnsWidth(
	columns: { width: number }[],
	start: number,
	end: number
) {
	return columns
		.slice(start, end)
		.reduce((totalWidth, column) => totalWidth + column.width, 0);
}

function getNewColumnOrder<T extends object>(
	column: DataGridInternalColumn<T>,
	startColumns: DataGridInternalColumn<T>[],
	newIndex: number
) {
	const otherColumns = startColumns.filter((c) => c.field !== column.field);

	const precedingColumns = otherColumns.slice(0, newIndex);
	const succeedingColumns = otherColumns.slice(newIndex);

	const newColumns = precedingColumns
		.concat(column)
		.concat(succeedingColumns);

	return newColumns.map((column) => column.field);
}

type Coords = { left: number; top: number };

function getColumnSortValue<T extends object>(
	column: DataGridInternalColumn<T>
) {
	const { left = Number.POSITIVE_INFINITY, right = 0 } = column;
	return Number(left) - Number(right);
}

export function useDataGridColumnReordering<T extends object>(
	props: DataGridHeaderCellProps<T>
) {
	const { columns, ...ctx } = useDataGridContext<T>();
	const column = props;
	const [coords, setCoords] = useState<Coords | undefined>();
	const coordsMovement = useRef<Coords>({ top: 0, left: 0 });
	const [hasStartedMoving, setHasStartedMoving] = useState(false);
	const canReorder =
		ctx.disableColumnReorder !== false && !column.pinnedPosition;
	const orderedColumns = useMemo(() => {
		return [...columns].sort((a, b) => {
			return getColumnSortValue(a) - getColumnSortValue(b);
		});
	}, [columns]);
	const [startColumns, setStartColumns] = useState(orderedColumns);
	const cellEl = useRef<HTMLElement | null>(null);

	function handlePointerEnd() {
		setCoords(undefined);
		setHasStartedMoving(false);
	}

	function handleReordering(e: PointerEvent) {
		const cell = cellEl.current;
		const header = cell?.parentElement;

		if (!cell || !header) {
			return;
		}

		const headerX = header.getBoundingClientRect().x;

		const pinnedLeftColumnsCount = ctx.pinnedColumns.left.length;
		const pinnedRightColumnsCount = ctx.pinnedColumns.right.length;
		const lastReorderableIndex =
			startColumns.length - pinnedRightColumnsCount;
		let newPosition = calculateColumnsWidth(
			orderedColumns,
			0,
			pinnedLeftColumnsCount
		);
		let newIndex = column.columnIndex;
		const distanceFromHeaderX = e.clientX - headerX;

		for (let i = pinnedLeftColumnsCount; i < lastReorderableIndex; i++) {
			const c = startColumns[i];
			if (newPosition > distanceFromHeaderX) {
				break;
			}
			newIndex = i;
			newPosition += c.width;
		}

		const { left, top } = coordsMovement.current;
		setCoords({ left: e.clientX - left, top: e.clientY - top });

		if (newIndex !== column.columnIndex) {
			ctx.setColumnOrder(
				getNewColumnOrder(column, startColumns, newIndex)
			);
		}
	}

	function handlePointerMove(e: PointerEvent) {
		e.preventDefault();
		e.stopPropagation();
		handleReordering(e);
		setHasStartedMoving(true);
	}

	function handleReorderStart(e: React.PointerEvent<HTMLDivElement>) {
		cellEl.current ??= e.currentTarget;

		const { x, y } = e.currentTarget.getBoundingClientRect();
		coordsMovement.current = {
			left: e.clientX - x,
			top: e.clientY - y,
		};

		setCoords({ left: x, top: y });
		setStartColumns(orderedColumns);
	}

	const { onPointerDown } = useHandlePointerDrag({
		onEnd: handlePointerEnd,
		onMove: handlePointerMove,
		onStart: handleReorderStart,
	});

	if (!canReorder) {
		return {
			canReorder,
			isReordering: false,
		};
	}

	return {
		isReordering: hasStartedMoving,
		coords,
		handleReorderStart: onPointerDown,
	};
}
