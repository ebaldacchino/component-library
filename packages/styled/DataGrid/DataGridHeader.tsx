import { classNames } from "@bui/utils";
import { useDataGridContext } from "./useDataGridContext";
import styles from "./DataGrid.module.css";
import { DataGridHeaderCell } from "./DataGridHeaderCell";
import { useMemo } from "react";

export function DataGridHeader<T extends object>() {
	const ctx = useDataGridContext<T>();
	const rightPinnedColumnsCount = ctx.pinnedColumns.right.length;
	const hasRightPinnedColumns = !!rightPinnedColumnsCount;
	const headerClassNames = classNames(styles.header, {
		[styles.gutter]: hasRightPinnedColumns,
	});
	const style = useMemo(() => {
		return { minWidth: ctx.rowWidth };
	}, [ctx.rowWidth]);

	return (
		<div className={headerClassNames}>
			<div className={styles.row} style={style}>
				{ctx.columns.map((column) => (
					<DataGridHeaderCell key={column.field} {...column} />
				))}
				{!hasRightPinnedColumns && (
					<div role="presentation" className={styles.filler} />
				)}
			</div>
		</div>
	);
}
