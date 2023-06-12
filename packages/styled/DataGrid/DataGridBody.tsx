import { useMemo, useRef } from "react";
import { MemoizedDataGridRow } from "./DataGridRow";
import { useDataGridContext } from "./useDataGridContext";
import type { IDataGridContext } from "./DataGridContext";
import styles from "./DataGrid.module.css";

function getRows<T extends object>(ctx: IDataGridContext<T>) {
	const { rows, paginationSize, pageNumber } = ctx;
	if (!paginationSize) {
		return rows;
	}
	const firstRowIndex = pageNumber * paginationSize;
	const lastRowIndex = firstRowIndex + paginationSize;
	return rows.slice(firstRowIndex, lastRowIndex);
}

export function DataGridBody<T extends object>() {
	const ctx = useDataGridContext<T>();
	const bodyEl = useRef<HTMLDivElement>(null);

	const { columns, rowId } = ctx;

	const rows = useMemo(() => getRows(ctx), [ctx]);
	const rowStyle = useMemo(() => {
		return { minWidth: ctx.rowWidth };
	}, [ctx.rowWidth]);

	return (
		<div
			ref={bodyEl}
			className={styles.body}
			onScroll={(e) => {
				const gridHeader = e.currentTarget.parentElement?.children[0];
				gridHeader?.scrollTo({ left: e.currentTarget.scrollLeft });
			}}
		>
			{rows.map((row) => {
				const id = row[rowId]?.toString();
				return (
					<MemoizedDataGridRow
						key={id}
						row={row}
						columns={columns}
						style={rowStyle}
					/>
				);
			})}
		</div>
	);
}
