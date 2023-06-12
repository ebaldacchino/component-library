import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { Input } from "../Input";
import styles from "./DataGrid.module.css";
import { useDataGridContext } from "./useDataGridContext";

interface DataGridInputProps<T extends object> {
	row: T;
	field: keyof T & string;
}

export function createDataGridInput<T extends object>(
	setRows: Dispatch<SetStateAction<T[]>>
) {
	return function DataGridInput(props: DataGridInputProps<T>) {
		const { row, field } = props;
		const [isEditing, setIsEditing] = useState(false);
		const inputEl = useRef<HTMLInputElement>(null);
		const ctx = useDataGridContext<T>();

		useEffect(() => {
			if (isEditing) {
				inputEl.current?.focus();
			}
		}, [isEditing]);

		const value = row[field]?.toString();

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
							if (prevRow[ctx.rowId] === row[ctx.rowId]) {
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
