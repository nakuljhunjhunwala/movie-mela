// Slicer for movie state using Redux Toolkit and api call from OMDB API

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MovieState {
  movies: any[];
  loading: boolean;
  error: string;
  page: number;
}

const initialState: MovieState = {
  movies: [],
  loading: true,
  error: "",
  page: 0,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchMoviesStart: (state) => {
      state.loading = true;
    },
    fetchMoviesSuccess: (state, action: PayloadAction<any[]>) => {
      state.movies = action.payload;
      state.loading = false;
      state.error = "";
        state.page += 1;
    },
    fetchMoviesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetMovies: (state) => {
        state.movies = [];
        state.loading = true;
        state.error = "";
        state.page = 0;
    }
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure, resetMovies } =
  movieSlice.actions;

export default movieSlice.reducer;