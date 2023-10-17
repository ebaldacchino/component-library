import { classNames } from "@bui/utils";
import { Button } from "../../Button";
import styles from "./views.module.css"
import type { PickersViewProps } from "../pickers.types";

interface DatePickerViewProps extends PickersViewProps {
	selectedDate: string;
}

export function MonthView(props: DatePickerViewProps) {
	const formatter = Intl.DateTimeFormat("en", {
		month: "short",
	});
	const monthsArray = new Array(12).fill(null);
	const viewedDate = new Date(props.viewedDate);
	const viewedDay = viewedDate.getDate();
	const viewedMonth = viewedDate.getMonth();
	const viewedYear = viewedDate.getFullYear();
	return (
		<div className={styles.years}>
			{monthsArray.map((_, index) => {
				const newIsoDateString = `${viewedYear}-${
					index + 1
				}-${viewedDay}`;

				const newMonth = new Date(newIsoDateString);

				const isSelectedMonth = viewedMonth === index;

				const monthString = formatter.format(newMonth);

				const className = classNames({
					[styles.selected]: isSelectedMonth,
				});

				const lastDayOfPreviousMonth = new Date(
					newMonth.getFullYear(),
					newMonth.getMonth() + 1,
					-1
				);
				const firstDayOfNextMonth = new Date(
					newMonth.getFullYear(),
					newMonth.getMonth(),
					1
				);
				const minDate = new Date(props.minDate);
				const maxDate = new Date(props.maxDate);

				const isMonthDisabled =
					lastDayOfPreviousMonth < minDate ||
					firstDayOfNextMonth > maxDate;

				return (
					<Button
						key={newIsoDateString}
						className={className}
						variant="secondary"
						onClick={() => props.onChange(newIsoDateString)}
						disabled={isMonthDisabled}
					>
						{monthString}
					</Button>
				);
			})}
		</div>
	);
}
