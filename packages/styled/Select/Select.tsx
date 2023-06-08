import { forwardRef } from "react";
import { Select as SelectBase } from "base/Select";
import styles from "./Select.module.css";
import formControlStyles from "../FormControl/FormControl.module.css";
import { ISelect } from "base/Select/Select";
import { classNames } from "../../helpers";

export const Select = forwardRef<HTMLSelectElement, ISelect>((props, ref) => {
	const className = classNames(
		props.className,
		styles.container,
		formControlStyles.container,
		{
			[formControlStyles.prefix]: !!props.prefix,
			[formControlStyles.value]: !!props.value,
			[formControlStyles.error]: !!props.error,
		}
	);
	return <SelectBase {...props} className={className} ref={ref} />;
});
