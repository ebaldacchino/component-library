import { forwardRef } from "react";
import { Portal } from "../Portal";
import type { PopperProps } from "./Popper.types";
import { usePopper } from "./usePopper";

export const Popper = forwardRef<HTMLElement, PopperProps>((props, ref) => {
	const { children } = props;
	const { currentPlacement, location, popperEl } = usePopper(props, ref);

	return (
		<Portal container={document.body} isVisible={props.isVisible}>
			{children({
				placement: currentPlacement,
				style: location,
				ref: popperEl,
			})}
		</Portal>
	);
});
