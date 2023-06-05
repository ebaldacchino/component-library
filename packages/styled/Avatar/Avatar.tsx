import type { ReactNode } from "react";
import styles from "./Avatar.module.css";
import { classNames } from "@bui/utils";

export type TAvatar = { src: string; alt: string } | { children: ReactNode };

export function Avatar(props: TAvatar & { className?: string }) {
	const className = classNames(props.className, styles.avatar);
	return (
		<div className={className}>
			{"children" in props ? props.children : <img {...props} />}
		</div>
	);
}
