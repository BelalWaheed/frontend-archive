import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  },
  allUsers: [{}],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, { payload }) => {
      state.allUsers = payload;
    },
    
    setName: (state, { payload }) => {
      state.user.name = payload;
    },
    setGender: (state, { payload }) => {
      state.user.gender = payload;
    },
    setEmail: (state, { payload }) => {
      state.user.email = payload;
    },
    setPassword: (state, { payload }) => {
      state.user.password = payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const user = userSlice.reducer;
export const {
  setEmail,
  setName,
  setPassword,
  setAllUsers,
  setGender,
  resetUser,
} = userSlice.actions;










https://api.jsonbin.io/v3/b/686feb026063391d31aafa1a

fetch("https://api.jsonbin.io/v3/b/686feb026063391d31aafa1a/latest", {
  headers: {
    "X-Master-Key": "$2a$10$U1u/Kb8s7pHnoi/ADPrFWuYbmp0n/CYg2YjjGKbSdYFjJA1087MEG"
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
