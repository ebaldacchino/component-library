import {
	type FormControlProps,
	FormControl as FormControlBase,
} from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./FormControl.module.css";

export function FormControl<T>(props: FormControlProps<T>) {
	const containerClassName = classNames(styles.container, props.className, {
		[styles.prefix]: !!props.prefix,
		[styles.value]: !!props.value,
		[styles.error]: !!props.error,
	});
	return <FormControlBase {...props} className={containerClassName} />;
}
