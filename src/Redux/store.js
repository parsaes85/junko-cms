import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./store/authSlice";
import usersReducer from "./store/usersSlice"
import productsReducer from "./store/productsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productsReducer
  },
});

export default store;
