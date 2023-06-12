import { type CSSProperties, memo } from "react";
import type { DataGridInternalColumn } from "./DataGrid.types";
import { DataGridRowCell } from "./DataGridRowCell";
import styles from "./DataGrid.module.css";

interface DataGridRowProps<T extends object> {
	row: T;
	columns: DataGridInternalColumn<T>[];
	style: CSSProperties;
}

function DataGridRow<T extends object>(props: DataGridRowProps<T>) {
	const { columns, row, style } = props;
	return (
		<div className={styles.row} style={style}>
			{columns.map((col) => {
				return <DataGridRowCell key={col.field} {...col} row={row} />;
			})}
		</div>
	);
}

const typedMemo: <T>(c: T) => T = memo;

export const MemoizedDataGridRow: <T extends object>(
	props: DataGridRowProps<T>
) => JSX.Element = typedMemo(DataGridRow);
