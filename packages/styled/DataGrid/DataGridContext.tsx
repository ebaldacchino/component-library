import {
	type Context,
	createContext,
	type Dispatch,
	type Key,
	type SetStateAction,
	useState,
} from "react";
import type { DataGridProps, RowId } from "./DataGrid.types";

export type IDataGridContext<T extends object> = Omit<
	DataGridProps<T>,
	"rowId"
> & {
	pageNumber: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
	rowId: RowId<T>;
};

export const DataGridContext = createContext<IDataGridContext<{ id: Key }>>({
	columns: [],
	rows: [],
	paginationSize: 0,
	pageNumber: 0,
	setPageNumber: () => {
		/**/
	},
	rowId: "id",
});

type DataGridProviderProps<T extends object> = React.PropsWithChildren<
	Omit<DataGridProps<T>, "rowId">
> & {
	rowId: RowId<T>;
};

export function DataGridProvider<T extends object>(
	props: DataGridProviderProps<T>
) {
	const { children, ...value } = props;

	const [pageNumber, setPageNumber] = useState(0);

	const ctx = DataGridContext as unknown as Context<IDataGridContext<T>>;
	return (
		<ctx.Provider
			value={
				{
					...value,
					pageNumber,
					setPageNumber,
				} as unknown as IDataGridContext<T>
			}
		>
			{children}
		</ctx.Provider>
	);
}
