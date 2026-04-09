import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import Projects from "../Projects";

describe("Projects", () => {
  const renderProjects = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Projects />,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );

    return render(<RouterProvider router={router} />);
  };

  it("renders projects heading", () => {
    renderProjects();

    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  });

  it("filters projects by search query", () => {
    renderProjects();

    const searchInput = screen.getByRole("searchbox", { name: /search projects/i });
    fireEvent.change(searchInput, { target: { value: "samurai" } });

    expect(screen.getByText("Samurai Duel Saga")).toBeInTheDocument();
    expect(screen.queryByText("Restaurant Landing Page")).not.toBeInTheDocument();
  });
});
