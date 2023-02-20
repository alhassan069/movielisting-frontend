import { SET_MOVIES, CLEAR_MOVIES } from "./types";

export const setMovies = (movies) => ({
    type: SET_MOVIES,
    payload: movies,
});

export const clearMovies = () => ({
    type: CLEAR_MOVIES,
});
