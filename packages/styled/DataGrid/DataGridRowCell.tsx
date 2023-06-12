import type { DataGridInternalColumn } from "./DataGrid.types";
import { DataGridCell } from "./DataGridCell";
import styles from "./DataGrid.module.css";
import { memo } from "react";

interface DataGridRowCellProps<T extends object> extends DataGridInternalColumn<T> {
	row: T;
}

function Inner<T extends object>(props: DataGridRowCellProps<T>) {
	const { field, row } = props;
	if (props.render) {
		return <props.render row={row} field={field} />;
	}

	const value = row[field]?.toString();
	return <span className={styles.text}>{value}</span>;
}

export function DataGridRowCellRaw<T extends object>(
	props: DataGridRowCellProps<T>
) {
	return (
		<DataGridCell {...props}>
			<Inner {...props} />
		</DataGridCell>
	);
}

const typedMemo: <T>(c: T) => T = memo;
export const DataGridRowCell = typedMemo(DataGridRowCellRaw);
