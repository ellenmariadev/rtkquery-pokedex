import reducer, { addToFavorites } from "@/features/pokemon/favoriteSlice";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a new favorite to localStorage", () => {
    const singlePokemon = { id: 1, name: "Bulbasaur" };
    const key = "favorites";
    const value = [];
    const [getFavorites, setFavorites] = useLocalStorage(key, value);

    expect(getFavorites()).toEqual([]);

    setFavorites([singlePokemon]);
    expect(getFavorites()).toEqual([singlePokemon]);

    const action = addToFavorites({ id: 2, name: "Ivysaur" });
    const nextState = reducer({ favorites: [singlePokemon] }, action);

    expect(nextState.favorites).toEqual([
      singlePokemon,
      { id: 2, name: "Ivysaur" },
    ]);

    const storageContent = JSON.parse(localStorage.getItem(key));
    expect(storageContent).toEqual(nextState.favorites);
  });

  it("removes a favorite from localStorage", () => {
    const singlePokemon = { id: 1, name: "Bulbasaur" };
    const anotherPokemon = { id: 2, name: "Ivysaur" };
    const key = "favorites";
    const value = [singlePokemon, anotherPokemon];
    const [getFavorites, setFavorites] = useLocalStorage(key, value);

    expect(getFavorites()).toEqual([singlePokemon, anotherPokemon]);

    const action = addToFavorites(singlePokemon);
    const nextState = reducer({ favorites: value }, action);

    expect(nextState.favorites).toEqual([anotherPokemon]);
    setFavorites(nextState.favorites);
    expect(getFavorites()).toEqual([anotherPokemon]);
  });
});
