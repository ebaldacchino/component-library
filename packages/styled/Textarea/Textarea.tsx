import {
	type ITextarea,
	Textarea as TextareaBase,
} from "@bui/base";
import { classNames } from "@bui/utils";
import styles from "./Textarea.module.css";

export function Textarea(props: ITextarea) {
	const className = classNames(styles.textarea, props.className);
	return <TextareaBase {...props} className={className} />;
}
