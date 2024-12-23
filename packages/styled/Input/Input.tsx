import { Input as InputBase, type InputProps } from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Input.module.css";

export function Input(props: InputProps) {
	const className = classNames(props.className, styles.input);
	return <InputBase {...props} className={className} />;
}
