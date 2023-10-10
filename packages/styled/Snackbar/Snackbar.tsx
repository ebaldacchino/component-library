import { Portal } from "@bui/base";
import { IconButton } from "../Button";
import { Alert } from "../Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Snackbar.module.css";

export interface SnackbarProps {
	isVisible: boolean;
	onClose?: () => void;
}

export function Snackbar(props: SnackbarProps) {
	return (
		<Portal container={document.body} isVisible={props.isVisible}>
			<div
				style={{ position: "fixed", bottom: "0.5rem", left: "0.5rem" }}
			>
				<Alert className={styles.snackbar}>
					Hello world!
					<IconButton
						aria-label="Close button"
						onClick={props.onClose}
					>
						<FontAwesomeIcon icon={faXmark} />
					</IconButton>
				</Alert>
			</div>
		</Portal>
	);
}
