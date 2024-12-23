import { Portal } from "../Portal";
import type { PopperProps } from "./Popper.types";
import { usePopper } from "./usePopper";

export function Popper(props: PopperProps) {
	const { children } = props;
	const { currentPlacement, location, popperEl } = usePopper(props);

	return (
		<Portal container={document.body} isVisible={props.isVisible}>
			{children({
				placement: currentPlacement,
				style: location,
				ref: popperEl,
			})}
		</Portal>
	);
}
