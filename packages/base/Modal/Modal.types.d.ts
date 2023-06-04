import type { ReactNode } from "react";

export interface ModalProps {
	className?: string;
	children?: ReactNode;
	isVisible: boolean;
	onClose: () => void;
	onTransitionEnd?: () => void;
}
