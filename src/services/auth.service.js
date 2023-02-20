import axios from "axios";
import HomeApiUrl from "../constants";

const API_URL = HomeApiUrl;

const register = (name, email, password) => {
  console.log("payload", name, email, password)
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response.data)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
