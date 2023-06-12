import styles from "./DataGrid.module.css";
import { Tooltip } from "../Tooltip";
import { useDataGridContext } from "./useDataGridContext";
import { DATAGRID_DEFAULT_COLUMN_WIDTH } from "./DataGrid.constants";

export function DataGridHeader<T extends object>() {
	const ctx = useDataGridContext<T>();
	return (
		<div className={styles.header}>
			<div className={styles.row}>
				{ctx.columns.map((column) => (
					// TODO: header cells should be buttons (at least if they're sortable)
					<div
						key={column.field}
						className={styles.cell}
						style={{
							width:
								column.width ?? DATAGRID_DEFAULT_COLUMN_WIDTH,
						}}
					>
						<Tooltip title={column.label ?? column.field}>
							<span>{column.label ?? column.field}</span>
						</Tooltip>
					</div>
				))}
				<div role="presentation" className={styles.filler} />
			</div>
		</div>
	);
}
