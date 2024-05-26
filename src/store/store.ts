import { configureStore } from "@reduxjs/toolkit";
import loginSlicer from "./loginSlicer";
import movieSlicer from "./movieSlicer";
import watchListSlicer from "./watchListSlicer";

const store = configureStore({
    reducer: {
        login: loginSlicer,
        movies: movieSlicer,
        watchList: watchListSlicer,
    },
});
export type RootState = ReturnType<typeof store.getState>
export default store;