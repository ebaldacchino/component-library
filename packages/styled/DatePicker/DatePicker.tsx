import { useState } from "react";
import styles from "./DatePicker.module.css";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { classNames } from "../../helpers";

type TDatePickerView = "day" | "month" | "year";

export type TIsoDate =
	`${number}${number}${number}${number}-${number}${number}-${number}${number}`;

interface DatePickerViewBaseProps {
	viewedDate: TIsoDate;
	onChange: (newDate: TIsoDate) => void;
	minDate: TIsoDate;
	maxDate: TIsoDate;
	shouldDisableDate?: (date: TIsoDate) => boolean;
}

export interface DatePickerViewProps extends DatePickerViewBaseProps {
	selectedDate: TIsoDate;
}

export interface DatePickerDayViewProps extends DatePickerViewBaseProps {
	selectedDates: TIsoDate[];
}

const formatNumberTo2Digits = (number: number): string =>
	number < 10 ? `0${number}` : number.toString();

function getDayNames(
	locale = "en",
	format: "short" | "narrow" | "long" = "short"
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

export function DayView(props: DatePickerDayViewProps) {
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

	const selectedDateIsoDateString: TIsoDate[] = props.selectedDates.map(
		(date: TIsoDate): TIsoDate => {
			const selectedDateObject = new Date(date);
			const selectedMonth = formatNumberTo2Digits(
				selectedDateObject.getMonth() + 1
			);
			const selectedDate = formatNumberTo2Digits(
				selectedDateObject.getDate()
			);
			const selectedYear = selectedDateObject.getFullYear();
			return `${selectedYear}-${selectedMonth}-${selectedDate}` as TIsoDate;
		}
	);

	return (
		<div className={styles.days}>
			{getDayNames().map((day) => (
				<span key={day} className={styles.day}>
					{day.slice(0, 2)}
				</span>
			))}
			{daysBeforeFirstDayArray.map((_, i) => {
				return <span className={styles.day} key={i}></span>;
			})}
			{daysInMonthArray.map((_, index) => {
				const isoDateString =
					`${viewedDate.getFullYear()}-${viewedMonth}-${formatNumberTo2Digits(
						index + 1
					)}` as TIsoDate;

				const isSelectedDate =
					selectedDateIsoDateString.includes(isoDateString);

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

function MonthView(props: DatePickerViewProps) {
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
				}-${viewedDay}` as TIsoDate;

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

function YearView(props: DatePickerViewProps) {
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
				const isoDateString = `${year}${props.viewedDate.slice(
					4
				)}` as TIsoDate;
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

interface DatePickerHeaderProps extends DatePickerViewProps {
	onViewChange: (newView: TDatePickerView) => void;
	onMonthChange: (date: TIsoDate) => void;
	currentView: TDatePickerView;
}

function DatePickerHeader(props: DatePickerHeaderProps) {
	const formatter = Intl.DateTimeFormat("en", {
		month: "long",
		year: "numeric",
	});

	const monthAndYearString = formatter.format(new Date(props.viewedDate));

	function handleChange(increment: number) {
		const viewedDate = new Date(props.viewedDate);

		switch (props.currentView) {
			case "month":
				viewedDate.setFullYear(viewedDate.getFullYear() + increment);
				break;
			case "day":
				viewedDate.setMonth(viewedDate.getMonth() + increment);
				break;
		}

		const newMonth = formatNumberTo2Digits(viewedDate.getMonth() + 1);
		const newYear = viewedDate.getFullYear().toString();
		const currentDate = formatNumberTo2Digits(viewedDate.getDate());

		const newIsoDateString =
			`${newYear}-${newMonth}-${currentDate}` as TIsoDate;

		props.onMonthChange(newIsoDateString);
	}

	function handleViewChange() {
		const newView = props.currentView === "day" ? "year" : "day";
		props.onViewChange(newView);
	}

	let isLeftArrowDisabled: boolean;
	let isRightArrowDisabled: boolean;

	const viewedDate = new Date(props.viewedDate);

	const minDate = new Date(props.minDate);
	const maxDate = new Date(props.maxDate);
	maxDate.setHours(0);

	switch (props.currentView) {
		case "day":
			isLeftArrowDisabled =
				new Date(viewedDate.getFullYear(), viewedDate.getMonth(), -1) <
				minDate;
			isRightArrowDisabled =
				maxDate <=
				new Date(
					viewedDate.getFullYear(),
					viewedDate.getMonth() + 1,
					0
				);
			break;
		case "month":
			isLeftArrowDisabled =
				new Date(viewedDate.getFullYear(), 0, 1) < minDate;
			isRightArrowDisabled =
				maxDate < new Date(viewedDate.getFullYear() + 1, 0, 1);
			break;

		default:
			break;
	}

	return (
		<div className={styles.header}>
			{props.currentView !== "year" && (
				<Button
					aria-label="Left"
					onClick={() => handleChange(-1)}
					disabled={isLeftArrowDisabled}
					variant="secondary"
				>
					<FontAwesomeIcon icon={faCaretLeft} />
				</Button>
			)}
			<Button
				style={{ margin: "auto" }}
				variant={"secondary"}
				onClick={handleViewChange}
			>
				{monthAndYearString}
			</Button>
			{props.currentView !== "year" && (
				<Button
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

interface DatePickerProps {
	views?: TDatePickerView[];
	date?: TIsoDate;
	onChange?: (newDate: TIsoDate) => void;
	minDate?: TIsoDate;
	maxDate?: TIsoDate;
	shouldDisableDate?: (date: TIsoDate) => boolean;
}

export function DatePicker(props: DatePickerProps) {
	const {
		minDate = "2020-02-02",
		maxDate = "2029-11-21",
		views = ["day", "month", "year"],
	} = props;
	const [date, setDate] = useState<TIsoDate>(props.date);
	const [viewedDate, setViewedDate] = useState<TIsoDate>(
		props.date ?? (new Date().toDateString() as TIsoDate)
	);
	const [currentView, setCurrentView] = useState<TDatePickerView>("day");

	function getValidDate(newDate: TIsoDate): TIsoDate {
		let newDateObject = new Date(newDate);

		if (newDateObject < new Date(minDate)) {
			newDateObject = new Date(minDate);
		}

		while (newDateObject < new Date(maxDate)) {
			const d = newDateObject.toISOString().split("T")[0] as TIsoDate;

			if (!props.shouldDisableDate?.(d)) {
				return d;
			}

			newDateObject.setDate(newDateObject.getDate() + 1);
		}

		if (newDateObject > new Date(maxDate)) {
			newDateObject = new Date(maxDate);
		}

		while (newDateObject > new Date(minDate)) {
			const d = newDateObject.toISOString().split("T")[0] as TIsoDate;

			if (!props.shouldDisableDate?.(d)) {
				return d;
			}

			newDateObject.setDate(newDateObject.getDate() - 1);
		}

		return date;
	}

	let inner: JSX.Element;

	switch (currentView) {
		case "day":
			inner = (
				<DayView
					selectedDates={[date]}
					viewedDate={viewedDate}
					onChange={(d) => {
						setDate(d);
						setViewedDate(d);
						props.onChange?.(d);
					}}
					minDate={minDate}
					maxDate={maxDate}
					shouldDisableDate={props.shouldDisableDate}
				/>
			);
			break;
		case "month":
			inner = (
				<MonthView
					selectedDate={date}
					viewedDate={viewedDate}
					onChange={(d) => {
						const newDate = getValidDate(d);
						setDate(newDate);
						setViewedDate(newDate);
						props.onChange?.(newDate);
						setCurrentView("day");
					}}
					minDate={minDate}
					maxDate={maxDate}
					shouldDisableDate={props.shouldDisableDate}
				/>
			);
			break;
		default:
			inner = (
				<YearView
					selectedDate={date}
					viewedDate={viewedDate}
					onChange={(d) => {
						const newDate = getValidDate(d);
						setDate(newDate);
						setViewedDate(newDate);
						props.onChange?.(newDate);
						setCurrentView(
							views.includes("month") ? "month" : "day"
						);
					}}
					minDate={minDate}
					maxDate={maxDate}
					shouldDisableDate={props.shouldDisableDate}
				/>
			);
			break;
	}

	return (
		<div className={styles.picker}>
			<DatePickerHeader
				selectedDate={date}
				viewedDate={viewedDate}
				onChange={setDate}
				onMonthChange={setViewedDate}
				currentView={currentView}
				onViewChange={setCurrentView}
				minDate={minDate}
				maxDate={maxDate}
			/>
			{inner}
		</div>
	);
}
