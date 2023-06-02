import { classNames } from "../helpers";
import styles from "./Spinner.module.css";

export function Spinner(props: { className?: string }) {
	return (
		<div className={classNames(styles.container, props.className)}>
			<div className={styles.spinner} />
		</div>
	);
}
