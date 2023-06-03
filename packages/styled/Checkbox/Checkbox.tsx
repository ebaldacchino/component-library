import { Checkbox as CheckboxBase } from "base/Checkbox";
import type { CheckboxProps } from "base/Checkbox/Checkbox";
import { classNames } from "../../helpers";
import styles from "./Checkbox.module.css";
import { forwardRef } from "react";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(props, ref) => {
		const { ...checkboxProps } = props;
		const className = classNames(props.className, styles.checkbox);
		return (
			<CheckboxBase {...checkboxProps} className={className} ref={ref} />
		);
	}
);
