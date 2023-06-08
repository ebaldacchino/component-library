import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";
import { useEffect, useState } from "react";
import type { SelectProps } from "@bui/base";

function Template(args: SelectProps) {
	const [favouriteFood, setFavouriteFood] = useState(args.value);
	useEffect(() => {
		setFavouriteFood(args.value);
	}, [args.value]);
	return (
		<Select
			onChange={(e) => {
				setFavouriteFood(e.currentTarget.value);
			}}
			{...args}
			value={favouriteFood}
		/>
	);
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Select> = {
	title: "Components/Select",
	component: Select,
	render: Template,
	tags: ["autodocs"],
	args: {
		label: "Favourite food",
		value: "",
		options: [
			{ id: "noodles", label: "Noodles" },
			{ id: "rice", label: "Rice" },
			{ id: "lasagne", label: "Lasagne" },
		],
		error: false,
	},
	argTypes: {
		value: {
			defaultValue: "",
			options: ["", "noodles", "rice", "lasagne"],
			control: { type: "select" },
			description: "Is the `id` of the selected option",
		},
		options: {
			defaultValue: null,
			control: { type: "object" },
			description: "Key-value pairs to support localized labels",
		},
		error: {
			defaultValue: false,
			options: [true, false, "Sample error message"],
			control: { type: "select" },
			description: "Can provide a boolean or an error message as string",
		},
	},
} satisfies Meta<typeof Select>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NoError: StoryObj<typeof meta> = {};

export const Error: StoryObj<typeof meta> = { args: { error: true } };

export const ErrorWithMessage: StoryObj<typeof meta> = {
	args: { error: "Sample error message" },
};

export default meta;
