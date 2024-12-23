import type { InputProps } from "./Input.types";

export function Input(props: InputProps) {
	const { prefix, suffix, className, ...inputProps } = props;
	// TODO: decide how to handle input state
	if (prefix || suffix) {
		return (
			<div className={className}>
				{!!prefix && <div>{prefix}</div>}
				<input type="text" {...inputProps} />
				{!!suffix && <div>{suffix}</div>}
			</div>
		);
	}
	return <input type="text" {...inputProps} className={className} />;
}
