import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from ".";
import { Button } from "..";

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
export const Right: StoryObj<typeof meta> = { args: { placement: "right" } };
export const Bottom: StoryObj<typeof meta> = { args: { placement: "bottom" } };
export const Left: StoryObj<typeof meta> = { args: { placement: "left" } };

export default meta;
