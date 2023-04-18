import reducer, { addToFavorites } from "@/features/pokemon/favoriteSlice";

const initialState = { favorites: [] };

describe("addToFavorites reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addToFavorites adding a new pokemon", () => {
    const pokemon = { id: 1, name: "Bulbasaur" };
    const action = addToFavorites(pokemon);
    const nextState = reducer(initialState, action);

    expect(nextState.favorites.length).toEqual(1);
    expect(nextState.favorites[0]).toEqual(pokemon);
  });

  it("should handle addToFavorites removing an existing pokemon", () => {
    const pokemon1 = { id: 1, name: "Bulbasaur" };
    const pokemon2 = { id: 2, name: "Charmander" };
    const state = { favorites: [pokemon1, pokemon2] };
    const action = addToFavorites(pokemon1);
    const nextState = reducer(state, action);

    expect(nextState.favorites.length).toEqual(1);
    expect(nextState.favorites[0]).toEqual(pokemon2);
  });

  it("should handle addToFavorites when pokemon is already in favorites", () => {
    const pokemon1 = { id: 1, name: "Bulbasaur" };
    const pokemon2 = { id: 2, name: "Charmander" };
    const state = { favorites: [pokemon1, pokemon2] };
    const action = addToFavorites(pokemon2);
    const nextState = reducer(state, action);

    expect(nextState.favorites.length).toEqual(1);
    expect(nextState.favorites[0]).toEqual(pokemon1);
  });
});
