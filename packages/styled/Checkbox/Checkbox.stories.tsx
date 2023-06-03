import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "@bui/base";

function Template(args: CheckboxProps) {
	const [checked, setChecked] = useState(args.checked);

	useEffect(() => {
		setChecked(args.checked);
	}, [args.checked]);

	return <Checkbox {...args} checked={checked} onChange={setChecked} />;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	render: Template,
	tags: ["autodocs"],
	args: { checked: false },
	argTypes: {
		checked: {
			description: "The checkbox's value.",
			control: { type: "boolean" },
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: StoryObj<typeof meta> = {};
