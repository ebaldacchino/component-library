import type { Meta, StoryObj } from "@storybook/react";
import { FilePicker } from "./FilePicker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/FilePicker",
	component: FilePicker,
	tags: ["autodocs"],
	args: {
		acceptedFiles: ["image/*"],
		value: [],
		onChange: (e) => console.log(e),
		maximumFilesCount: 2,
		maximumFileSize: 1,
		multiple: true,
		isDisabled: false,
	},
} satisfies Meta<typeof FilePicker>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof meta> = { args: { name: "Default" } };

export const Disabled: StoryObj<typeof meta> = {
	args: { isDisabled: true, name: "Disabled" },
};
