import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {},
};
