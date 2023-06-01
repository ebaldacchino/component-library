import { forwardRef } from "react";
import {
	Button as ButtonBase,
	IconButton as IconButtonBase,
	type ButtonProps as BaseButtonProps,
	type IconButtonProps,
} from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Button.module.css";

type ButtonProps = BaseButtonProps & {
	variant?: "primary" | "secondary";
};

export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
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
