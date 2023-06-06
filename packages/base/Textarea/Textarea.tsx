import {
	type ChangeEvent,
	type InputHTMLAttributes,
	type UIEvent,
	useRef,
} from "react";

export interface TextareaProps
	extends InputHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
}

export function Textarea(props: TextareaProps) {
	const el = useRef<HTMLTextAreaElement>(null);

	function updateHeight() {
		if (!el.current) {
			return;
		}

		el.current.style.height = "0px";
		el.current.style.height = el.current.scrollHeight + 2 + "px";
	}

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		props.onChange?.(e);
		updateHeight();
	}

	function handleResize(e: UIEvent<HTMLTextAreaElement>) {
		props.onResize?.(e);
		updateHeight();
	}

	return (
		<textarea
			{...props}
			rows={1}
			onChange={handleChange}
			onResize={handleResize}
			ref={el}
		/>
	);
}
