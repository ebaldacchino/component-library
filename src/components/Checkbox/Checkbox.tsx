import { type InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "../helpers";
import styles from "./Checkbox.module.css";
import type { TTooltipPlacement } from "../Tooltip/Tooltip.types";

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	labelPlacement?: TTooltipPlacement;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckbox>(
	(props, ref) => {
		const {
			label,
			labelPlacement = "right",
			className,
			...inputProps
		} = props;

		const containerClassName = classNames(
			className,
			styles.checkbox,
			styles[labelPlacement]
		);

		return (
			<div>
				<label
					className={containerClassName}
					onClick={(e) =>
						e.currentTarget.querySelector("input")?.click()
					}
				>
					{label}
					{props.required && (
						<span className={styles.asterisk}>*</span>
					)}
					<input {...inputProps} type="checkbox" ref={ref} />
				</label>
			</div>
		);
	}
);
