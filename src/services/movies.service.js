import axios from "axios";
import authHeader from "./auth-header";
import HomeApiUrl from "../constants";

const API_URL = HomeApiUrl + "movie/";

const getAllMovies = () => {
  return axios.get(API_URL);
};

const getOneMovie = (id) => {
  return axios.get(API_URL + id);
};

const postMovie = (name, release_year, plot, poster, actors, producer) => {
  return axios.post(API_URL, {
    name,
    release_year,
    plot,
    poster,
    actors,
    producer
  },
    { headers: authHeader() });
};
const updateMovie = (id, name, release_year, plot, poster, actors, producer) => {
  return axios.post(API_URL + "update/" + id, {
    id,
    name,
    release_year,
    plot,
    poster,
    actors,
    producer
  },
    { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getAllMovies,
  getOneMovie,
  postMovie,
  updateMovie,
  getAdminBoard,
};