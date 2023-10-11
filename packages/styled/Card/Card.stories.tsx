import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent } from "./Card";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
	args: {
		children: (
			<CardContent>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quaerat alias explicabo consequatur vero repellendus ad
					maxime facilis atque repudiandae saepe.
				</p>
			</CardContent>
		),
	},
	argTypes: {
		children: {
			description:
				"The card is the container wrapper. Content is in a `<CardContent />` component",
			control: { type: null },
		},
		className: {
			defaultValue: undefined,
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
