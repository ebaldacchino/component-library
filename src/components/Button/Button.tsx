import { type ForwardedRef, forwardRef } from "react";
import type { IButton, IIconButton, ILinkButton } from "./Button.types";
import { classNames } from "../helpers";
import styles from "./Button.module.css";
import { Spinner } from "..";

// TODO: Fix ref typing to specify HTMLAnchorElement, or HTMLButtonElement
export const Button = forwardRef<HTMLElement, IButton | ILinkButton>(
	(props, ref) => {
		const { children, isLoading } = props;
		const className = classNames(styles.button, props.className, {
			[styles.loading]: !!props.isLoading,
		});
		if ("href" in props) {
			return (
				<a
					{...props}
					className={className}
					ref={ref as ForwardedRef<HTMLAnchorElement>}
				/>
			);
		}
		const disabled = !!props.disabled || isLoading;
		return (
			<button
				{...props}
				className={className}
				disabled={disabled}
				ref={ref as ForwardedRef<HTMLButtonElement>}
			>
				<>
					{children}
					{isLoading && <Spinner className={styles.spinner} />}
				</>
			</button>
		);
	}
);

export const IconButton = forwardRef<HTMLElement, IIconButton>((props, ref) => {
	const { isLoading = false } = props;
	const className = classNames(styles.button, styles.icon, props.className, {
		isLoading,
	});
	return <Button {...props} className={className} ref={ref} />;
});
