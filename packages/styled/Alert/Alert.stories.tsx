import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Alert> = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		children: {
			description: "Can pass into the Alert a string",
			control: { type: "text" },
		},
		variant: {
			defaultValue: "info",
			description: "The Alert's colour scheme",
			control: { type: "radio" },
		},
		className: {
			defaultValue: undefined,
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Info: Story = {
	args: {
		children: "Hello World",
	},
};

export const Success: Story = {
	args: {
		children: "Hello World",
		variant: "success",
	},
};

export const Warning: Story = {
	args: {
		children: "Hello World",
		variant: "warning",
	},
};

export const Error: Story = {
	args: {
		children: "Hello World",
		variant: "error",
	},
};
