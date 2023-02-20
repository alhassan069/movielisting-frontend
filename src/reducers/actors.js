import { SET_ACTORS, CLEAR_ACTORS } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ACTORS:
            return { actors: payload };

        case CLEAR_ACTORS:
            return { actors: "" };

        default:
            return state;
    }
}
