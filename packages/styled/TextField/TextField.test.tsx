import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TextField } from "./TextField";
import { useState } from "react";

function Template() {
	const [value, setValue] = useState("");
	return (
		<TextField
			label="Example label"
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
		/>
	);
}

describe("`<TextField/>`", () => {
	afterEach(cleanup);

	test("Error message is visible", async () => {
		// Arrange
		const { getByText } = render(
			<TextField
				error="Oops!!!"
				value="Example text"
				label="Example label"
				onChange={() => {}}
			/>
		);

		// Act

		// Assert
		expect(getByText("Oops!!!")).toBeDefined();
	});

	test("Value updates on rerender", async () => {
		// Arrange
		const { getByDisplayValue, rerender } = render(
			<TextField
				error="Oops!!!"
				value="Example text"
				label="Example label"
				onChange={() => {}}
			/>
		);

		// Act
		const element = getByDisplayValue("Example text") as HTMLInputElement;
		rerender(
			<TextField
				error="Oops!!!"
				value="123456"
				label="Example label"
				onChange={() => {}}
			/>
		);

		// Assert
		expect(element.value).toEqual("123456");
	});

	test("Typing updates value", async () => {
		// Arrange
		const { getByDisplayValue, findByDisplayValue } = render(<Template />);

		// Act
		const element = getByDisplayValue("") as HTMLInputElement;
		userEvent.type(element, "123456");
		await findByDisplayValue("123456");

		// Assert
		expect(element.value).toEqual("123456");
	});

	test("Pasting updates value", async () => {
		// Arrange
		const { getByDisplayValue } = render(<Template />);

		// Act
		const element = getByDisplayValue("") as HTMLInputElement;
		element.focus();
		userEvent.paste("123456");

		// Assert
		expect(element.value).toEqual("123456");
	});
});
