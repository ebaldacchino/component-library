import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { IDataGridRow } from "./DataGrid";
import styles from "./DataGrid.module.css";

interface DataGridInputProps<T extends IDataGridRow> {
	row: T;
	field: keyof T & string;
}

export function createDataGridInput<T extends IDataGridRow>(
	setRows: Dispatch<SetStateAction<T[]>>
) {
	return function DataGridInput(props: DataGridInputProps<T>) {
		const { row, field } = props;
		const [isEditing, setIsEditing] = useState(false);
		const inputEl = useRef<HTMLInputElement>(null);

		useEffect(() => {
			if (isEditing) {
				inputEl.current.focus();
			}
		}, [isEditing]);

		const value = row[field] as string;

		if (!isEditing) {
			return (
				<div onClick={() => setIsEditing(true)}>
					<span>{value}</span>
				</div>
			);
		}

		return (
			<Input
				value={value}
				ref={inputEl}
				onBlur={() => setIsEditing(false)}
				className={styles.input}
				onChange={(e) => {
					setRows((prevRows: T[]) => {
						const newRows = prevRows.map((prevRow) => {
							if (prevRow.id === row.id) {
								return {
									...prevRow,
									[field]: e.target.value,
								};
							}
							return prevRow;
						});

						return newRows;
					});
				}}
			/>
		);
	};
}
