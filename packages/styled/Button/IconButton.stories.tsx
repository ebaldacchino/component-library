import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { IconButton } from "./IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-regular-svg-icons";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/IconButton",
	component: IconButton,
	tags: ["autodocs"],
	args: { children: <FontAwesomeIcon icon={faCalendarXmark} /> },
	argTypes: {
		"aria-label": {
			description: "An aria-label is required for icon buttons",
			control: { disable: true },
			type: "string",
		},
		children: {
			description:
				"Can pass into the button anything you want\r\n`ReactNode`. Keep in mind that the design only supports an icon",
			control: { disable: true },
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
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		onClick: () => alert("Hello World"),
		"aria-label": "File Icon",
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
		"aria-label": "Loading",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		"aria-label": "Disabled",
	},
};

export const Href: Story = {
	args: {
		href: "https://www.google.com",
		target: "_blank",
		"aria-label": "Link Button",
	},
};
