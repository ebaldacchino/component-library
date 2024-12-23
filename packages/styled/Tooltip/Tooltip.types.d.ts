import type { TPopperPlacement } from "@bui/base";

export interface TooltipElement {
	toggle: () => void;
}

export interface TooltipProps {
	children: JSX.Element;
	title: string;
	placement?: TPopperPlacement;
	className?: string;
	disableHoverListener?: boolean;
	ref?: React.RefObject<TooltipElement>;
}
