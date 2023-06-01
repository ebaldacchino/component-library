import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./Button";

const fileIcon =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMZJREFUeNpi/P//PwMlgAWXRFdXFz6Tg8vKytbhNACm2cPDg0FPTw+b/FogxQhiM2HTDNIIA9+/f2f4+vUrw+fPnxk+fPiAYRgTNs1AW7fAxP7+/YuCcYYBzNk7duwAYR9paemXQK44SNO/f/8YYDTeQER2OkizgoICw58/f+CaCRoACjCQX2GKf//+jaIZrxeQ/YysAZ1NtAG4DCLKAFyaiTIAFGi4NJPtBZINwKYZlOmIMgAU9+TmRj9gatxEpD4/GAMgwAAmB/m2aUdLLwAAAABJRU5ErkJggg==";

const FileIcon = () => <img src={fileIcon} />;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/IconButton",
	component: IconButton,
	tags: ["autodocs"],
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
export const Default: Story = {
	args: {
		children: <FileIcon />,
		onClick: () => alert("Hello World"),
		"aria-label": "File Icon",
	},
};

export const Loading: Story = {
	args: {
		children: <FileIcon />,
		isLoading: true,
		"aria-label": "Loading",
	},
};

export const Disabled: Story = {
	args: {
		children: <FileIcon />,
		disabled: true,
		"aria-label": "Disabled",
	},
};

export const Href: Story = {
	args: {
		children: <FileIcon />,
		href: "https://www.google.com",
		target: "_blank",
		"aria-label": "Link Button",
	},
};
