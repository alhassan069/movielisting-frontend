import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import UserService from "../services/user.service";
import actorsService from "../services/actors.service";
import producersService from "../services/producers.service";
import moviesService from "../services/movies.service";
import { setMovie, clearMovie } from "../actions/movie";
import { setMovies } from "../actions/movies";
import { setActors } from "../actions/actors";
import { setProducers } from "../actions/producers";
// import { movies } from "../data/movies";

const Home = () => {
  let navigate = useNavigate();
  const { movies } = useSelector((state) => state.movies);
  // const [content, setContent] = useState(movies);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("movies:------", movies);
    actorsService
      .getAllActors()
      .then((response) => {
        console.log("getAllActorsData", response);
        dispatch(setActors(response.data));
      })
      .catch((err) => console.log(err));
    producersService
      .getAllProducers()
      .then((response) => {
        console.log("getAllProducersData", response.data);
        dispatch(setProducers(response.data));
      })
      .catch((err) => console.log("error", err));

    moviesService
      .getAllMovies()
      .then((response) => {
        console.log("getAllMovies:--", response.data);
        dispatch(setMovies(response.data));
      })
      .catch((err) => console.log("error", err));
  }, []);

  const handleClick = (movie) => {
    dispatch(setMovie(movie));
    navigate("/movie");
    // window.location.reload();
  };

  return (
    <div className="container">
      <div className="row">
        {movies &&
          movies.length !== 0 &&
          movies.map((movie, index) => (
            <div
              className="col-sm-4"
              key={movie.name}
              onClick={() => handleClick(movie)}
            >
              <div className="card" style={{ width: "18rem", height: "40rem" }}>
                <img
                  className="card-img-top"
                  src={movie.poster}
                  alt={movie.name + "poster"}
                />
                <div className="card-body">
                  <h5 className="card-title"> {movie.name}</h5>
                  <p
                    className="card-text"
                    style={{
                      height: "12rem",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {" "}
                    {movie.plot}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
