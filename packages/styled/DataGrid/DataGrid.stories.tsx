import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid, type DataGridProps, type IDataGridColumn } from "./DataGrid";
import mockData from "./MOCK_DATA.json";
import { useMemo, useState } from "react";
import { createDataGridInput } from "./DataGrid.fields";

interface IMockData {
	id: number;
	name: string;
	age: number;
	gender: string;
	role: string;
}

function Template(args: DataGridProps<IMockData>) {
	const [rows, setRows] = useState<IMockData[]>(mockData);
	const columns: IDataGridColumn<IMockData>[] = useMemo(
		() => [
			{ field: "name", label: "Full Name" },
			{ field: "age", label: "Age" },
			{ field: "gender", label: "Gender" },
			{
				field: "role",
				label: "Role",
				render: createDataGridInput(setRows),
			},
		],
		[]
	);
	const height = !args.paginationSize ? 500 : 80 + args.paginationSize * 40;
	return (
		<div style={{ height, width: 700 }}>
			<DataGrid
				columns={columns}
				rows={rows}
				paginationSize={args.paginationSize}
			/>
		</div>
	);
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/DataGrid",
	component: DataGrid,
	render: Template,
	tags: ["autodocs"],
	argTypes: {
		columns: {},
		paginationSize: {
			defaultValue: undefined,
			control: { type: "number" },
		},
	},
} satisfies Meta<typeof DataGrid<IMockData>>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: StoryObj<typeof meta> = {};
