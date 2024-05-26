// Slicer for movie state using Redux Toolkit and api call from OMDB API

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MovieState {
  movies: any[];
  loading: boolean;
  error: string;
  page: number;
  searchKey: string;
}

const initialState: MovieState = {
  movies: [],
  loading: true,
  error: "",
  page: 0,
  searchKey: "marvel",
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
      state.searchKey = "";
    },
    resetMovies: (state) => {
        state.movies = [];
        state.loading = true;
        state.error = "";
        state.page = 0;
        state.searchKey = "marvel";
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
        state.searchKey = action.payload;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure, resetMovies, setSearchKey } =
  movieSlice.actions;

export default movieSlice.reducer;