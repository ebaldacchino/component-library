import { useEffect, useRef } from "react";
import type { ModalProps } from "./Modal.types";
import { Portal } from "../Portal";
import { classNames } from "@bui/utils";

export function Modal(props: ModalProps) {
	const { isVisible } = props;
	const el = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isVisible) {
			el.current?.showModal();
		}
	}, [isVisible]);

	const className = classNames(props.className);
	return (
		<Portal isVisible={isVisible} container={document.body}>
			<dialog
				className={className}
				ref={el}
				onClick={(e) => {
					const { top, bottom, left, right } =
						e.currentTarget.getBoundingClientRect();

					const clickedBackdrop =
						left > e.clientX ||
						right < e.clientX ||
						top > e.clientY ||
						bottom < e.clientY;

					if (clickedBackdrop) {
						props.onClose();
					}
				}}
				onTransitionEnd={props.onTransitionEnd}
			>
				{props.children}
			</dialog>
		</Portal>
	);
}
