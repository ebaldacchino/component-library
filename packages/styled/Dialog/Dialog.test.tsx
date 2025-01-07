import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Dialog } from "./Dialog";
import { useState } from "react";

function Template() {
	const [isVisible, setIsVisible] = useState(false);

	function handleClose() {
		setIsVisible(false);
	}

	return (
		<>
			<button onClick={() => setIsVisible(true)}>Open</button>

			<Dialog isVisible={isVisible} onClose={handleClose}>
				<button onClick={handleClose}>Close</button>
			</Dialog>
		</>
	);
}

describe("`<Dialog/>`", () => {
	afterEach(cleanup);

	test("`<Dialog/>` is visible after pressing open button", async () => {
		// Arrange
		const { findByText, getByText } = render(<Template />);

		// Act
		userEvent.click(getByText("Open"));

		// Assert
		expect(await findByText("Close")).toBeDefined();
	});

	test("Button to open `<Dialog/>` is focused `onEscape`", async () => {
		// Arrange
		const { findByText, getByText } = render(<Template />);

		userEvent.click(getByText("Open"));
		await findByText("Close");

		// Act
		userEvent.keyboard("Escape");

		// Assert
		expect(await findByText("Open")).toEqual(document.activeElement);
	});

	test("Button to open `<Dialog/>` is focused after closing `<Dialog/>` by clicking backdrop", async () => {
		// Arrange
		const { findByText, getByText } = render(<Template />);

		userEvent.click(getByText("Open"));
		await findByText("Close");

		// Act
		userEvent.click(document.body);

		// Assert
		expect(await findByText("Open")).toEqual(document.activeElement);
	});

	test("Button to open `<Dialog/>` is focused after clicking `<Dialog/>` close button", async () => {
		// Arrange
		const { findByText, getByText } = render(<Template />);

		userEvent.click(getByText("Open"));

		// Act
		userEvent.click(await findByText("Close"));

		// Assert
		expect(await findByText("Open")).toEqual(document.activeElement);
	});
});
