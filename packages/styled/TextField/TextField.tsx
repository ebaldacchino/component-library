import { type ReactNode } from "react";
import { Input } from "../Input";
import { FormControl } from "../FormControl";
import type { FormControlProps, InputProps } from "@bui/base";

export interface TextFieldProps
	extends Omit<FormControlProps<string>, "children">,
		InputProps {
	// TODO: Should be able to remove all 3 (both are the same on both interfaces - upgrade TypeScript?)
	value: string;
	prefix?: ReactNode;
	ref?: React.RefObject<HTMLInputElement>;
}

export function TextField(props: TextFieldProps) {
	const { label, className, error, ...inputProps } = props;

	return (
		<FormControl
			prefix={props.prefix}
			error={error}
			value={props.value}
			className={className}
			label={label}
		>
			<Input {...inputProps} />
		</FormControl>
	);
}
