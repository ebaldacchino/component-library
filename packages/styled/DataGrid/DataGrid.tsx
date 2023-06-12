import styles from "./DataGrid.module.css";
import { MemoizedDataGridRow } from "./DataGridRow";
import { DataGridHeader } from "./DataGridHeader";
import { DataGridFooter } from "./DataGridFooter";
import type { DataGridProps, RowId } from "./DataGrid.types";
import { DataGridProvider, type IDataGridContext } from "./DataGridContext";
import { useDataGridContext } from "./useDataGridContext";

function getRows<T extends object>(ctx: IDataGridContext<T>) {
	const { rows, paginationSize, pageNumber } = ctx;
	if (!paginationSize) {
		return rows;
	}
	const firstRowIndex = pageNumber * paginationSize;
	const lastRowIndex = firstRowIndex + paginationSize;
	return rows.slice(firstRowIndex, lastRowIndex);
}

function DataGridBody<T extends object>() {
	const ctx = useDataGridContext<T>();

	const { columns, rowId } = ctx;

	const rows = getRows(ctx);

	return (
		<div
			className={styles.body}
			onScroll={(e) => {
				const gridHeader = e.currentTarget.parentElement?.children[0];

				if (gridHeader) {
					gridHeader.scrollTo({ left: e.currentTarget.scrollLeft });
				}
			}}
		>
			{rows.map((row, index) => {
				return (
					<MemoizedDataGridRow
						key={index}
						row={row}
						columns={columns}
						rowId={rowId}
					/>
				);
			})}
		</div>
	);
}

export function DataGrid<T extends object>(props: DataGridProps<T>) {
	const { rowId, ...providerProps } = props;
	const typedRowId = (rowId ?? "id") as RowId<T>;
	return (
		<div className={styles.grid}>
			<DataGridProvider {...providerProps} rowId={typedRowId}>
				<DataGridHeader />
				<DataGridBody />
				<DataGridFooter />
			</DataGridProvider>
		</div>
	);
}
