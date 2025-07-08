import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./features/alertSlice";
import authModalReducer from "./features/authModalSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    authModal: authModalReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
