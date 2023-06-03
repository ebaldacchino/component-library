import type { Meta, StoryObj } from "@storybook/react";

import { Input } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Input",
	component: Input,
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
export const Default: Story = {
	args: {},
};

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
