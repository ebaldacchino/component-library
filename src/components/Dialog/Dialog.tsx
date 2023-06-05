import { useState, useEffect } from "react";
import { Modal } from "..";
import type { IModal } from "../Modal/Modal.types";
import { classNames } from "../helpers";
import styles from "./Dialog.module.css";

export type IDialog = Omit<IModal, "onTransitionEnd">;

export function Dialog(props: IDialog) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(props.isVisible);
	}, [props.isVisible]);

	const className = classNames(props.className, styles.dialog, {
		[styles.open]: isVisible,
	});
	return (
		<Modal
			{...props}
			isVisible={props.isVisible || isVisible}
			className={className}
			onClose={() => setIsVisible(false)}
			onTransitionEnd={() => {
				if (!isVisible) {
					props.onClose();
				}
			}}
		>
			{props.children}
		</Modal>
	);
}
