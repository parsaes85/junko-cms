import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    mainProductInfo: {},
  },
  reducers: {
    setMainProductInfo: (state, action) => {
      state.mainProductInfo = action.payload;
    },
  },
});

export const { setMainProductInfo } = productsSlice.actions;
export default productsSlice.reducer;
