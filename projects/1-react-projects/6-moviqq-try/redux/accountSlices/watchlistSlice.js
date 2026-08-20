import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // [{ id, media_type, title, poster_path }]
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.items.some(
        (item) =>
          item.id === action.payload.id &&
          item.media_type === action.payload.media_type
      );
      if (!exists) state.items.push(action.payload);
    },

    removeFromWatchlist: (state, action) => {
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

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export const watchlistSliceReducer = watchlistSlice.reducer;
