import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders dynamic copyright year", () => {
    render(<Footer />);

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("shows back to top control", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

    render(<Footer />);
    fireEvent.click(screen.getByRole("button", { name: /scroll back to top/i }));

    expect(scrollToSpy).toHaveBeenCalled();

    scrollToSpy.mockRestore();
  });
});
