import { type InputHTMLAttributes } from "react";

type CheckboxHtmlAttributes = Omit<
	InputHTMLAttributes<HTMLElement>,
	"value" | "onChange"
>;

export interface CheckboxProps extends CheckboxHtmlAttributes {
	checked: boolean;
	onChange: (newValue: boolean) => void;
	ref?: React.RefObject<HTMLInputElement>;
}

export function Checkbox(props: CheckboxProps) {
	return (
		<input
			{...props}
			onChange={(e) => props.onChange(e.currentTarget.checked)}
			type="checkbox"
		/>
	);
}
