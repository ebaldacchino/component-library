import { useEffect, useState } from "react";
import type { SortModel } from "./DataGrid.types";

export function useDataGridRows<T extends object>(
	rows: T[],
	sortModel: SortModel<T> | null
) {
	const [internalRows, setInternalRows] = useState<T[]>(() => rows);

	useEffect(() => {
		setInternalRows((_) => {
			if (!sortModel) {
				return rows;
			}

			const { field, direction } = sortModel;
			return [...rows].sort((a, b) => {
				const first = a[field];
				const second = b[field];

				let result: number;

				if (first === second) {
					return 0;
				}

				const canUseNumberComparator =
					typeof first === "number" ||
					(typeof first === "boolean" &&
						typeof second === "number") ||
					typeof second === "boolean";

				if (canUseNumberComparator) {
					result = Number(first) - Number(second);
				} else {
					result = String(first).localeCompare(String(second));
				}

				if (direction === "DESC") {
					result *= -1;
				}

				return result;
			});
		});
	}, [sortModel, rows]);

	return internalRows;
}
