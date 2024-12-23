import {
	Button as ButtonBase,
	type ButtonProps as BaseButtonProps,
} from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Button.module.css";

type ButtonProps = BaseButtonProps & {
	variant?: "primary" | "secondary";
};

export function Button(props: ButtonProps) {
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

	return <ButtonBase {...props} className={className} />;
}
