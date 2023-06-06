import type { ReactNode } from "react";

export interface IFormControl<T> {
	className?: string;
	error?: boolean | string;
	label: string;
	children: ReactNode;
	prefix?: ReactNode;
	value: T;
}

export function FormControl<T>(props: IFormControl<T>) {
	const { error } = props;
	const hasError = !!error && typeof error === "string";
	return (
		<div className={props.className}>
			<label>{props.label}</label>
			{props.children}
			{hasError && <small>{error}</small>}
		</div>
	);
}
