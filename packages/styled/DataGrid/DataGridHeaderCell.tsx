import { Tooltip } from "../Tooltip";
import type { DataGridHeaderCellProps } from "./DataGrid.types";
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

function useDataGridSorting<T extends object>(
	field: keyof T & string,
	canSort = true
) {
	const { setSortModel } = useDataGridContext<T>();

	if (!canSort) {
		return undefined;
	}

	return function (e: React.MouseEvent) {
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
	};
}

function DataGridSortButton<T extends object>(props: {
	field: keyof T & string;
}) {
	const { field } = props;
	const { sortModel } = useDataGridContext<T>();

	const handleUpdateSortModel = useDataGridSorting(field);

	const isColumnSorted = sortModel?.field === field;
	const isDescending = isColumnSorted && sortModel?.direction === "DESC";

	const className = classNames(styles.sortbutton, {
		[styles.unsorted]: !isColumnSorted,
		[styles.descending]: isDescending,
	});

	return (
		<IconButton
			className={className}
			onClick={handleUpdateSortModel}
			aria-label="Sort"
		>
			<FontAwesomeIcon icon={faArrowUp} />
		</IconButton>
	);
}

export function DataGridHeaderCell<T extends object>(
	props: DataGridHeaderCellProps<T>
) {
	const { coords, handleReorderStart, isReordering } =
		useDataGridColumnReordering(props);

	const { field, label, canResize, canSort, pinnedPosition } = props;
	const disableResize = canResize === false;
	const disableReorder = !!pinnedPosition;
	const disableSort = canSort === false;

	const className = classNames({
		[styles.pointer]: !disableReorder || !disableSort,
	});
	const updateSortModel = useDataGridSorting(field, !disableSort);

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
				onClick={updateSortModel}
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