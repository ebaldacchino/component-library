import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "./DataGrid";
import type { DataGridColumn } from "./DataGrid.types";
import mockData from "./MOCK_DATA.json";

interface IMockData {
	id: number;
	name: string;
	age: number;
	gender: string;
	role: string;
}

function generateColumns(
	pinnedPosition?: "left" | "right"
): DataGridColumn<IMockData>[] {
	return [
		{ field: "name", label: "Full Name", pinnedPosition, minWidth: 120 },
		{ field: "age", label: "Age", minWidth: 100 },
		{
			field: "gender",
			label: "Gender",
			pinnedPosition,
			width: 120,
			minWidth: 100,
			isDefaultHidden: true,
		},
		{ field: "id", label: "ID", canHide: false, minWidth: 100, canSort: false },
		{ field: "role", label: "Role", minWidth: 120 },
	] satisfies DataGridColumn<IMockData>[];
}

// function Template(args: DataGridProps<IMockData>) {
// 	const [rows, setRows] = useState<IMockData[]>(mockData);
// 	const columns: DataGridColumn<IMockData>[] = useMemo(
// 		() => [
// 			...generateColumns("right"),
// 			{
// 				field: "role",
// 				label: "Role",
// 				render: createDataGridInput(setRows),
// 				width: 200,
// 			},
// 		],
// 		[]
// 	);
// 	const DATAGRID_ROW_HEIGHT = 48;
// 	const visibleRows = (args.paginationSize ?? 10) + 2;
// 	const height = visibleRows * DATAGRID_ROW_HEIGHT;
// 	return (
// 		<div style={{ height, width: 700 }}>
// 			<DataGrid
// 				columns={columns}
// 				rows={rows}
// 				paginationSize={args.paginationSize}
// 			/>
// 		</div>
// 	);
// }

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Components/DataGrid",
	component: DataGrid,
	// render: Template,
	tags: ["autodocs"],
	args: {
		columns: generateColumns(),
		rows: mockData,
		style: {
			height: 500,
		},
	},
	argTypes: {
		paginationSize: {
			defaultValue: undefined,
			control: { type: "number" },
		},
	},
} satisfies Meta<typeof DataGrid<IMockData>>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NonePinned: StoryObj<typeof meta> = {};

export const PinnedLeft: StoryObj<typeof meta> = {
	args: {
		columns: generateColumns("left"),
	},
};

export const PinnedRight: StoryObj<typeof meta> = {
	args: {
		columns: generateColumns("right"),
	},
};

export const PinnedLeftControlled: StoryObj<typeof meta> = {
	args: {
		columns: generateColumns(),
		pinnedColumns: { left: ["id", "age"] },
	},
};

export const PinnedRightControlled: StoryObj<typeof meta> = {
	args: {
		columns: generateColumns(),
		pinnedColumns: { right: ["id", "age"] },
	},
};
