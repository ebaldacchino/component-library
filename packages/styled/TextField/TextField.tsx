import { forwardRef } from "react";
import { Input } from "../Input";
import { FormControl } from "../FormControl";
import type { ITextField } from "base/TextField/TextField.types";

export const TextField = forwardRef<HTMLInputElement, ITextField>(
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
