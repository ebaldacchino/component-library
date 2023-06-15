import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Chip",
	component: Chip,
	tags: ["autodocs"],
	args: {},
	argTypes: {},
} satisfies Meta<typeof Chip>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: StoryObj<typeof meta> = {
	args: {
		label: "Hello world",
	},
};
