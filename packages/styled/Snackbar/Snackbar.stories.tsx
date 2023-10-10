import type { Meta, StoryObj } from "@storybook/react";

import { Snackbar } from "./Snackbar";
import { useEffect, useState } from "react";
import { Button } from "../Button";

function Template(args: { isVisible: boolean }) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		setIsVisible(args.isVisible);
	}, [args.isVisible]);

	return (
		<>
			<Button onClick={() => setIsVisible(true)}>Open</Button>
			<Snackbar
				isVisible={isVisible}
				onClose={() => setIsVisible(false)}
			/>
		</>
	);
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Snackbar",
	component: Snackbar,
	render: Template,
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
