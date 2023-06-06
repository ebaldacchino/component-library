import {
	type ITextarea,
	Textarea as TextareaBase,
} from "base/Textarea/Textarea";
import { classNames } from "../../helpers";
import styles from "./Textarea.module.css";

export function Textarea(props: ITextarea) {
	const className = classNames(styles.textarea, props.className);
	return <TextareaBase {...props} className={className} />;
}
