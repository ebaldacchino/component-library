import { forwardRef } from "react";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { prefix, suffix, className, ...inputProps } = props;
// TODO: decide how to handle input state
	if (prefix || suffix) {
		return (
			<div className={className}>
				{!!prefix && <div>{prefix}</div>}
				<input type="text" {...inputProps} ref={ref} />
				{!!suffix && <div>{suffix}</div>}
			</div>
		);
	}
	return (
		<input type="text" {...inputProps} className={className} ref={ref} />
	);
});
