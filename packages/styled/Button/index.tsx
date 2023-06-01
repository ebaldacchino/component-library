import { forwardRef } from "react";
import {
	Button as ButtonBase,
	IconButton as IconButtonBase,
} from "base/Button";
import type {
	IButton as IBaseButton,
	IconButtonProps,
} from "base/Button/Button.types";
import { classNames } from "../../helpers";
import styles from "./Button.module.css";

interface IButton extends IBaseButton {
	variant?: "primary" | "secondary";
}

export const Button = forwardRef<HTMLElement, IButton>((props, ref) => {
	const { variant = "primary" } = props;

	const className = classNames(
		props.className,
		styles.base,
		styles.button,
		styles[variant],
		{
			[styles.loading]: !!props.isLoading,
		}
	);

	return <ButtonBase {...props} className={className} ref={ref} />;
});

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
	(props, ref) => {
		const className = classNames(
			props.className,
			styles.base,
			styles.icon,
			{
				[styles.loading]: !!props.isLoading,
			}
		);
		return <IconButtonBase {...props} className={className} ref={ref} />;
	}
);
