import type { TPopperPlacement } from "@bui/base";

export interface TooltipProps {
	children: JSX.Element;
	title: string;
	placement?: TPopperPlacement;
	className?: string;
	disableHoverListener?: boolean;
}

export interface TooltipElement {
	toggle: () => void;
}
