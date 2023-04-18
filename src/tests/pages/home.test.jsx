import { render, screen } from "@testing-library/react";
import { Home } from "@/pages";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

describe("<Home />", () => {
  it("should navigates to list page", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <BrowserRouter>
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: /Ir para a Lista/i });
    expect(link.getAttribute("href")).toBe("/list");

    fireEvent.click(link);

    expect(window.location.pathname).toBe("/list");
  });
});
