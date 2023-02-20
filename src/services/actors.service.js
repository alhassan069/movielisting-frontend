import axios from "axios";
import authHeader from "./auth-header";
import HomeApiUrl from "../constants";

const API_URL = HomeApiUrl + "actor/";

const getAllActors = () => {
    return axios.get(API_URL);
};

const getOneActor = (id) => {
    return axios.get(API_URL + id);
};

const postActor = (name, gender, dob, bio, profile_pic) => {
    return axios.post(API_URL, {
        name,
        gender,
        dob,
        bio,
        profile_pic,
    },
        { headers: authHeader() });
};

export default {
    getAllActors,
    getOneActor,
    postActor,
};