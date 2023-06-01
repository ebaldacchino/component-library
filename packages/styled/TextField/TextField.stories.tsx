import { type ReactNode, useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./TextField";

const Template = (props: {
	prefix?: ReactNode;
	suffix?: ReactNode;
	label: string;
	value: string;
	error?: string | boolean;
}) => {
	const [value, setValue] = useState(props.value);
	useEffect(() => {
		setValue(props.value);
	}, [props.value]);
	return (
		<TextField
			error={props.error}
			prefix={props.prefix}
			suffix={props.suffix}
			label={props.label}
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
		/>
	);
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/TextField",
	component: TextField,
	render: Template,
	tags: ["autodocs"],
	args: { label: "Text Field" },
	argTypes: {
		value: {
			defaultValue: "",
			description: "The input field's value.",
			control: { type: "text" },
		},
		prefix: {
			description: "Add a prefix to your input e.g. $",
			control: { type: "text" },
		},
		suffix: {
			description: "Add a suffix to your input e.g. kg",
			control: { type: "text" },
		},
		label: { description: "The text field's label text.", control: "text" },
		error: {
			defaultValue: false,
			options: [true, false, "Sample error message"],
			control: { type: "select" },
			description: "Can provide a boolean or an error message as string",
		},
	},
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = { args: { value: "" } };

export const WithValue: Story = {
	args: { label: "Text Field", value: "Text" },
};

export const Prefix: Story = {
	args: { prefix: "$", label: "Text Field", value: "" },
};

export const PrefixWithValue: Story = {
	args: { prefix: "$", label: "Text Field", value: "Text" },
};

export const Suffix: Story = {
	args: {
		suffix: "kg",
		value: "",
	},
};

export const SuffixWithValue: Story = {
	args: {
		suffix: "kg",
		value: "Text",
	},
};

export const Error: Story = {
	args: {
		error: true,
		value: "Whoops",
	},
};

export const ErrorWithNoValue: Story = {
	args: {
		error: true,
		value: "",
	},
};

export const ErrorWithPrefix: Story = {
	args: {
		error: true,
		value: "Whoops",
		prefix: "$",
	},
};

export const ErrorWithMessage: Story = {
	args: {
		error: "Please enter a valid value",
		value: "Whoops",
		suffix: "kg",
	},
};

export default meta;
