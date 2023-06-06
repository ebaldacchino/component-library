import type { IFormControl } from "base/FormControl/FormControl";
import { FormControl as FormControlBase } from "base/FormControl";
import { classNames } from "../../helpers";
import styles from "./FormControl.module.css";

export function FormControl<T>(props: IFormControl<T>) {
	const containerClassName = classNames(styles.container, props.className, {
		[styles.prefix]: !!props.prefix,
		[styles.value]: !!props.value,
		[styles.error]: !!props.error,
	});
	return <FormControlBase {...props} className={containerClassName} />;
}
