import { useState, useEffect } from "react";
import { Modal } from "..";
import { classNames } from "../../helpers";
import styles from "./Dialog.module.css";
import type { IModal } from "base/Modal/Modal.types";

export type IDialog = Omit<IModal, "onTransitionEnd">;

export function Dialog(props: IDialog) {
	const [isVisible, setIsVisible] = useState(false);
	const className = classNames(props.className, styles.dialog, {
		[styles.open]: isVisible,
	});

	useEffect(() => {
		setIsVisible(props.isVisible);
	}, [props.isVisible]);

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
