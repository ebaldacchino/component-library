import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "..";
import type { TPopperPlacementPrefix } from "@bui/base";

const Template = (props: {
	anchor?: TPopperPlacementPrefix;
	isVisible?: boolean;
}) => {
	const [isVisible, setIsVisible] = useState(!!props.isVisible);
	return (
		<>
			<Button onClick={() => setIsVisible(true)}>Click me</Button>
			<Drawer
				anchor={props.anchor}
				isVisible={isVisible}
				onClose={() => setIsVisible(false)}
			>
				<article style={{ maxWidth: "300px", padding: "0 20px" }}>
					<p>
						You won't be able to focus on anything not in the
						drawer. Try focusing on the button yet?
					</p>
					<p>
						Click on the button to open, and the drawer's background
						to close
					</p>
				</article>
			</Drawer>
		</>
	);
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Drawer",
	component: Drawer,
	render: Template,
	tags: ["autodocs"],
	args: {
		isVisible: false,
	},
	argTypes: {
		anchor: {
			defaultValue: "right",
			description: "The screen position that the Drawer element binds to",
			control: { type: "radio" },
		},
		isVisible: {
			description: "Is required to open the drawer",
			control: { disable: true },
		},
	},
} satisfies Meta<typeof Drawer>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Top: StoryObj<typeof meta> = { args: { anchor: "top" } };

export const Right: StoryObj<typeof meta> = {};

export const Bottom: StoryObj<typeof meta> = { args: { anchor: "bottom" } };

export const Left: StoryObj<typeof meta> = { args: { anchor: "left" } };

export const IsVisibleByDefault: StoryObj<typeof meta> = {
	args: { isVisible: true, anchor: "right" },
};
