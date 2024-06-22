import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import wishlistReducer from "./slices/wishlist-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
