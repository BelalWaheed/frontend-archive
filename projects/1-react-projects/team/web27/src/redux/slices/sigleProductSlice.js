import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getSingleProduct = createAsyncThunk(
  "/:productID",
  async (i, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const req = await fetch("https://fakestoreapi.com/products/1");
      const res = await req.json();

      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState = {
  productInfo: null,
  productInfoLoading: true,
  productInfoError: null,
};

const singleProduct = createSlice({
  name: "single-product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSingleProduct.pending, () => {});
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {});
    builder.addCase(getSingleProduct.pending, () => {});
  },
});
