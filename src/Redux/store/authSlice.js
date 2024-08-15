import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userInfos: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userInfos = action.payload.userInfos;
    },
    logout: (state) => {
      state.isLoggedIn = false,
      state.userInfos = {}
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
