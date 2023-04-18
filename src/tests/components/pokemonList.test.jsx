import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useGetAllQuery } from "@/api/apiSlice";
import PokemonList from "@/features/pokemon/PokemonList";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../api/apiSlice");

describe("<PokemonList />", () => {
  const mockStore = configureStore([]);
  const initialState = {
    favorites: {
      favorites: [],
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should render correctly", async () => {
    useGetAllQuery.mockReturnValue({
      data: {
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
          },
        ],
      },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>,
    );

    expect(screen.getByText("Lista")).toBeInTheDocument();
    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByTestId("total")).toBeInTheDocument();
    expect(screen.getByTestId("button-loadmore")).toBeInTheDocument();
    const totalLength = screen.getByTestId("total");
    expect(totalLength).toHaveTextContent(`pokémons: 1`);
  });

  it("should render with error", async () => {
    useGetAllQuery.mockReturnValue({
      error: true,
      isLoading: false,
      isFetching: false,
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PokemonList />
        </Provider>
      </BrowserRouter>,
    );

    expect(
      screen.getByText("Oops! Página não encontrada."),
    ).toBeInTheDocument();
  });

  it("should render the favorites tab as disabled if there are no favorites", async () => {
    useGetAllQuery.mockReturnValue({
      data: [{}],
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>,
    );

    expect(screen.getByText("Favoritos")).toBeDisabled();
  });

  it("should calls useGetAllQuery with the expected limit after click the load more button", async () => {
    useGetAllQuery.mockReturnValue({
      data: {
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
          },
          {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/charmander/",
          },
        ],
      },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>,
    );

    const loadMoreButton = screen.getByTestId("button-loadmore");

    expect(useGetAllQuery).toHaveBeenCalledWith(12);

    await waitFor(() => {
      fireEvent.click(loadMoreButton);
    });
    expect(useGetAllQuery).toHaveBeenCalledWith(20);
  });
});
