import { forwardRef } from "react";
import type { IInput } from "./Input.types";
import { classNames } from "../helpers";
import styles from "./Input.module.css";

export const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
	const className = classNames(props.className, styles.container);
	// TODO: decide how to handle input state
	if (props.prefix || props.suffix) {
		return (
			<div className={className}>
				{props.prefix && (
					<div className={styles.prefix}>{props.prefix}</div>
				)}
				<input
					className={styles.input}
					type="text"
					{...props}
					ref={ref}
				/>
				{props.suffix && (
					<div className={styles.suffix}>{props.suffix}</div>
				)}
			</div>
		);
	}
	return (
		<input
			type="text"
			{...props}
			className={classNames(styles.container, styles.input)}
			ref={ref}
		/>
	);
});
