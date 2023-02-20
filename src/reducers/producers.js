import { SET_PRODUCERS, CLEAR_PRODUCERS } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PRODUCERS:
            return { producers: payload };

        case CLEAR_PRODUCERS:
            return { producers: "" };

        default:
            return state;
    }
}
