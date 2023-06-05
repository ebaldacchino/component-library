import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "..";

const sampleText =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ea quos itaque modi saepe rerum vitae ad perspiciatis vero iusto.";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Popover",
	component: Popover,
	tags: ["autodocs"],
	args: {
		title: sampleText,
		placement: "top",
		children: <Button>Focus on Me</Button>,
	},
	argTypes: {
		placement: {
			defaultValue: "top",
			description: "The popover's placement relative to it's child",
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
				"Is the anchor element that the `<Popover />` positions itself relative on hover. The button is the child in the provided example.",
			control: {
				disable: true,
			},
		},
		className: {
			description: "Can customise your tooltip styles here",
		},
	},
} satisfies Meta<typeof Popover>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Top: StoryObj<typeof meta> = {};
export const Right: StoryObj<typeof meta> = { args: { placement: "right" } };
export const Bottom: StoryObj<typeof meta> = { args: { placement: "bottom" } };
export const Left: StoryObj<typeof meta> = { args: { placement: "left" } };

export default meta;
