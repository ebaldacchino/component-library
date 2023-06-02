import { Spinner as SpinnerBase } from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Spinner.module.css";

export function Spinner(props: { className?: string }) {
	return (
		<SpinnerBase className={classNames(styles.spinner, props.className)} />
	);
}
