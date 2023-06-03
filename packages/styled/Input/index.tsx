import { Input as InputBase } from "base";
import type { IInput } from "base/Input/Input.types";
import { classNames } from "../../helpers";
import styles from "./Input.module.css";

export function Input(props: IInput) {
	const className = classNames(props.className, styles.input);
	return <InputBase {...props} className={className} />;
}
