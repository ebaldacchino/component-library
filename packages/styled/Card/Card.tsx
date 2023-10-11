import type { ReactNode } from "react";
import styles from "./Card.module.css";
import { classNames } from "@bui/utils";

interface CardProps {
	children?: ReactNode;
	className?: string;
}

interface CardMediaProps {
	src: string;
	alt: string;
	className?: string;
}

export function Card(props: CardProps) {
	const className = classNames(styles.card, props.className);
	return <div className={className}>{props.children}</div>;
}

export function CardMedia(props: CardMediaProps) {
	const className = classNames(styles.media, props.className);
	return <img {...props} className={className} />;
}

export function CardContent(props: CardProps) {
	const className = classNames(styles.contents, props.className);
	return <div className={className}>{props.children}</div>;
}
