import type { TPopperPlacement, CheckboxProps } from "@bui/base";
import { Checkbox } from "../Checkbox/Checkbox";
import { classNames } from "@bui/utils";
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
