import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import movie from "./movie";
import movies from "./movies";
import actors from "./actors";
import producers from "./producers";

export default combineReducers({
  auth,
  message,
  movie,
  movies,
  actors,
  producers,
});
