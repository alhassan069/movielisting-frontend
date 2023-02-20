import { SET_MOVIE, CLEAR_MOVIE } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MOVIE:
            return { movie: payload };

        case CLEAR_MOVIE:
            return { movie: "" };

        default:
            return state;
    }
}
