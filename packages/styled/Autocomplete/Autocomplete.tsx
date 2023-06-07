import {
	useEffect,
	useId,
	useState,
	type RefObject,
} from "react";
import styles from "./Autocomplete.module.css";
import { Input } from "../Input";
import { FormControl } from "../FormControl/FormControl";
import { classNames } from "@bui/utils";

type Option = { id: string; label: string } | string;

interface AutocompleteProps {
	label: string;
	value: string;
	options: Option[];
	onChange: (newValue: string) => void;
	id?: string;
	className?: string;
	ref?: RefObject<HTMLDivElement>;
}

interface OptionProps {
	id: string;
	label: string;
}

function processOptionAttributes(option: Option) {
	if (typeof option === "object") {
		return option;
	}

	return { id: option, label: option };
}

function Option(props: OptionProps) {
	return <option value={props.id}>{props.label}</option>;
}

const Caret = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
	</svg>
);

function findMatchingOption(options: Option[], value: string) {
	return options.find((option) => {
		if (typeof option === "string") {
			return option.toLocaleLowerCase() === value.toLocaleLowerCase();
		}

		return (
			option.id === value ||
			option.label.toLocaleLowerCase() === value.toLocaleLowerCase()
		);
	});
}

export function Autocomplete(props: AutocompleteProps) {
	const { onChange, className, options, value, ref, label, id } = props;
	const [text, setText] = useState("");
	const dataListId = useId();

	function resetText() {
		const newOption = findMatchingOption(options, value);

		const newText =
			typeof newOption === "object" ? newOption.label : newOption || "";

		setText(newText);
	}

	useEffect(resetText, [options, value]);

	return (
		<FormControl
			id={id}
			ref={ref}
			value={text}
			label={label}
			className={classNames(className, styles.container)}
		>
			<Input
				autoComplete="off"
				value={text}
				onInput={(e) => {
					e.preventDefault();
					const { value } = e.currentTarget;

					if (e.nativeEvent instanceof InputEvent) {
						setText(value);
						return;
					}

					const newOption = findMatchingOption(options, value);

					const newValue =
						typeof newOption === "object"
							? newOption.id
							: newOption || "";
					onChange(newValue);
				}}
				onBlur={resetText}
				list={dataListId}
				suffix={<Caret />}
			/>
			<datalist id={dataListId}>
				{options.map((option) => {
					const { id, label } = processOptionAttributes(option);
					return <option key={id} value={label} />;
				})}
			</datalist>
		</FormControl>
	);
}
