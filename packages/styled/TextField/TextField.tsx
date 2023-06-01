import { type ReactNode, forwardRef } from "react";
import { Input } from "../Input";
import { FormControl } from "../FormControl";
import type { FormControlProps, InputProps } from "@bui/base";

export interface TextFieldProps extends FormControlProps<string>, InputProps {
	// TODO: Should be able to remove all 3 (both are the same on both interfaces - upgrade TypeScript?)
	value: string;
	prefix?: ReactNode;
	children: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(props, ref) => {
		const { label, className, error, ...inputProps } = props;

		return (
			<FormControl
				prefix={props.prefix}
				error={error}
				value={props.value}
				className={className}
				label={label}
			>
				<Input {...inputProps} ref={ref} />
			</FormControl>
		);
	}
);
