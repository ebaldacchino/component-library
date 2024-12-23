import type { CSSProperties, ReactElement, RefObject } from "react";

export interface IPopperLocation {
	top: number;
	left: number;
	position: "absolute";
}

export type TPopperPlacementPrefix = "top" | "bottom" | "left" | "right";
export type TPopperPlacementSuffix = "start" | "end";
export type TPopperPlacement =
	| `${TPopperPlacementPrefix}-${TPopperPlacementSuffix}`
	| TPopperPlacementPrefix;

export interface PopperChildProps {
	placement: TPopperPlacement;
	style: CSSProperties;
	ref: RefObject<HTMLDivElement | null>;
}

export interface PopperProps {
	placement: TPopperPlacement;
	children: (props: PopperChildProps) => ReactElement;
	isVisible: boolean;
	anchor: RefObject<HTMLElement | null>;
	ref: RefObject<HTMLElement | null>;
}
