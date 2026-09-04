import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BinaryMatrixCanvas } from "./BinaryMatrixCanvas";

describe("BinaryMatrixCanvas Component", () => {
	it("renders canvas element to the DOM", () => {
		const { container } = render(<BinaryMatrixCanvas />);
		const canvas = container.querySelector("canvas");
		expect(canvas).toBeInTheDocument();
		expect(canvas).toHaveClass("fixed", "inset-0", "pointer-events-none");
	});
});
