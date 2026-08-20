import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch movie account states
export const GetMovieAccountStates = createAsyncThunk(
  "GetMovieAccountStates",
  async ({ movieId, sessionId }, { rejectWithValue }) => {
    try {
      if (!sessionId) {
        // Reject immediately if sessionId is null
        return rejectWithValue({ message: "No session ID provided" });
      }

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg",
        },
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/account_states?session_id=${sessionId}`,
        options
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const initialAccountStates = {
  accountMovieStatesDetails: null,
  accountMovieStatesLoading: false,
  accountMovieStatesError: false,
  accountMovieStatesErrorMsg: null, // to store error messages
};

const MovieAccountStatesSlice = createSlice({
  name: "MovieAccountStates",
  initialState: initialAccountStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMovieAccountStates.pending, (state) => {
        state.accountMovieStatesLoading = true;
        state.accountMovieStatesError = false;
        state.accountMovieStatesErrorMsg = null;
      })
      .addCase(GetMovieAccountStates.fulfilled, (state, { payload }) => {
        state.accountMovieStatesDetails = payload;
        state.accountMovieStatesLoading = false;
        state.accountMovieStatesError = false;
      })
      .addCase(GetMovieAccountStates.rejected, (state, { payload }) => {
        state.accountMovieStatesLoading = false;
        state.accountMovieStatesError = true;
        state.accountMovieStatesErrorMsg =
          payload?.message || "Failed to fetch account states";
      });
  },
});

export const MovieAccountStatesReducer = MovieAccountStatesSlice.reducer;
