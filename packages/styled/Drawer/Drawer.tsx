import { useEffect, useState } from "react";
import { Modal } from "..";
import styles from "./Drawer.module.css";
import { IDrawer } from "./Drawer.types";
import { classNames } from "../../helpers";

export function Drawer({ anchor = "right", ...props }: IDrawer) {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		setIsVisible(props.isVisible);
	}, [props.isVisible]);

	const className = classNames(
		props.className,
		styles.drawer,
		styles[anchor],
		{
			[styles.open]: isVisible,
		}
	);
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
