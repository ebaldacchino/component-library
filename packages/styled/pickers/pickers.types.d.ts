export interface PickersViewProps {
	viewedDate: string;
	onChange: (newDate: string) => void;
	minDate: string;
	maxDate: string;
	shouldDisableDate?: (date: string) => boolean;
}
