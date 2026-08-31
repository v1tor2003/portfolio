import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "./page";

test("renders homepage title", () => {
	render(<HomePage />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"Vítor Pires",
	);
});
