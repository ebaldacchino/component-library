import { classNames } from "@bui/utils";
import type { DataGridInternalColumn } from "./DataGrid.types";
import styles from "./DataGrid.module.css";
import type { CSSProperties, ReactNode } from "react";

interface DataGridCellProps<T extends object>
	extends DataGridInternalColumn<T> {
	children?: ReactNode;
	className?: string;
	onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	transform?: CSSProperties["transform"];
	top?: number;
	isCellTabbable?: boolean;
}

function calculateTabIndex(isCellTabbable: boolean | undefined) {
	if (typeof isCellTabbable !== "boolean") {
		return;
	}

	return isCellTabbable ? 0 : -1;
}

export function DataGridCell<T extends object>(props: DataGridCellProps<T>) {
	const {
		pinnedPosition,
		borderPosition,
		children,
		className,
		onPointerDown,
		onKeyDown,
		onFocus,
		onClick,
		top,
		left,
		right,
		width,
		transform,
		columnIndex,
	} = props;

	const cellClassNames = classNames(styles.cell, className, {
		[styles.pinned]: !!pinnedPosition,
		[styles.leftborder]: borderPosition === "left",
		[styles.rightborder]: borderPosition === "right",
	});

	return (
		<div
			className={cellClassNames}
			style={{ top, left, right, width, transform }}
			onPointerDown={onPointerDown}
			onKeyDown={onKeyDown}
			onClick={onClick}
			tabIndex={calculateTabIndex(props.isCellTabbable)}
			data-columnindex={columnIndex}
			onFocus={onFocus}
		>
			{children}
		</div>
	);
}
