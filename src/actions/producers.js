import { SET_PRODUCERS, CLEAR_PRODUCERS } from "./types";

export const setProducers = (producers) => ({
    type: SET_PRODUCERS,
    payload: producers,
});

export const clearProducers = () => ({
    type: CLEAR_PRODUCERS,
});
