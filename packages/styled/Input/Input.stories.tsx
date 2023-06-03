import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";
import { useEffect, useState } from "react";
import type { InputProps } from "@bui/base";

function Template(args: InputProps) {
	const [value, setValue] = useState(args.value);

	useEffect(() => {
		setValue(args.value);
	}, [args.value]);

	return (
		<Input
			value={value}
			prefix={args.prefix}
			suffix={args.suffix}
			onChange={(e) => setValue(e.currentTarget.value)}
		/>
	);
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Input",
	component: Input,
	render: Template,
	tags: ["autodocs"],
	args: {
		value: "",
	},
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
		type: {
			description:
				"Type on the input field. Accepts all the standard html values.",
			control: { type: "text" },
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

export const Prefix: Story = {
	args: {
		prefix: "$",
	},
};

export const Suffix: Story = {
	args: {
		suffix: "kg",
	},
};
