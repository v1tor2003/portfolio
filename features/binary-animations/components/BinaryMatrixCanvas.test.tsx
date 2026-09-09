import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BinaryMatrixCanvas } from "./BinaryMatrixCanvas";

describe("BinaryMatrixCanvas Component", () => {
	it("renders canvas element to the DOM with default and custom props", () => {
		const { container } = render(
			<BinaryMatrixCanvas
				color="#10b981"
				highlightColor="#34d399"
				characters={["0", "1", "λ"]}
				fontSize={20}
				opacity={0.3}
			/>,
		);
		const canvas = container.querySelector("canvas");
		expect(canvas).toBeInTheDocument();
		expect(canvas).toHaveClass("fixed", "inset-0", "pointer-events-none");
	});
});
