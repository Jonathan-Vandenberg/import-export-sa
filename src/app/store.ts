import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "../components/decor/slices/detailsSlice";
import pageReducer from "../components/decor/slices/pageSlice";
import categoryReducer from "../components/decor/slices/categorySlice";

export const store = configureStore({
  reducer: {
    details: detailsReducer,
    page: pageReducer,
    category: categoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
