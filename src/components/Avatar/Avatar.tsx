import { ReactNode } from "react";
import { classNames } from "../helpers";
import styles from "./Avatar.module.css";

export type TAvatar = { src: string; alt: string } | { children: ReactNode };

export function Avatar(props: TAvatar & { className?: string }) {
	const className = classNames(props.className, styles.avatar);
	return (
		<div className={className}>
			{"children" in props ? props.children : <img {...props} />}
		</div>
	);
}
