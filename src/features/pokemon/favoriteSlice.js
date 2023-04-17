import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const { id, name, sprites, types } = action.payload;
      const pokemonIndex = state.favorites.findIndex(
        (pokemon) => pokemon.id === action.payload.id,
      );
      if (pokemonIndex < 0) {
        const pokemon = { id, name, sprites, types };
        state.favorites.push(pokemon);
      } else {
        const favoriteItem = state.favorites.filter(
          (item) => item.id !== action.payload.id,
        );
        state.favorites = favoriteItem;
      }
    },
  },
});

export const { addToFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
