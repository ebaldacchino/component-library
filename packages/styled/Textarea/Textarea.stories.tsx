import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";
import React, { useEffect, useState } from "react";

const Template = (args: {
	value?: string | number | readonly string[] | undefined;
}) => {
	const [value, setValue] = useState(args.value);
	useEffect(() => {
		setValue(args.value);
	}, [args.value]);

	return (
		<Textarea
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
		/>
	);
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Textarea",
	component: Textarea,
	render: Template,
	tags: ["autodocs"],
	args: { value: "" },
	argTypes: {
		value: {
			description: "The textarea's text value.",
			control: "text",
		},
		className: {
			description: "Add a className to apply your custom styles.",
			control: { disable: true },
		},
	},
} satisfies Meta<typeof Textarea>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof meta> = {};
