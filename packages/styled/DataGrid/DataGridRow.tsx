import { type CSSProperties, memo } from "react";
import type { DataGridInternalColumn } from "./DataGrid.types";
import { DataGridRowCell } from "./DataGridRowCell";
import styles from "./DataGrid.module.css";

interface DataGridRowProps<T extends object> {
	row: T;
	columns: DataGridInternalColumn<T>[];
	style: CSSProperties;
	rowIndex: number;
	tabbableField: keyof T | undefined;
}

function DataGridRow<T extends object>(props: DataGridRowProps<T>) {
	const { columns, row, style, rowIndex, tabbableField } = props;
	return (
		<div
			className={styles.row}
			style={style}
			role="row"
			data-rowindex={rowIndex}
			aria-rowindex={rowIndex + 1}
		>
			{columns.map((col) => {
				const isCellTabbable = col.field === tabbableField;
				return (
					<DataGridRowCell
						key={col.field}
						{...col}
						row={row}
						rowIndex={rowIndex}
						isCellTabbable={isCellTabbable}
					/>
				);
			})}
		</div>
	);
}

const typedMemo: <T>(c: T) => T = memo;

export const MemoizedDataGridRow: <T extends object>(
	props: DataGridRowProps<T>
) => JSX.Element = typedMemo(DataGridRow);
