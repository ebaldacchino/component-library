import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "./DataGrid";
import type { DataGridProps, IDataGridColumn } from "./DataGrid.types";
import mockData from "./MOCK_DATA.json";
import React, { useMemo, useState } from "react";
import { createDataGridInput } from "./DataGrid.fields";

interface IMockData {
	id: number;
	name: string;
	age: number;
	gender: string;
	role: string;
}

const staticColumns: IDataGridColumn<IMockData>[] = [
	{ field: "name", label: "Full Name" },
	{ field: "age", label: "Age", width: 80 },
	{ field: "gender", label: "Gender" },
];

function Template(args: DataGridProps<IMockData>) {
	const [rows, setRows] = useState<IMockData[]>(mockData);
	const columns: IDataGridColumn<IMockData>[] = useMemo(
		() => [
			...staticColumns,
			{
				field: "role",
				label: "Role",
				render: createDataGridInput(setRows),
			},
		],
		[]
	);
	const DATAGRID_ROW_HEIGHT = 48;
	const visibleRows = (args.paginationSize ?? 10) + 2;
	const height = visibleRows * DATAGRID_ROW_HEIGHT;
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
