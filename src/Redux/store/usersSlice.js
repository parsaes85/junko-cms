import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    mainUserInfo: {},
  },
  reducers: {
    setMainUserInfo: (state, action) => {
      state.mainUserInfo = action.payload;
    },
  },
});

export const { setMainUserInfo } = usersSlice.actions;
export default usersSlice.reducer;
