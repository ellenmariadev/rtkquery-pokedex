import { render, screen } from "@testing-library/react";
import { List } from "@/pages";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/app/store";

describe("<List />", () => {
  it("should navigates to homepage", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <List />
        </Provider>
      </BrowserRouter>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/");

    fireEvent.click(link);

    expect(window.location.pathname).toBe("/");
  });
});
