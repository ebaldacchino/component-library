import { classNames } from "@bui/utils";
import styles from "./DataGrid.module.css";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useDataGridContext } from "./useDataGridContext";

export function DataGridFooter() {
	const { pageNumber, setPageNumber, paginationSize, rows } =
		useDataGridContext();

	if (!paginationSize) {
		return null;
	}

	const firstRowIndex = pageNumber * paginationSize;
	const lastRowIndex = Math.min(firstRowIndex + paginationSize, rows.length);

	return (
		<div className={classNames(styles.footer, styles.row)}>
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
