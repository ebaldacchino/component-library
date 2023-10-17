import { classNames } from "@bui/utils";
import type { PickersViewProps } from "../pickers.types";
import styles from "./views.module.css";
import { Button } from "../../Button";
import { formatNumberTo2Digits } from "../pickers.utils";

export interface DayViewProps extends PickersViewProps {
	selectedDates: string[];
}

function getDayNames(
	locale = "en",
	format: "short" | "narrow" | "long" = "narrow"
) {
	const formatter = new Intl.DateTimeFormat(locale, {
		weekday: format,
		timeZone: "UTC",
	});
	const days = [2, 3, 4, 5, 6, 7, 1].map((day) => {
		const dd = day < 10 ? `0${day}` : day;
		return new Date(`2017-01-${dd}T00:00:00+00:00`);
	});

	return days.map((date) => formatter.format(date));
}

function DaysOfWeek() {
	// TODO: get locale from localization context and pass into `getDayNames`
	return getDayNames().map((day, index) => (
		<span key={index} className={styles.day}>
			{day}
		</span>
	));
}

export function DayView(props: DayViewProps) {
	const viewedDate = new Date(props.viewedDate);

	const firstDateOfMonth = new Date(
		viewedDate.getFullYear(),
		viewedDate.getMonth(),
		1
	);
	const lastDateOfMonth = new Date(
		viewedDate.getFullYear(),
		viewedDate.getMonth() + 1,
		0
	);

	const daysBeforeFirstDayCount = (firstDateOfMonth.getDay() || 7) - 1;
	const daysBeforeFirstDayArray = new Array(daysBeforeFirstDayCount).fill(
		null
	);
	const daysInMonthArray = new Array(lastDateOfMonth.getDate()).fill(null);

	const viewedMonth = formatNumberTo2Digits(viewedDate.getMonth() + 1);

	return (
		<div className={styles.days}>
			<DaysOfWeek />
			{daysBeforeFirstDayArray.map((_, i) => {
				return <span className={styles.day} key={i}></span>;
			})}
			{daysInMonthArray.map((_, index) => {
				const isoDateString = `${viewedDate.getFullYear()}-${viewedMonth}-${formatNumberTo2Digits(
					index + 1
				)}`;

				const isSelectedDate =
					props.selectedDates.includes(isoDateString);

				const className = classNames(styles.day, {
					[styles.selected]: isSelectedDate,
				});

				return (
					<Button
						key={isoDateString}
						className={className}
						variant={isSelectedDate ? "primary" : "secondary"}
						onClick={() => props.onChange(isoDateString)}
						disabled={
							props.shouldDisableDate?.(isoDateString) ||
							new Date(props.minDate) > new Date(isoDateString) ||
							new Date(props.maxDate) < new Date(isoDateString)
						}
					>
						{index + 1}
					</Button>
				);
			})}
		</div>
	);
}
