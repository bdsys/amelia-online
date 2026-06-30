import { render, screen } from "@testing-library/react";
import Home from "./page";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) =>
    <a href={href}>{children}</a>,
}));

describe("playground home page", () => {
  it("renders the hub with a grown-ups link", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /grown.ups/i });
    expect(link).toHaveAttribute("href", "/grownups");
  });

  it("renders an avatar image", () => {
    render(<Home />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
