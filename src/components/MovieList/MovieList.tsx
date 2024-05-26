import "./index.css";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    RootWatchListItem,
    addMovie,
    removeMovie,
} from "../../store/watchListSlicer";
import {
    fetchMoviesFailure,
    fetchMoviesStart,
    fetchMoviesSuccess,
} from "../../store/movieSlicer";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader/Loader";
import MovieCard from "../MovieCard/MovieCard";
import { RootState } from "../../store/store";
import axios from "axios";

interface MovieListProps {
    movies?: any[];
}

function MovieList(props: MovieListProps) {
    const dispatch = useDispatch();
    const { movies, loading, page, error, searchKey } = useSelector(
        (state: RootState) => state.movies
    );
    const { email } = useSelector((state: RootState) => state.login);
    const { watchList } = useSelector((state: RootState) => state.watchList);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const bottomIntersectRef = React.useRef<HTMLDivElement>(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [stopFetching, setStopFetching] = useState(false);

    const fetchDefaultMovies = useCallback(async () => {
        dispatch(fetchMoviesStart());
        try {
            const response = await axios.get(
                `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API
                }&s=${searchKey}&page=${page + 1}`
            );
            if (response.data.Response === "False") {
                setStopFetching(true);
                dispatch(fetchMoviesFailure(response.data.Response));
            }
            dispatch(
                fetchMoviesSuccess([...movies, ...(response.data?.Search || [])])
            );
        } catch (error: any) {
            dispatch(fetchMoviesFailure(error.message));
            setStopFetching(true);
        }
    }, [dispatch, movies, page, searchKey]);

    const manageBookmark = (id: string) => {
        const movie = movies.find((movie) => movie.imdbID === id);
        const watchListItem = checkIsBookmarked(watchList, id);
        if (watchListItem) {
            dispatch(removeMovie(id));
        } else {
            const value = prompt("Enter the list name", "default");
            if (!value) {
                return;
            }
            dispatch(
                addMovie({
                    listName: value,
                    watchList: {
                        id: movie.imdbID,
                        title: movie.Title,
                        year: movie.Year,
                        image: movie.Poster,
                    },
                    email: email,
                })
            );

            // dispatch(
            //     addMovie({
            //         id: movie.imdbID,
            //         title: movie.Title,
            //         year: movie.Year,
            //         image: movie.Poster,
            //     })
            // );
        }
    };

    useEffect(() => {
        if (props.movies?.length) {
            return;
        }
        if (initialLoad) {
            fetchDefaultMovies();
            setInitialLoad(false);
        }

    }, [fetchDefaultMovies, initialLoad, props.movies?.length]);

    useEffect(() => {
        if (props.movies?.length) {
            return;
        }
        if (movies?.length === 0 && !error && !stopFetching) {
            setInitialLoad(true);
        }
    }, [movies?.length, props.movies?.length, stopFetching]);



    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {

                    if (initialLoad || loading || error || stopFetching) {
                        return;
                    }
                    fetchDefaultMovies();
                }
            },
            {
                root: containerRef.current,
                threshold: 1,
            }
        );

        if (bottomIntersectRef.current) {
            if (props.movies?.length) {
                return;
            }
            observer.observe(bottomIntersectRef.current);
        }

        return () => {
            if (bottomIntersectRef.current) {
                if (props.movies?.length) {
                    return;
                }
                observer.unobserve(bottomIntersectRef.current);
            }
        };
    }, [
        error,
        fetchDefaultMovies,
        initialLoad,
        loading,
        props.movies,
        stopFetching,
    ]);

    useEffect(() => {
        setStopFetching(false);

    }, [movies?.length]);

    function checkIsBookmarked(watchList: RootWatchListItem, id: string) {
        const keys = Object.keys(watchList);
        for (let i = 0; i < keys.length; i++) {
            if (watchList[keys[i]].find((movie) => movie.id === id)) {
                return true;
            }
        }
    }

    const isZeroMovie = useMemo(() => {
        if (props.movies) {
            return props.movies.length === 0;
        } else {
            return movies?.length === 0;
        }
    }, [movies?.length, props.movies]);

    const isCentered = useMemo(() => {
        return (loading && isZeroMovie) || isZeroMovie;
    }, [isZeroMovie, loading]);

    return (
        <div
            className="mm-movielist-container"
            style={{
                alignItems: isCentered ? "center" : "flex-start",
                justifyContent: isCentered ? "center" : "flex-start",
            }}
            ref={containerRef}
        >
            {loading && movies?.length === 0 ? (
                <Loader />
            ) : !isZeroMovie ? (
                (props.movies || movies).map((movie) => (
                    <MovieCard
                        id={movie.imdbID}
                        key={movie.imdbID}
                        title={movie.Title}
                        image={movie.Poster}
                        year={movie.Year}
                        onBookmarkClick={manageBookmark}
                        isBookmarked={checkIsBookmarked(watchList, movie.imdbID)}
                    />
                ))
            ) : (
                <div className="mm-movielist--no-movies">No movies found</div>
            )}

            <div ref={bottomIntersectRef}></div>
        </div>
    );
}

export default MovieList;
