import { TPopperPlacement } from "base/Popper/Popper";

export type TTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface ITooltipPosition {
	top: number;
	left: number;
}

export interface ITooltip {
	children: JSX.Element;
	title: string;
	placement?: TPopperPlacement;
	className?: string;
}
