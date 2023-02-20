import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moviesService from "../services/movies.service";
import { setMovie, clearMovie } from "../actions/movie";
import Modal from "react-modal";

const EditMovie = ({ movie }) => {
  console.log("movies got talent:", movie);
  const initialSelectedActors = movie.actors.map((actor) => {
    return { value: actor._id, label: actor.name };
  });
  const initialSelectedProducer = {
    value: movie.producer._id,
    label: movie.producer.name,
  };
  const dispatch = useDispatch();
  const { actors } = useSelector((state) => state.actors);
  const { producers } = useSelector((state) => state.producers);
  const [id, setId] = useState(movie._id);
  const [title, setTitle] = useState(movie.name);
  const [year, setYear] = useState(movie.release_year);
  const [poster, setPoster] = useState(movie.poster);
  const [plot, setPlot] = useState(movie.plot);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedActors, setSelectedActors] = useState(initialSelectedActors);
  const [selectedProducer, setSelectedProducer] = useState(
    initialSelectedProducer
  );

  const actorsList =
    actors &&
    actors.map((item) => {
      return { value: item._id, label: item.name };
    });
  const producersList =
    producers &&
    producers.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
  const handleSelectActors = (data) => {
    setSelectedActors(data);
  };
  const handleSelectProducer = (data) => {
    setSelectedProducer(data);
  };
  const clearForms = () => {
    setTitle("");
    setYear("");
    setPoster("");
    setPlot("");
    setSelectedActors([]);
    setSelectedProducer([]);
  };
  const handleSubmit = (event) => {
    console.log(selectedActors);
    event.preventDefault();
    const actorsArr = selectedActors.map((e) => e.value);
    console.log("ActorsArr", actorsArr);
    moviesService
      .updateMovie(
        id,
        title,
        year,
        plot,
        poster,
        actorsArr,
        selectedProducer.value
      )
      .then((response) => {
        console.log("full response", response);
        console.log("response ka data", response.data);
        if (response.status === 201) {
          dispatch(setMovie(response.data));
          clearForms();
          handleAlert("success");
        }
      })
      .catch((error) => {
        handleAlert("failed");
        console.log("There was an error!", error);
      });
  };
  const handleAlert = (message) => {
    setAlertMessage(message);
    setAlert(true);
    setTimeout(() => {
      setAlertMessage("");
      setAlert(false);
    }, 3000);
  };
  return (
    <div className="container mt-1">
      <div className="" md={{ span: 6, offset: 2 }}>
        <form>
          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <label>Title</label>
                <input
                  className="col-xs-4"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>

              <div className="form-group mb-3">
                <label>YEAR</label>
                <input
                  className="col-xs-4"
                  type="number"
                  placeholder="YYYY"
                  min="2017"
                  max="2100"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>{"Poster"}</label>
                <input
                  className="col-xs-4"
                  type="text"
                  value={poster}
                  placeholder="Poster URL"
                  onChange={(e) => setPoster(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-3">
                <label>{"Actor(s)"}</label>
                <Select
                  className="col-xs-4"
                  options={actorsList}
                  placeholder="Select Actors"
                  value={selectedActors}
                  onChange={handleSelectActors}
                  isSearchable={true}
                  isMulti
                />
              </div>
              <div className="form-group mb-3">
                <label>{"Producer"}</label>
                <Select
                  className="col-xs-4"
                  options={producersList}
                  placeholder="Select Producer"
                  value={selectedProducer}
                  onChange={handleSelectProducer}
                  isSearchable={true}
                />
              </div>

              <div className="form-group mb-3">
                <label>Plot</label>
                <textarea
                  className="col-xs-4"
                  rows="5"
                  cols="40"
                  placeholder="Plot"
                  value={plot}
                  onChange={(e) => setPlot(e.target.value)}
                ></textarea>
              </div>

              <button
                className={
                  alertMessage == "success"
                    ? "btn btn-success"
                    : "btn btn-primary"
                }
                onClick={handleSubmit}
              >
                {alert ? alertMessage : "submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Movie = () => {
  const { movie } = useSelector((state) => state.movie);
  const [loading, setLoading] = useState(false);
  const [editMovie, setEditMovie] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setLoading(true);
    dispatch(clearMovie());
    navigate("/home");
    // window.location.reload();
  };
  const handleEditMovie = () => {
    console.log("edit");
  };
  const closeModal = () => {
    setEditMovie(false);
  };
  return (
    <div className="container zindex-fixed bg-dark">
      <button
        type="button"
        className="close mt-1"
        style={{ color: "white" }}
        aria-label="Close"
        onClick={handleClick}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <Modal
        isOpen={editMovie}
        ariaHideApp={false}
        onRequestClose={closeModal}
        contentLabel="Edit Movie Modal"
      >
        <div className="float-right mb-2">
          <button
            type="button"
            className="mx-5 mt-1 btn btn-danger"
            aria-label="Close"
            onClick={closeModal}
          >
            <span aria-hidden="true">Close&times;</span>
          </button>
        </div>

        <EditMovie movie={movie} editMovie={editMovie} />
      </Modal>

      <div className="row">
        <div className="col-4">
          <div className="col-sm-4">
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img
                className="card-img-top"
                src={movie.poster}
                alt={movie.name + "poster"}
              />
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card" style={{ height: "25rem" }}>
            <button
              type="button"
              className="btn btn-primary"
              aria-label="Edit"
              onClick={() => {
                setEditMovie(!editMovie);
              }}
            >
              {" "}
              Edit Movie
            </button>
            <div className="card-body">
              <h5 className="card-title"> {movie.name}</h5>
              <h5 className="card-title"> {movie.release_year}</h5>

              <span>
                {"Actors: "}
                {movie.actors.map((actor) => {
                  return <span key={actor.name}>{actor.name + " "}</span>;
                })}
              </span>
              <p>
                {"Producer: "}
                {movie.producer.name}
              </p>
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
      </div>
    </div>
  );
};

export default Movie;
