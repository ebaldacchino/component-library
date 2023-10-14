import type { TPopperPlacement } from "base/Popper/Popper";
import { Checkbox } from "../Checkbox/Checkbox";
import type { CheckboxProps } from "base/Checkbox/Checkbox";
import { classNames } from "../../helpers";
import styles from "./CheckboxField.module.css";

export interface CheckboxFieldProps extends CheckboxProps {
	label: string;
	labelPlacement?: TPopperPlacement;
	checked: boolean;
	onChange: (newValue: boolean) => void;
}

export function CheckboxField(props: CheckboxFieldProps) {
	const {
		label,
		className: propsClassName,
		labelPlacement = "right",
		...inputProps
	} = props;

	const className = classNames(
		styles.checkbox,
		styles[labelPlacement],
		propsClassName
	);

	return (
		<div>
			<label className={className}>
				{label}
				{props.required && <span>*</span>}
				<Checkbox {...inputProps} type="checkbox" />
			</label>
		</div>
	);
}
