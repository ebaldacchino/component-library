import { Spinner as SpinnerBase } from "base/Spinner";
import { classNames } from "../../helpers";
import styles from "./Spinner.module.css";

export function Spinner(props: { className?: string }) {
	return (
		<SpinnerBase className={classNames(styles.spinner, props.className)} />
	);
}
