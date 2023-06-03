import { Checkbox as CheckboxBase, type CheckboxProps } from "@bui/base";
import { classNames } from "@bui/utils";
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
