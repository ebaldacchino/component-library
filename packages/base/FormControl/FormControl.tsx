import type { ReactNode, RefObject } from "react";

export interface FormControlProps<T> {
	className?: string;
	id?: string;
	error?: boolean | string;
	label: string;
	children: ReactNode;
	prefix?: ReactNode;
	value: T;
	ref?: RefObject<HTMLDivElement>;
}

export function FormControl<T>(props: FormControlProps<T>) {
	const { error } = props;
	const hasError = !!error && typeof error === "string";
	return (
		<div className={props.className} ref={props.ref} id={props.id}>
			<label>{props.label}</label>
			{props.children}
			{hasError && <small>{error}</small>}
		</div>
	);
}
