import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import sampleImage from "./3.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		src: {
			description: "Image path.",
			control: "text",
			if: { arg: "children", truthy: false },
		},
		alt: {
			description: "Image alt test.",
			control: "text",
			if: { arg: "src" },
		},
		children: {
			description:
				"Can provide a string if you're using the Avatar for initials.",
			control: "text",
			if: { arg: "src", truthy: false },
		},
		className: {
			description: "To apply your custom styles.",
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Image: StoryObj<typeof meta> = {
	args: { src: sampleImage, alt: "Random image" },
};

export const Initials: StoryObj<typeof meta> = {
	args: { children: "EB" },
};
