import { createSlice } from "@reduxjs/toolkit";

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    mainBlogInfo: {},
  },
  reducers: {
    setMainBlogInfo: (state, action) => {
      state.mainBlogInfo = action.payload;
    },
  },
});

export const { setMainBlogInfo } = blogsSlice.actions;
export default blogsSlice.reducer;
