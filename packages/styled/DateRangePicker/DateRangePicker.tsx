import { useState } from "react";
import { DayView } from "../DatePicker";
import styles from "./DateRangePicker.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

interface DateRangePickerProps {
	viewedDate: string;
	onChange: (newDates: string[]) => void;
	minDate: string;
	maxDate: string;
	shouldDisableDate?: (date: string) => boolean;
}

interface DateRangePickerHeaderProps extends DateRangePickerProps {
	onMonthChange: (date: string) => void;
	canViewLeftArrow?: boolean;
	canViewRightArrow?: boolean;
}

const formatNumberTo2Digits = (number: number): string =>
	number < 10 ? `0${number}` : number.toString();

function DatePickerHeader(props: DateRangePickerHeaderProps) {
	const formatter = Intl.DateTimeFormat("en", {
		month: "long",
		year: "numeric",
	});

	function handleChange(increment: number) {
		const viewedDate = new Date(props.viewedDate);
		viewedDate.setMonth(viewedDate.getMonth() + increment);

		const newMonth = formatNumberTo2Digits(viewedDate.getMonth() + 1);
		const newYear = viewedDate.getFullYear().toString();
		const currentDate = formatNumberTo2Digits(viewedDate.getDate());

		const newIsoDateString = `${newYear}-${newMonth}-${currentDate}`;

		props.onMonthChange(newIsoDateString);
	}

	const monthAndYearString = formatter.format(new Date(props.viewedDate));

	const viewedDate = new Date(props.viewedDate);

	const minDate = new Date(props.minDate);
	const maxDate = new Date(props.maxDate);

	const isLeftArrowDisabled =
		new Date(viewedDate.getFullYear(), viewedDate.getMonth(), -1) < minDate;

	const isRightArrowDisabled =
		maxDate <
		new Date(viewedDate.getFullYear(), viewedDate.getMonth() + 1, 0);

	return (
		<div className={styles.header}>
			{props.canViewLeftArrow && (
				<Button
					className={styles.leftarrow}
					aria-label="Left"
					onClick={() => handleChange(-1)}
					disabled={isLeftArrowDisabled}
					variant="secondary"
				>
					<FontAwesomeIcon icon={faCaretLeft} />
				</Button>
			)}
			<span>{monthAndYearString}</span>
			{props.canViewRightArrow && (
				<Button
					className={styles.rightarrow}
					aria-label="Right"
					onClick={() => handleChange(1)}
					disabled={isRightArrowDisabled}
					variant="secondary"
				>
					<FontAwesomeIcon icon={faCaretRight} />
				</Button>
			)}
		</div>
	);
}

export function DateRangePicker(props: DateRangePickerProps) {
	const { minDate = "1970-01-01", maxDate = "2026-01-01" } = props;
	const [selectedDates, setSelectedDates] = useState<string[]>([]);
	const [viewedDate, setViewedDate] = useState(
		selectedDates[0] ?? new Date().toISOString()
	);

	function handleChange(newDate) {
		const isFirstDateOrBeforeFirstDate =
			selectedDates.length !== 1 ||
			new Date(newDate) < new Date(selectedDates[0]);

		const newSelectedDates = isFirstDateOrBeforeFirstDate
			? [newDate]
			: [...selectedDates, newDate];
		setSelectedDates(newSelectedDates);
		props.onChange?.(newSelectedDates);
	}
	const secondViewedDateObject = new Date(viewedDate);
	secondViewedDateObject.setMonth(secondViewedDateObject.getMonth() + 1);

	return (
		<div className={styles.picker}>
			<div>
				<DatePickerHeader
					onMonthChange={setViewedDate}
					viewedDate={viewedDate}
					onChange={handleChange}
					minDate={minDate}
					maxDate={maxDate}
					canViewLeftArrow
				/>
				<DayView
					selectedDates={selectedDates}
					viewedDate={viewedDate}
					onChange={handleChange}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</div>
			<div>
				<DatePickerHeader
					onMonthChange={(date) => {
						const newDateObject = new Date(date);
						newDateObject.setMonth(newDateObject.getMonth() - 1);

						const newDateIsoString = newDateObject
							.toISOString()
							.slice(0, 10);

						setViewedDate(newDateIsoString);
					}}
					viewedDate={secondViewedDateObject.toISOString()}
					onChange={handleChange}
					minDate={minDate}
					maxDate={maxDate}
					canViewRightArrow
				/>
				<DayView
					selectedDates={selectedDates}
					viewedDate={secondViewedDateObject.toISOString()}
					onChange={handleChange}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</div>
		</div>
	);
}
