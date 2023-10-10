import { classNames } from "@bui/utils";
import styles from "./Alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import type { ReactNode } from "react";

interface AlertProps {
	children: ReactNode;
	variant?: "info" | "success" | "warning" | "error";
	className?: string;
}

export function Alert(props: AlertProps) {
	const className = classNames(
		props.className,
		styles.alert,
		styles[props.variant ?? "info"]
	);
	return (
		<div className={className}>
			<div>
				<FontAwesomeIcon icon={faCircleCheck} />
			</div>
			<div>{props.children}</div>
		</div>
	);
}
