import type { ButtonProps, IconButtonProps } from "./Button.types";
import { Spinner } from "../Spinner";

export function Button(p: ButtonProps) {
	const { children, isLoading, ...props } = p;
	if ("href" in props) {
		return <a {...props}>{children}</a>;
	}

	const { disabled, ...buttonProps } = props;
	return (
		<button {...buttonProps} disabled={!!disabled || isLoading}>
			<>
				{children}
				{isLoading && <Spinner />}
			</>
		</button>
	);
}

export function IconButton(props: IconButtonProps) {
	return <Button {...props} />;
}
