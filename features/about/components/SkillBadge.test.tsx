import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillBadge } from "./SkillBadge";

describe("SkillBadge Component", () => {
	it("renders skill badge with name", () => {
		render(<SkillBadge name="C#" />);
		expect(screen.getByText("C#")).toBeInTheDocument();
	});
});

