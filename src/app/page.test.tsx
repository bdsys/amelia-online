import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("coming-soon page", () => {
  it("shows Amelia's name", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Amelia" })
    ).toBeInTheDocument();
  });

  it("announces that the site is coming soon", () => {
    render(<Home />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it("shows the domain", () => {
    render(<Home />);
    expect(screen.getByText("amelialass.com")).toBeInTheDocument();
  });
});
