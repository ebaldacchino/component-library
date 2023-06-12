import { type Context, useContext } from "react";
import { DataGridContext, type IDataGridContext } from "./DataGridContext";

export function useDataGridContext<T extends object>() {
	const ctx = DataGridContext as unknown as Context<IDataGridContext<T>>;
	return useContext<IDataGridContext<T>>(ctx);
}
