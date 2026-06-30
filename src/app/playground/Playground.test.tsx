import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
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

  it("clicking a card switches to that screen", async () => {
    vi.useFakeTimers();
    try {
      render(<Playground />);
      fireEvent.click(screen.getByText("Pop!"));
      await act(async () => { vi.advanceTimersByTime(400); });
      expect(screen.queryByText("Bubbles")).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("home button returns to hub", async () => {
    vi.useFakeTimers();
    try {
      render(<Playground />);
      fireEvent.click(screen.getByText("Pop!"));
      // Advance past the full 950ms transition so `transition` state clears
      // before we click home (guard prevents re-entry while active)
      await act(async () => { vi.advanceTimersByTime(960); });
      // Home button is present on activity screens
      fireEvent.click(screen.getByRole("button", { name: /home/i }));
      await act(async () => { vi.advanceTimersByTime(400); });
      expect(screen.getByText("Bubbles")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
