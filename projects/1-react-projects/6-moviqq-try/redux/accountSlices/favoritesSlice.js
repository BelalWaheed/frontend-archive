import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.items.some(
        (item) =>
          item.id === action.payload.id &&
          item.media_type === action.payload.media_type
      );
      if (!exists) state.items.push(action.payload);
    },

    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.media_type === action.payload.media_type
          )
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesSliceReducer = favoritesSlice.reducer;
