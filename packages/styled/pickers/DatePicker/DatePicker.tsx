import { useState } from "react";
import styles from "./DatePicker.module.css";
import { Button } from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { DayView, MonthView, YearView } from "../views";
import { formatNumberTo2Digits, isoDateString } from "../pickers.utils";
import type { PickersViewProps } from "../pickers.types";

type TDatePickerView = "day" | "month" | "year";

interface DatePickerViewProps extends PickersViewProps {
	selectedDate: string;
}

interface DatePickerHeaderProps extends DatePickerViewProps {
	onViewChange: (newView: TDatePickerView) => void;
	onMonthChange: (date: string) => void;
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

		const newIsoDateString = `${newYear}-${newMonth}-${currentDate}`;

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
			isLeftArrowDisabled = false;
			isRightArrowDisabled = false;
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
	date?: string;
	onChange?: (newDate: string) => void;
	minDate?: string;
	maxDate?: string;
	shouldDisableDate?: (date: string) => boolean;
}

export function DatePicker(props: DatePickerProps) {
	const {
		minDate = "2020-02-02",
		maxDate = "2029-11-21",
		views = ["day", "month", "year"],
	} = props;
	const [date, setDate] = useState<string>(props.date ?? isoDateString);
	const [viewedDate, setViewedDate] = useState<string>(
		props.date ?? isoDateString
	);
	const [currentView, setCurrentView] = useState<TDatePickerView>("day");

	function getValidDate(newDate: string): string {
		let newDateObject = new Date(newDate);

		if (newDateObject < new Date(minDate)) {
			newDateObject = new Date(minDate);
		}

		while (newDateObject < new Date(maxDate)) {
			const d = isoDateString(newDateObject);

			if (!props.shouldDisableDate?.(d)) {
				return d;
			}

			newDateObject.setDate(newDateObject.getDate() + 1);
		}

		if (newDateObject > new Date(maxDate)) {
			newDateObject = new Date(maxDate);
		}

		while (newDateObject > new Date(minDate)) {
			const d = isoDateString(newDateObject);

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
