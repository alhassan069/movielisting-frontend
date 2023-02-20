import { SET_ACTORS, CLEAR_ACTORS } from "./types";

export const setActors = (actors) => ({
    type: SET_ACTORS,
    payload: actors,
});

export const clearActors = () => ({
    type: CLEAR_ACTORS,
});
