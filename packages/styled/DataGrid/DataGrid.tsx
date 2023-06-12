import {
	type Context,
	type ReactNode,
	createContext,
	useContext,
	memo,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import styles from "./DataGrid.module.css";
import { Tooltip } from "..";
import { IconButton } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { classNames } from "@bui/utils";

const typedMemo: <T>(c: T) => T = memo;

export interface IDataGridRow {
	id: string | number;
}

export interface IDataGridColumn<
	T extends IDataGridRow,
	TField = keyof T & string
> {
	field: TField;
	label?: string;
	render?: (props: { row: T; field: TField }) => ReactNode;
}

export interface DataGridProps<T extends IDataGridRow> {
	columns: IDataGridColumn<T>[];
	rows: T[];
	paginationSize?: number;
}

interface IDataGridContext<T extends IDataGridRow> extends DataGridProps<T> {
	pageNumber: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
}

const DataGridContext = createContext<IDataGridContext<IDataGridRow>>({
	columns: [],
	rows: [],
	paginationSize: 0,
	pageNumber: 0,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setPageNumber: () => {},
});

function useDataGridContext<T extends IDataGridRow>() {
	const ctx = DataGridContext as unknown as Context<IDataGridContext<T>>;
	return useContext<IDataGridContext<T>>(ctx);
}

function DataGridProvider<T extends IDataGridRow>(
	props: DataGridProps<T> & { children: ReactNode }
) {
	const { children, ...value } = props;

	const [pageNumber, setPageNumber] = useState(0);

	const ctx = DataGridContext as unknown as Context<IDataGridContext<T>>;
	return (
		<ctx.Provider value={{ ...value, pageNumber, setPageNumber }}>
			{children}
		</ctx.Provider>
	);
}

function DataGridHeader<T extends IDataGridRow>() {
	const ctx = useDataGridContext<T>();
	return (
		<div className={styles.header}>
			{ctx.columns.map((column) => (
				// TODO: header cells should be buttons (at least if theyre sortable)
				<div key={column.field} className={styles.cell}>
					<Tooltip title={column.label ?? column.field}>
						<span>{column.label ?? column.field}</span>
					</Tooltip>
				</div>
			))}
		</div>
	);
}

interface DataGridRowProps<T extends IDataGridRow> {
	row: T;
	columns: IDataGridColumn<T>[];
}

function DataGridRow<T extends IDataGridRow>(props: DataGridRowProps<T>) {
	const { columns, row } = props;
	return (
		<div className={styles.row}>
			{columns.map((col) => {
				const id = col.field + row.id;
				if (col.render) {
					return (
						<div key={id} className={styles.cell}>
							<col.render row={row} field={col.field} />
						</div>
					);
				}

				const value = row[col.field];

				return (
					<div key={id} className={styles.cell}>
						<div>
							<span>{value as string}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}

const MemoizedDataGridRow = typedMemo(DataGridRow);

function getRows<T extends IDataGridRow>(ctx: IDataGridContext<T>) {
	const { rows, paginationSize, pageNumber } = ctx;
	if (!paginationSize) {
		return rows;
	}
	const firstRowIndex = pageNumber * paginationSize;
	const lastRowIndex = firstRowIndex + paginationSize;
	return rows.slice(firstRowIndex, lastRowIndex);
}

function DataGridBody<T extends IDataGridRow>() {
	const ctx = useDataGridContext<T>();

	const { columns } = ctx;

	const rows = getRows(ctx);

	return (
		<div className={styles.body}>
			{rows.map((row, index) => {
				return (
					<MemoizedDataGridRow
						key={index}
						row={row}
						columns={columns}
					/>
				);
			})}
		</div>
	);
}

function DataGridFooter() {
	const { pageNumber, setPageNumber, paginationSize, rows } =
		useDataGridContext();

	if (!paginationSize) {
		return null;
	}

	const firstRowIndex = pageNumber * paginationSize;
	const lastRowIndex = Math.min(firstRowIndex + paginationSize, rows.length);

	return (
		<div className={classNames(styles.header, styles.footer)}>
			<div className={styles.cell}>
				<div>
					{firstRowIndex + 1}-{lastRowIndex} of {rows.length}
				</div>
				<IconButton
					aria-label="Left"
					onClick={() => setPageNumber((p) => p - 1)}
					disabled={!pageNumber}
				>
					<FontAwesomeIcon icon={faCaretLeft} />
				</IconButton>
				<IconButton
					aria-label="Right"
					onClick={() => setPageNumber((p) => p + 1)}
					disabled={
						pageNumber * paginationSize + paginationSize >=
						rows.length
					}
				>
					<FontAwesomeIcon icon={faCaretRight} />
				</IconButton>
			</div>
		</div>
	);
}

export function DataGrid<T extends IDataGridRow>(props: DataGridProps<T>) {
	return (
		<div className={styles.grid}>
			<DataGridProvider {...props}>
				<DataGridHeader />
				<DataGridBody />
				<DataGridFooter />
			</DataGridProvider>
		</div>
	);
}
