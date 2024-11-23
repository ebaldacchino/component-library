import { Tooltip } from "../Tooltip";
import type { DataGridHeaderCellProps, SortDirection } from "./DataGrid.types";
import { DataGridCell } from "./DataGridCell";
import styles from "./DataGrid.module.css";
import { classNames } from "@bui/utils";
import { useDataGridColumnResizing } from "./useDataGridColumnResizing";
import { useDataGridColumnReordering } from "./useDataGridColumnReordering";
import { Portal } from "@bui/base";
import { useDataGridContext } from "./useDataGridContext";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../Button/IconButton";
import { useDataGridHeaderKeyboardNavigation } from "./useDataGridHeaderKeyboardNavigation";
import React from "react";

function DataGridResizer<T extends object>(props: DataGridHeaderCellProps<T>) {
	const isPinnedRight = props.pinnedPosition === "right";
	const resizerPosition = isPinnedRight ? "left" : "right";

	const { handleResizeStart, handleResizerSingleClick, handleSnapResize } =
		useDataGridColumnResizing(props, resizerPosition);

	const className = classNames(styles.resizer, {
		[styles.left]: isPinnedRight,
		[styles.right]: !isPinnedRight,
	});

	return (
		<div
			className={className}
			onDoubleClick={handleSnapResize}
			onClick={handleResizerSingleClick}
			onPointerDown={handleResizeStart}
		>
			<div />
		</div>
	);
}

function calculateAriaSort(
	direction: SortDirection | false
): React.AriaAttributes["aria-sort"] {
	switch (direction) {
		case "ASC":
			return "ascending";
		case "DESC":
			return "descending";
		default:
			return undefined;
	}
}

function useDataGridSorting<T extends object>(
	field: keyof T & string,
	canSort = true
) {
	const { setSortModel, sortModel } = useDataGridContext<T>();

	if (!canSort) {
		return {};
	}

	const sortDirection = sortModel?.field === field && sortModel.direction;
	const ariaSort = calculateAriaSort(sortDirection);

	function updateSortModel(e: React.MouseEvent | React.KeyboardEvent) {
		e.preventDefault();
		e.stopPropagation();

		setSortModel((prev) => {
			if (prev?.field !== field) {
				return { field, direction: "ASC" };
			}

			if (prev.direction === "ASC") {
				return { field, direction: "DESC" };
			}

			return null;
		});
	}

	return { ariaSort, updateSortModel };
}

function DataGridSortButton<T extends object>(props: {
	field: keyof T & string;
}) {
	const { field } = props;
	const { sortModel } = useDataGridContext<T>();

	const { updateSortModel } = useDataGridSorting(field);

	const isColumnSorted = sortModel?.field === field;
	const isDescending = isColumnSorted && sortModel?.direction === "DESC";

	const className = classNames(styles.sortbutton, {
		[styles.unsorted]: !isColumnSorted,
		[styles.descending]: isDescending,
	});

	return (
		<IconButton
			className={className}
			onClick={updateSortModel}
			aria-label="Sort"
			tabIndex={-1}
		>
			<FontAwesomeIcon icon={faArrowUp} />
		</IconButton>
	);
}

export function DataGridHeaderCell<T extends object>(
	props: DataGridHeaderCellProps<T>
) {
	const ctx = useDataGridContext<T>();
	const { coords, handleReorderStart, isReordering } =
		useDataGridColumnReordering(props);

	const { field, label, canResize, canSort, pinnedPosition } = props;
	const disableResize = canResize === false;
	const disableReorder = !!pinnedPosition;
	const disableSort = canSort === false;

	const className = classNames({
		[styles.pointer]: !disableReorder || !disableSort,
	});
	const { ariaSort, updateSortModel } = useDataGridSorting(
		field,
		!disableSort
	);
	const { handleKeyNavigation, navigateToCell } =
		useDataGridHeaderKeyboardNavigation(props, updateSortModel);

	const isCellTabbable =
		ctx.tabbableCell.field === field &&
		ctx.tabbableCell.rowId === undefined;

	function handleFocus(e: React.FocusEvent) {
		e.preventDefault();
		const header = e.currentTarget.parentElement?.parentElement;
		const grid = header?.parentElement;
		const body = grid?.getElementsByClassName(styles.body)[0];
		if (body && header) {
			body.scrollTo({ left: header.scrollLeft });
		}
	}

	return (
		<>
			<Portal isVisible={isReordering} container={document.body}>
				<DataGridCell
					className={styles.reordering}
					{...props}
					top={coords?.top}
					left={coords?.left}
				>
					<span className={styles.text}>{label ?? field}</span>
				</DataGridCell>
			</Portal>
			<DataGridCell
				className={className}
				{...props}
				onPointerDown={handleReorderStart}
				onKeyDown={isCellTabbable ? handleKeyNavigation : undefined}
				onClick={(e) => {
					updateSortModel?.(e);
					navigateToCell(e);
				}}
				onFocus={handleFocus}
				isCellTabbable={isCellTabbable}
				ariaSort={ariaSort}
				role="columnheader"
			>
				<Tooltip title={label ?? field}>
					<span className={styles.text}>{label ?? field}</span>
				</Tooltip>
				{!disableSort && <DataGridSortButton field={field} />}
				{!disableResize && <DataGridResizer {...props} />}
			</DataGridCell>
		</>
	);
}
