import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/DatePicker",
	component: DatePicker,
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof DatePicker>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: StoryObj<typeof meta> = {
	args: {
		shouldDisableDate: (d) => !new Date(d).getDay().toString().match(/[1-5]/)
	},
};
