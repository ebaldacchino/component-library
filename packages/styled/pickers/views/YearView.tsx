import { classNames } from "@bui/utils";
import { Button } from "../../Button";
import styles from "./views.module.css";
import type { PickersViewProps } from "../pickers.types";

interface DatePickerViewProps extends PickersViewProps {
	selectedDate: string;
}

export function YearView(props: DatePickerViewProps) {
	const { minDate, maxDate } = props;

	const startYear = new Date(minDate).getFullYear();
	const currentYear = new Date(props.selectedDate).getFullYear();
	const endYear = new Date(maxDate).getFullYear();
	const yearButtonsCount = endYear - startYear + 1;
	const yearsArray = new Array(yearButtonsCount).fill(null);

	return (
		<div className={styles.years}>
			{yearsArray.map((_, index) => {
				const year = startYear + index;
				const isoDateString = `${year}${props.viewedDate.slice(4)}`;
				const isSelectedYear = year === currentYear;
				const className = classNames({
					[styles.selected]: isSelectedYear,
				});
				return (
					<Button
						key={isoDateString}
						className={className}
						variant="secondary"
						onClick={() => props.onChange(isoDateString)}
					>
						{year}
					</Button>
				);
			})}
		</div>
	);
}
