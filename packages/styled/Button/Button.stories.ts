import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		children: {
			description:
				"Can pass into the button anything you want\r\n`ReactNode`",
			control: { type: "text" },
		},
		onClick: {
			description: "All HTML element events are available on the button.",
		},
		href: {
			description:
				"If defined, the component will be an anchor tag instead of a button",
			control: "text",
		},
		isLoading: {
			description: "Use to show a loading spinner.",
			defaultValue: false,
			control: { type: "boolean" },
		},
		disabled: {
			description: "Use to disable the button.",
			defaultValue: false,
			control: { type: "boolean" },
		},
		variant: {
			control: { type: "radio" },
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		children: "Hello World",
		onClick: () => alert("Hello World"),
	},
};

export const Secondary: Story = {
	args: {
		children: "Hello World",
		onClick: () => alert("Hello World"),
		variant: "secondary",
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
		children: "Hello World",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Hello World",
	},
};

export const Href: Story = {
	args: {
		children: "Go to Google",
		href: "https://www.google.com",
		target: "_blank",
	},
};
