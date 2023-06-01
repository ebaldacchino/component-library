import { forwardRef } from "react";
import { IconButton as IconButtonBase, type IconButtonProps } from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Button.module.css";

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
