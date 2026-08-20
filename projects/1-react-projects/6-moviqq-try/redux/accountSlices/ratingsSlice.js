import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratings: [],
  /*
    {
      id,
      media_type,
      rating: 1–10
    }
  */
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRating: (state, action) => {
      const { id, media_type, rating } = action.payload;

      const existing = state.ratings.find(
        (item) => item.id === id && item.media_type === media_type
      );

      if (existing) {
        existing.rating = rating; // update
      } else {
        state.ratings.push({ id, media_type, rating }); // add new
      }
    },

    removeRating: (state, action) => {
      state.ratings = state.ratings.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.media_type === action.payload.media_type
          )
      );
    },
  },
});

export const { setRating, removeRating } = ratingsSlice.actions;
export const ratingsSliceReducer = ratingsSlice.reducer;
