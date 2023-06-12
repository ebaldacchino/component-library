import { DataGridHeader } from "./DataGridHeader";
import { DataGridFooter } from "./DataGridFooter";
import type { DataGridProps, RowId } from "./DataGrid.types";
import { DataGridProvider } from "./DataGridProvider";
import { DataGridBody } from "./DataGridBody";
import styles from "./DataGrid.module.css";
import { classNames } from "@bui/utils";
import { DataGridSidebar } from "./DataGridSidebar";

export function DataGrid<T extends object>(props: DataGridProps<T>) {
	const { rowId, ...providerProps } = props;
	const typedRowId = (rowId ?? "id") as RowId<T>;
	return (
		<div
			className={classNames(styles.grid, props.className)}
			style={props.style}
		>
			<DataGridProvider {...providerProps} rowId={typedRowId}>
				<DataGridHeader />
				<DataGridBody />
				<DataGridSidebar columns={props.columns} />
				<DataGridFooter />
			</DataGridProvider>
		</div>
	);
}
