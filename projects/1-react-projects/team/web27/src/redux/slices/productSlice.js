import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("/products", async (i, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const req = await fetch("https://fakestoreapi.com/products");
    const res = await req.json();

    return res;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const initialState = {
  stock: [],
  stockLoading: true,
  stockError: null,
};

const products = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state, action) => {
      state.stockLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.stockLoading = false;
      state.stock = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.stockLoading = false;
      state.stockError = action.payload;
    });
  },
});

export const stock = products.reducer;
