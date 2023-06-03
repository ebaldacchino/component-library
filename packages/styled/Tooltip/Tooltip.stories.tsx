import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tooltip> = {
	title: "Components/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	args: {
		title: "Noodles",
		placement: "top",
		children: <Button>Hover Me</Button>,
	},
	argTypes: {
		placement: {
			defaultValue: "top",
			description: "The tooltip's placement relative to it's child",
			control: { type: "radio" },
		},
		title: {
			description: "The text contained within the tooltip",
			control: {
				type: "text",
			},
		},
		children: {
			description:
				"Is the anchor element that the tooltip positions itself relative on hover. The button is the child in the provided example.",
			control: {
				disable: true,
			},
		},
		className: {
			description: "Can customise your tooltip styles here",
		},
	},
} satisfies Meta<typeof Tooltip>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Top: StoryObj<typeof meta> = {};
export const TopStart: StoryObj<typeof meta> = {
	args: { placement: "top-start" },
};
export const TopEnd: StoryObj<typeof meta> = { args: { placement: "top-end" } };
export const Right: StoryObj<typeof meta> = { args: { placement: "right" } };
export const RightStart: StoryObj<typeof meta> = {
	args: { placement: "right-start" },
};
export const RightEnd: StoryObj<typeof meta> = {
	args: { placement: "right-end" },
};
export const Bottom: StoryObj<typeof meta> = { args: { placement: "bottom" } };
export const BottomStart: StoryObj<typeof meta> = {
	args: { placement: "bottom-start" },
};
export const BottomEnd: StoryObj<typeof meta> = {
	args: { placement: "bottom-end" },
};
export const Left: StoryObj<typeof meta> = { args: { placement: "left" } };
export const LeftStart: StoryObj<typeof meta> = {
	args: { placement: "left-start" },
};
export const LeftEnd: StoryObj<typeof meta> = {
	args: { placement: "left-end" },
};

export default meta;
