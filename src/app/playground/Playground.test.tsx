import { render, screen, fireEvent } from "@testing-library/react";
import Playground from "./Playground";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) =>
    <a href={href}>{children}</a>,
}));

describe("Playground", () => {
  it("renders the hub with avatar and greeting", () => {
    render(<Playground />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/amelia/i)).toBeInTheDocument();
  });

  it("hub has a grown-ups link", () => {
    render(<Playground />);
    const link = screen.getByRole("link", { name: /grown.ups/i });
    expect(link).toHaveAttribute("href", "/grownups");
  });

  it("shows all 8 activity cards on hub", () => {
    render(<Playground />);
    const activities = ["Pop!", "Bubbles", "Stickers", "Paint", "Dress Up", "Coloring", "Match", "ABCs"];
    for (const label of activities) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("clicking a card switches to that screen", () => {
    render(<Playground />);
    fireEvent.click(screen.getByText("Pop!"));
    expect(screen.queryByText("Bubbles")).not.toBeInTheDocument();
  });

  it("home button returns to hub", () => {
    render(<Playground />);
    fireEvent.click(screen.getByText("Pop!"));
    // Home button is present on activity screens
    fireEvent.click(screen.getByRole("button", { name: /home/i }));
    expect(screen.getByText("Bubbles")).toBeInTheDocument();
  });
});
