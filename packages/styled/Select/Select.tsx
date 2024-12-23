import { Select as SelectBase, type SelectProps } from "@bui/base";
import styles from "./Select.module.css";
import formControlStyles from "../FormControl/FormControl.module.css";
import { classNames } from "@bui/utils";

export function Select(props: SelectProps) {
	const className = classNames(
		props.className,
		styles.container,
		formControlStyles.container,
		{
			[formControlStyles.prefix]: !!props.prefix,
			[formControlStyles.value]: !!props.value,
			[formControlStyles.error]: !!props.error,
		}
	);
	return <SelectBase {...props} className={className} />;
}
