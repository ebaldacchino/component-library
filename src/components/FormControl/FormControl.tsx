import type { ReactNode } from "react";
import styles from "./FormControl.module.css";
import { classNames } from "../helpers";

interface IFormControl<T> {
	className?: string;
	error?: boolean | string;
	label: string;
	children: ReactNode;
	prefix?: ReactNode;
	value: T;
}

export function FormControl<T>(props: IFormControl<T>) {
	const { error } = props;
	const containerClassName = classNames(styles.container, props.className, {
		[styles.prefix]: !!props.prefix,
		[styles.value]: !!props.value,
		[styles.error]: !!error,
	});
	const hasError = !!error && typeof error === "string";
	return (
		<div className={containerClassName}>
			<label className={styles.label}>{props.label}</label>
			{props.children}
			{hasError && <small>{error}</small>}
		</div>
	);
}
