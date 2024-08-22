import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./store/authSlice";
import usersReducer from "./store/usersSlice"
import productsReducer from "./store/productsSlice"
import blogsReducer from "./store/blogsSlice"
import categoriesReducer from "./store/categoriesSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
    blogs: blogsReducer,
    categories: categoriesReducer,
  },
});

export default store;
