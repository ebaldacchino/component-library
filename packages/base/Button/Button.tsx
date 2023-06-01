import { type ForwardedRef, forwardRef } from "react";
import type { ButtonProps, IconButtonProps } from "./Button.types";
import { Spinner } from "../Spinner";

// TODO: Fix ref typing to specify HTMLAnchorElement, or HTMLButtonElement
export const Button = forwardRef<HTMLElement, ButtonProps>(
	({ children, isLoading, ...props }, ref) => {
		if ("href" in props) {
			return (
				<a {...props} ref={ref as ForwardedRef<HTMLAnchorElement>}>
					{children}
				</a>
			);
		}

		const { disabled, ...buttonProps } = props;
		return (
			<button
				{...buttonProps}
				disabled={!!disabled || isLoading}
				ref={ref as ForwardedRef<HTMLButtonElement>}
			>
				<>
					{children}
					{isLoading && <Spinner />}
				</>
			</button>
		);
	}
);

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
	(props, ref) => {
		return <Button {...props} ref={ref} />;
	}
);
