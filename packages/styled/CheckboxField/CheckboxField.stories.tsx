import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { CheckboxField, type CheckboxFieldProps } from "./CheckboxField";

function Template(args: CheckboxFieldProps) {
	const [checked, setChecked] = useState(args.checked);

	useEffect(() => {
		setChecked(args.checked);
	}, [args.checked]);

	return <CheckboxField {...args} checked={checked} onChange={setChecked} />;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/CheckboxField",
	component: CheckboxField,
	render: Template,
	tags: ["autodocs"],
	args: { checked: false },
	argTypes: {
		checked: {
			description: "The checkbox's value.",
			control: { type: "boolean" },
		},
		label: {
			description: "The checkbox's label.",
			control: { type: "text" },
		},
		labelPlacement: {
			description: "The label placement relative to the checkbox.",
			control: { type: "radio" },
		},
	},
} satisfies Meta<typeof CheckboxField>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Right: StoryObj<typeof meta> = {
	args: {
		label: "Right",
	},
};

export const Top: StoryObj<typeof meta> = {
	args: { labelPlacement: "top", label: "Top" },
};

export const Bottom: StoryObj<typeof meta> = {
	args: { labelPlacement: "bottom", label: "Bottom" },
};

export const Left: StoryObj<typeof meta> = {
	args: { labelPlacement: "left", label: "Left" },
};

export const Required: StoryObj<typeof meta> = {
	args: { required: true, label: "Required" },
};
