import { useState, useEffect } from "react";
import { Modal, type ModalProps } from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Dialog.module.css";

export type DialogProps = Omit<ModalProps, "onTransitionEnd">;

export function Dialog(props: DialogProps) {
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
