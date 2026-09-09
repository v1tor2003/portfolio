import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectReadmeModal } from "./ProjectReadmeModal";

describe("ProjectReadmeModal Component", () => {
	it("does not render when isOpen is false", () => {
		const { container } = render(
			<ProjectReadmeModal
				isOpen={false}
				onClose={() => {}}
				owner="v1tor2003"
				repo="command-api"
			/>,
		);

		expect(container.firstChild).toBeNull();
	});

	it("renders modal and fetches readme content when opened", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => ({ content: "# command-api documentation" }),
			}),
		);

		render(
			<ProjectReadmeModal
				isOpen={true}
				onClose={() => {}}
				owner="v1tor2003"
				repo="command-api"
			/>,
		);

		expect(screen.getByText(/command-api\/README\.md/i)).toBeInTheDocument();
		await waitFor(() => {
			expect(
				screen.getByText(/# command-api documentation/),
			).toBeInTheDocument();
		});

		vi.unstubAllGlobals();
	});

	it("triggers onClose when close button is clicked", () => {
		const handleClose = vi.fn();
		render(
			<ProjectReadmeModal
				isOpen={true}
				onClose={handleClose}
				owner="v1tor2003"
				repo="command-api"
			/>,
		);

		const closeBtn = screen.getByRole("button", { name: /close modal/i });
		fireEvent.click(closeBtn);

		expect(handleClose).toHaveBeenCalled();
	});
});
