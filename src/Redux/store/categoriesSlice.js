import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    mainCategoryInfo: {},
  },
  reducers: {
    setMainCategoryInfo: (state, action) => {
      state.mainCategoryInfo = action.payload;
    },
  },
});

export const { setMainCategoryInfo } = categoriesSlice.actions;
export default categoriesSlice.reducer;
