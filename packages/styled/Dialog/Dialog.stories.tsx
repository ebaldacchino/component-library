import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { useState, useEffect } from "react";
import type { DialogProps } from "./Dialog";

function Template(args: DialogProps) {
	const [isVisible, setIsVisible] = useState(args.isVisible);

	useEffect(() => {
		setIsVisible(args.isVisible);
	}, [args.isVisible]);

	return (
		<Dialog isVisible={isVisible} onClose={() => setIsVisible(false)}>
			<p>Click the background or use the controls to close</p>
		</Dialog>
	);
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Dialog",
	component: Dialog,
	render: Template,
	tags: ["autodocs"],
	args: { isVisible: true },
	argTypes: {
		isVisible: {
			description: "Conditionally render the dialog",
			defaultValue: false,
			control: "boolean",
		},
		onClose: {
			description: "Handle your logic to close the dialog",
			disable: true,
		},
		className: {
			description: "Customise your dialog styles",
			control: false,
		},
	},
} satisfies Meta<typeof Dialog>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: StoryObj<typeof meta> = {};
