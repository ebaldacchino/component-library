import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	args: { checked: false, label: "Use controls to toggle me" },
	argTypes: {
		checked: {
			description: "The checkbox's value.",
			control: { type: "boolean" },
		},
		label: {
			description: "The checkbox's label.",
			control: { type: "text" },
		},
		labelPlacement: {
			description: "The label placement relative to the checkbox.",
			control: { type: "radio" },
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Right: StoryObj<typeof meta> = {};

export const Top: StoryObj<typeof meta> = {
	args: { labelPlacement: "top" },
};

export const Bottom: StoryObj<typeof meta> = {
	args: { labelPlacement: "bottom" },
};

export const Left: StoryObj<typeof meta> = {
	args: { labelPlacement: "left" },
};

export const Required: StoryObj<typeof meta> = {
	args: { required: true },
};
