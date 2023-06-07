import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Autocomplete.module.css";
import { Input } from "../Input";
import { FormControl } from "../FormControl/FormControl";
import { classNames } from "../helpers";

interface IAutocomplete extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	value: string;
	options: { id: string; label: string }[];
}

const Caret = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
	</svg>
);

export const Autocomplete = forwardRef<HTMLInputElement, IAutocomplete>(
	(props, ref) => {
		const className = classNames(props.className, styles.container);
		return (
			<FormControl {...props} className={className}>
				<Input {...props} ref={ref} suffix={<Caret />} />
				{/* dropdown */}
				{/* i think material ui have select and option utils that they style and use */}
				{/* use popper to position dropdown? */}
				{/* return focus to field? */}
				{/* keyboard navigation */}
			</FormControl>
		);
	}
);
