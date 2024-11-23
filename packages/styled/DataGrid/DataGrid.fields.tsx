import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import styles from "./DataGrid.module.css";
import { classNames } from "@bui/utils";
import { useDataGridContext } from "./useDataGridContext";

interface DataGridInputProps<T extends object> {
	row: T;
	field: keyof T & string;
}

export function DataGridInput<T extends object>(props: DataGridInputProps<T>) {
	const { row, field } = props;
	const [isEditing, setIsEditing] = useState(false);
	const inputEl = useRef<HTMLInputElement>(null);
	const value = row[field]?.toString() ?? "";
	const [internalValue, setInternalValue] = useState(value);
	const hasUnsavedChanges = useRef(false);
	const { onUpdateCell, rowId, ...ctx } = useDataGridContext<T>();

	useEffect(() => {
		if (isEditing && inputEl.current !== document.activeElement) {
			inputEl.current?.focus();
		}
	}, [isEditing]);

	useEffect(() => {
		setInternalValue((prev) => {
			if (hasUnsavedChanges.current) {
				hasUnsavedChanges.current = prev !== value;
				return prev;
			}

			return value;
		});
	}, [value]);

	if (!isEditing) {
		return (
			<div
				className={styles.text}
				onDoubleClick={() => setIsEditing(true)}
			>
				<span>{value}</span>
			</div>
		);
	}

	function updateInternalValue(newValue: string) {
		setInternalValue(newValue);
		hasUnsavedChanges.current = newValue !== value;
	}

	return (
		<Input
			style={{
				height: "100%",
				width: "100%",
				borderRadius: 0,
				border: 0,
				outline: "1px solid white",
				outlineOffset: 2,
			}}
			value={internalValue}
			ref={inputEl}
			onBlur={() => setIsEditing(false)}
			className={classNames(styles.input, styles.text)}
			onKeyDown={(e) => {
				// To stop the arrow navigation
				e.stopPropagation();

				switch (e.key) {
					case "Enter": {
						if (hasUnsavedChanges.current) {
							const id = row[rowId ?? "id"];
							onUpdateCell?.(internalValue, field, id);
						}
						break;
					}
					case "Escape":
						updateInternalValue(value);
						break;
					default:
						return;
				}

				e.preventDefault();
				setIsEditing(false);
			}}
			onChange={(e) => updateInternalValue(e.currentTarget.value)}
		/>
	);
}
