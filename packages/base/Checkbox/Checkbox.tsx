import { type InputHTMLAttributes, forwardRef } from "react";

type CheckboxHtmlAttributes = Omit<
	InputHTMLAttributes<HTMLElement>,
	"value" | "onChange"
>;

export interface CheckboxProps extends CheckboxHtmlAttributes {
	checked: boolean;
	onChange: (newValue: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(props, ref) => {
		return (
			<input
				{...props}
				onChange={(e) => props.onChange(e.currentTarget.checked)}
				type="checkbox"
				ref={ref}
			/>
		);
	}
);
