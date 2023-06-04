import type { ReactNode } from "react";

export interface IModal {
	className?: string;
	children?: ReactNode;
	isVisible: boolean;
	onClose: () => void;
	onTransitionEnd?: () => void;
}
