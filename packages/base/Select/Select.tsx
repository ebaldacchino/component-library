import React, { type ReactNode, type SelectHTMLAttributes } from "react";
import { FormControl } from "../FormControl";
import type { KeyOfType } from "@bui/utils";

type Option = { id: string; label: string };

export interface SelectProps<T extends object = object>
	extends SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	value: string;
	options: (Option & T)[];
	groupBy?: KeyOfType<T, string>;
	error?: boolean | string;
	ref?: React.RefObject<HTMLSelectElement>;
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

function groupOptions<T extends object>(props: SelectProps<T>) {
	const { groupBy, options } = props;
	const optionGroups = new Map<string, SelectProps<T>["options"]>();

	if (!groupBy) {
		optionGroups.set("", options);
		return optionGroups;
	}

	options.forEach((option) => {
		const group = option[groupBy]?.toString() ?? "";

		if (!optionGroups.has(group)) {
			optionGroups.set(group, []);
		}

		const groupedOptions = optionGroups.get(group)!;
		groupedOptions.push(option);
	});

	return optionGroups;
}

interface OptionsGroupProps {
	group: string | undefined;
	children: ReactNode;
}

function OptionsGroup(props: OptionsGroupProps) {
	const { group, children } = props;
	if (!group) {
		return <React.Fragment>{children}</React.Fragment>;
	}

	return <optgroup label={group}>{children}</optgroup>;
}

export function Select<T extends object>(props: SelectProps<T>) {
	const { options, error, label, ref, groupBy, ...fieldProps } = props;

	const optionGroups = groupOptions({ options, groupBy } as SelectProps<T>);
	const groupedOptionsArray = Array.from(optionGroups).sort();

	return (
		<FormControl {...fieldProps} error={error} label={label}>
			<div>
				<select {...fieldProps} ref={ref}>
					<option />
					{groupedOptionsArray.map(([group, groupedOptions]) => {
						return (
							<OptionsGroup key={group} group={group}>
								{groupedOptions.map((option) => {
									return (
										<option
											key={option.id}
											value={option.id}
										>
											{option.label}
										</option>
									);
								})}
							</OptionsGroup>
						);
					})}
				</select>
				<div>
					<Caret />
				</div>
			</div>
		</FormControl>
	);
}
