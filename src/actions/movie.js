import { SET_MOVIE, CLEAR_MOVIE } from "./types";

export const setMovie = (movie) => ({
    type: SET_MOVIE,
    payload: movie,
});

export const clearMovie = () => ({
    type: CLEAR_MOVIE,
});
