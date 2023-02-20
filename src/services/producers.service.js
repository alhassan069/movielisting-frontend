import axios from "axios";
import authHeader from "./auth-header";
import HomeApiUrl from "../constants";


const API_URL = HomeApiUrl + "producer/";

const getAllProducers = () => {
    return axios.get(API_URL);
};

const getOneProducer = (id) => {
    return axios.get(API_URL + id);
};

const postProducer = (name, gender, dob, bio, profile_pic) => {
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
    getAllProducers,
    getOneProducer,
    postProducer,
};