import type { Meta } from "@storybook/react";

import { Autocomplete } from "./Autocomplete";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/Autocomplete",
	component: Autocomplete,
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Autocomplete>;

export default meta;

const Template = () => {
	const [favouriteFood, setFavouriteFood] = useState("");
	return (
		<Autocomplete
			label="Favourite food"
			value={favouriteFood}
			onChange={setFavouriteFood}
			options={[
				{ id: "noodles", label: "Noodles" },
				{ id: "rice", label: "Rice" },
				{ id: "lasagne", label: "Lasagne" },
			]}
		/>
	);
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = Template.bind({});
