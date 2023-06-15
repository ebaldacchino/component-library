import { Button } from "..";
import { classNames } from "@bui/utils";
import styles from "./Chip.module.css";

interface IChip {
	onClick: () => void;
	label: string;
	className?: string;
	onDelete?: () => void;
}

export function Chip({ label, onDelete, ...props }: IChip) {
	const className = classNames(props.className, styles.chip);

	function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
		switch (e.key) {
			case "Backspace":
			case "Delete":
				if (!onDelete) {
					return;
				}
				onDelete();
				break;
			case "Escape":
				e.currentTarget.blur();
				break;
			default:
				return;
		}
		e.preventDefault();
	}

	return (
		<Button {...props} className={className} onKeyDown={handleKeyDown}>
			{label}
		</Button>
	);
}
