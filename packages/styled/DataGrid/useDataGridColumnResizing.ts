import { useRef } from "react";
import { useDataGridContext } from "./useDataGridContext";
import type {
	DataGridHeaderCellProps,
	DataGridInternalColumn,
} from "./DataGrid.types";
import styles from "./DataGrid.module.css";
import { useHandlePointerDrag } from "./DataGrid.utils";

// To prevent browser issues
const EXCESS_SPACE_ALLOWANCE = 1;

function getLimitedWidth<T extends object>(
	props: DataGridHeaderCellProps<T>,
	newWidth: number
) {
	const { minWidth = 50, maxWidth } = props;
	const minLimitedWidth = Math.max(Math.round(newWidth), minWidth);

	if (!maxWidth) {
		return minLimitedWidth;
	}

	return Math.min(minLimitedWidth, maxWidth);
}

function calculateColumnWidth(
	e: { clientX: number },
	columnCell: HTMLElement | null | undefined,
	resizerPosition: "left" | "right" | undefined
) {
	if (!(columnCell instanceof HTMLElement)) {
		return;
	}

	const rect = columnCell.getBoundingClientRect();

	return resizerPosition === "left"
		? rect.x + rect.width - e.clientX
		: e.clientX - rect.x;
}

function calculateHorizontalPaddingAndBorderWidths(element: Element) {
	const { paddingLeft, paddingRight, borderLeftWidth, borderRightWidth } =
		window.getComputedStyle(element);

	return (
		parseInt(paddingLeft) +
		parseInt(paddingRight) +
		parseInt(borderLeftWidth) +
		parseInt(borderRightWidth)
	);
}

function calculateMinimumCellWidthToAvoidOverflow(
	headerCell: HTMLElement,
	column: { width: number },
	rowCell: Element
) {
	const rowCellChild = rowCell.children[0];
	return (
		column.width +
		rowCellChild.scrollWidth -
		rowCell.clientWidth +
		calculateHorizontalPaddingAndBorderWidths(rowCell)
	);
}

export function useDataGridColumnResizing<T extends object>(
	props: DataGridHeaderCellProps<T>,
	resizerPosition: DataGridInternalColumn<T>["borderPosition"]
) {
	const column = props;
	const ctx = useDataGridContext<T>();
	const resizerEl = useRef<HTMLElement | null>(null);

	function updateColumnWidth(newWidthInPixels: number) {
		if (newWidthInPixels === column.width) {
			return;
		}

		ctx.setColumnWidths((prev) => ({
			...prev,
			[column.field]: newWidthInPixels,
		}));
	}

	function handleResizing(e: PointerEvent) {
		const newWidth = calculateColumnWidth(
			e,
			resizerEl.current?.parentElement,
			resizerPosition
		);

		if (typeof newWidth === "number") {
			updateColumnWidth(getLimitedWidth(props, newWidth));
		}
	}

	function handlePointerMove(e: PointerEvent) {
		e.preventDefault();
		handleResizing(e);
	}

	const { onPointerDown } = useHandlePointerDrag({
		onMove: handlePointerMove,
		onStart: function (e) {
			resizerEl.current = e.currentTarget;
		},
	});

	function handleSnapResize(event: React.MouseEvent<HTMLDivElement>) {
		event.preventDefault();
		event.stopPropagation();
		const headerCell = event.currentTarget.parentElement;
		const headerInnerContainer = headerCell?.parentElement;
		const dataGridContainer =
			headerInnerContainer?.parentElement?.parentElement;
		const lastHeaderCellChild =
			headerCell?.children[headerCell?.children.length - 2];

		if (!headerCell || !dataGridContainer || !lastHeaderCellChild) {
			return;
		}

		let newColumnWidth = column.width;

		const labelEl = headerCell.children[0];

		if (labelEl instanceof Element) {
			const labelHasOverflow = labelEl.scrollWidth > labelEl.clientWidth;

			if (labelHasOverflow) {
				newColumnWidth =
					column.width +
					labelEl.scrollWidth -
					labelEl.clientWidth +
					EXCESS_SPACE_ALLOWANCE;
			} else {
				const childBounds = lastHeaderCellChild.getBoundingClientRect();
				const childRightEdge = childBounds.x + childBounds.width;
				const headerCellRightEdge =
					column.width + headerCell.getBoundingClientRect().x;

				const { paddingRight, borderRightWidth } =
					window.getComputedStyle(headerCell);

				const excessSpace =
					headerCellRightEdge -
					childRightEdge -
					parseFloat(paddingRight) -
					parseFloat(borderRightWidth);

				if (excessSpace > EXCESS_SPACE_ALLOWANCE) {
					newColumnWidth -= Math.floor(excessSpace);
				}
			}
		}

		const headerCells = Array.from(headerInnerContainer.children);

		const rows = Array.from(
			dataGridContainer.querySelectorAll(`.${styles.body} .${styles.row}`)
		);

		const columnIndex = headerCells.findIndex(
			(cell) => cell === headerCell
		);

		newColumnWidth = rows.reduce((width, row) => {
			const rowCell = row.children[columnIndex];
			const idealRowCellWidth = calculateMinimumCellWidthToAvoidOverflow(
				headerCell,
				column,
				rowCell
			);
			return Math.max(idealRowCellWidth, width);
		}, newColumnWidth);

		if (newColumnWidth !== column.width) {
			updateColumnWidth(getLimitedWidth(props, newColumnWidth));
		}
	}

	function handleResizerSingleClick(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	return {
		handleResizeStart: onPointerDown,
		handleResizerSingleClick,
		handleSnapResize: column.canAutosize !== false ? handleSnapResize : undefined,
	};
}
