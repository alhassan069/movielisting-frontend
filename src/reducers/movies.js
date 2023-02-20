import { SET_MOVIES, CLEAR_MOVIES } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MOVIES:
            return { movies: payload };

        case CLEAR_MOVIES:
            return { movies: "" };

        default:
            return state;
    }
}
