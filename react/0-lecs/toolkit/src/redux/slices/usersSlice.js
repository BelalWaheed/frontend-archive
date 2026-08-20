import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    name: "",
    email: "",
    password: "",
    role: "user",
  },
  errors: {},
};

const UsersSlice = createSlice({
  name: "users",
  initialState, //
  reducers: {},
});

export const {} = UsersSlice.actions;
export const users = UsersSlice.reducer;
