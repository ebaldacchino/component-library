import { memo } from "react";
import styles from "./DataGrid.module.css";
import type { IDataGridColumn, RowId } from "./DataGrid.types";
import { DATAGRID_DEFAULT_COLUMN_WIDTH } from "./DataGrid.constants";

interface DataGridRowProps<T extends object> {
	row: T;
	columns: IDataGridColumn<T>[];
	rowId: RowId<T>;
}

function DataGridRow<T extends object>(props: DataGridRowProps<T>) {
	const { columns, row, rowId } = props;
	return (
		<div className={styles.row}>
			{columns.map((col) => {
				const id = col.field + row[rowId];
				if (col.render) {
					return (
						<div
							key={id}
							className={styles.cell}
							style={{
								width:
									col.width ?? DATAGRID_DEFAULT_COLUMN_WIDTH,
							}}
						>
							<col.render row={row} field={col.field} />
						</div>
					);
				}

				const value = row[col.field]?.toString();

				return (
					<div
						key={id}
						className={styles.cell}
						style={{
							width: col.width ?? DATAGRID_DEFAULT_COLUMN_WIDTH,
						}}
					>
						<div>
							<span>{value}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}

const typedMemo: <T>(c: T) => T = memo;

export const MemoizedDataGridRow: <T extends object>(
	props: DataGridRowProps<T>
) => JSX.Element = typedMemo(DataGridRow);
