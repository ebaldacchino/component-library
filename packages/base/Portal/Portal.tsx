import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export function Portal(props: {
	container: HTMLElement;
	isVisible?: boolean;
	children: ReactNode;
}) {
	if (props.isVisible === false) {
		return null;
	}
	return createPortal(props.children, props.container);
}
