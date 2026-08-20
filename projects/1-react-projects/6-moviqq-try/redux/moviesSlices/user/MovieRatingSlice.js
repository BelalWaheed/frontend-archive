import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddMovieRating = createAsyncThunk(
  "AddMovieRating",
  async ({ movieId, sessionId, rate }, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg",
        },
        body: JSON.stringify({ value: rate }),
      };

      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`,
        options
      );

      const response = await request.json();

      if (response.success === false) {
        return rejectWithValue(response);
      }

      return response;
    } catch (e) {
      return rejectWithValue({ success: false, message: e.message });
    }
  }
);

const initialMovieRatingState = {
  movieRatingDetails: null,
  movieRatingLoading: false,
  movieRatingError: false,
  isRated: false,
};

const MovieRatingSlice = createSlice({
  name: "MovieRating",
  initialState: initialMovieRatingState,
  extraReducers: (builder) => {
    builder.addCase(AddMovieRating.pending, (state) => {
      state.movieRatingLoading = true;
      state.movieRatingError = false;
    });
    builder.addCase(AddMovieRating.fulfilled, (state, { payload }) => {
      state.movieRatingDetails = payload;
      state.isRated = true;
      state.movieRatingLoading = false;
    });
    builder.addCase(AddMovieRating.rejected, (state) => {
      state.movieRatingError = true;
      state.movieRatingLoading = false;
    });
  },
});

export const MovieRatingReducer = MovieRatingSlice.reducer;
