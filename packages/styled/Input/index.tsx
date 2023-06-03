import { forwardRef } from "react";
import { Input as InputBase, type InputProps } from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Input.module.css";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const className = classNames(props.className, styles.input);
	return <InputBase {...props} className={className} ref={ref} />;
});
