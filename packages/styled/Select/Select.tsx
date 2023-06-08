import { forwardRef } from "react";
import { Select as SelectBase, type SelectProps } from "@bui/base";
import styles from "./Select.module.css";
import formControlStyles from "../FormControl/FormControl.module.css";
import { classNames } from "@bui/utils";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(props, ref) => {
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
	}
);
