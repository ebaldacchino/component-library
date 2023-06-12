import { useState } from "react";
import type { DataGridColumn } from "./DataGrid.types";
import { useDataGridContext } from "./useDataGridContext";
import styles from "./DataGrid.module.css";
import { CheckboxField } from "../CheckboxField";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";

declare global {
	interface ObjectConstructor {
		keys<T extends object>(o: T): (keyof T & string)[];
	}
}

interface DataGridSidebarProps<T extends object> {
	columns: DataGridColumn<T>[];
}

export function DataGridSidebar<T extends object>(
	props: DataGridSidebarProps<T>
) {
	const { columnVisibilityModel, ...ctx } = useDataGridContext<T>();
	const [showMenu, setShowMenu] = useState(false);

	if (columnVisibilityModel === undefined) {
		return null;
	}

	function toggleMenuVisibility() {
		setShowMenu((p) => !p);
	}

	const keys = Object.keys(columnVisibilityModel);

	return (
		<div className={styles.sidebar}>
			{showMenu && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						padding: 12,
					}}
				>
					{keys.map((key) => {
						const value = columnVisibilityModel[key];
						const column = props.columns.find((c) => {
							return c.field === key;
						});

						function toggleColumnVisibility() {
							ctx.setColumnVisibilityModel((prev) => {
								return { ...prev, [key]: !prev[key] };
							});
						}

						return (
							<CheckboxField
								key={key}
								labelPlacement="left"
								label={column?.label ?? key}
								checked={!!value}
								onChange={toggleColumnVisibility}
							/>
						);
					})}
				</div>
			)}
			<div>
				<Button onClick={toggleMenuVisibility}>
					<FontAwesomeIcon icon={faColumns} />
					Columns
				</Button>
			</div>
		</div>
	);
}
