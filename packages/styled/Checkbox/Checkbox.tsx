import { Checkbox as CheckboxBase, type CheckboxProps } from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Checkbox.module.css";

export function Checkbox(props: CheckboxProps) {
	const className = classNames(props.className, styles.checkbox);
	return <CheckboxBase {...props} className={className} />;
}
