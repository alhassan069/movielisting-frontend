import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import actorsService from "../services/actors.service";
import producersService from "../services/producers.service";
import { useDispatch, useSelector } from "react-redux";
import { setActors } from "../actions/actors";
import { setProducers } from "../actions/producers";
import moviesService from "../services/movies.service";

const AddActor = (props) => {
  console.log("props", props.type);
  const dispatch = useDispatch();
  const [actorName, setActorName] = useState("");
  const [actorProfilePic, setActorProfilePic] = useState("");
  const [selectedActorGender, setSelectedActorGender] = useState("");
  const [actorDob, setActorDob] = useState("2023-01-01");
  const [actorBio, setActorBio] = useState("");

  const handleSelectActorGender = (data) => {
    setSelectedActorGender(data);
  };
  const handleSubmitActor = (e) => {
    e.preventDefault();
    if (props.type === "actor") {
      actorsService
        .postActor(
          actorName,
          selectedActorGender["value"],
          actorDob,
          actorBio,
          actorProfilePic
        )
        .then((data) => {
          clearForms();
          console.log("data", data);
          getAllActorsApi();
        })
        .catch((err) => console.log("error", err));
    } else if (props.type === "producer") {
      producersService
        .postProducer(
          actorName,
          selectedActorGender["value"],
          actorDob,
          actorBio,
          actorProfilePic
        )
        .then((data) => {
          console.log("data", data);
          clearForms();
          getAllProducersApi();
        })
        .catch((err) => console.log("error", err));
    }
  };
  const getAllActorsApi = () => {
    actorsService
      .getAllActors()
      .then((response) => {
        console.log("getAllActorsData", response);
        dispatch(setActors(response.data));
      })
      .catch((err) => console.log(err));
  };
  const getAllProducersApi = () => {
    producersService
      .getAllProducers()
      .then((response) => {
        console.log("getAllProducersData", response);
        dispatch(setProducers(response.data));
      })
      .catch((err) => console.log(err));
  };
  const clearForms = () => {
    setActorName("");
    setActorProfilePic("");
    setSelectedActorGender("");
    setActorDob("2023-01-01");
    setActorBio("");
  };
  return (
    <div
      className="col-4 mx-5 bg-dark text-secondary"
      md={{ span: 6, offset: 2 }}
    >
      <h3 className="text-secondary">{props.type.toUpperCase()}</h3>
      <form onSubmit={handleSubmitActor}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            className="col-xs-4"
            type="text"
            placeholder="Name"
            onChange={(e) => setActorName(e.target.value)}
            value={actorName}
          />
        </div>
        <div className="form-group mb-3">
          <label>Gender</label>
          <Select
            className="col-xs-4"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "others", label: "Others" },
            ]}
            placeholder="Select Gender"
            value={selectedActorGender}
            onChange={handleSelectActorGender}
          />
        </div>

        <div className="form-group mb-3">
          <label>Date of Birth</label>
          <input
            className="col-xs-4"
            type="date"
            value={actorDob}
            onChange={(e) => setActorDob(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Profile Pic URL</label>
          <input
            className="col-xs-4"
            type="text"
            placeholder="Profile Pic URL"
            onChange={(e) => setActorProfilePic(e.target.value)}
            value={actorProfilePic}
          />
        </div>

        <div className="form-group mb-3">
          <label>Bio</label>
          <textarea
            className="col-xs-4"
            rows="5"
            cols="40"
            placeholder="Bio"
            value={actorBio}
            onChange={(e) => setActorBio(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const CreatePage = () => {
  const backendurl = "http://localhost:5000";
  const [type, setType] = useState("movie");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [plot, setPlot] = useState("");
  const [alert, setAlert] = useState("");

  const [selectedActors, setSelectedActors] = useState();
  const [selectedProducer, setSelectedProducer] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    actorsService
      .getAllActors()
      .then((response) => {
        console.log("getAllActorsData", response);
        dispatch(setActors(response.data));
      })
      .catch((err) => console.log(err));
    producersService.getAllProducers().then((response) => {
      console.log("getAllProducersData", response);
      dispatch(setProducers(response.data));
    });
  }, []);
  const { actors } = useSelector((state) => state.actors);
  const { producers } = useSelector((state) => state.producers);
  console.log("All actors", actors);
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

  console.log("actors producers List", actorsList, producersList);
  const handleSelectActors = (data) => {
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(data);
    setSelectedActors(data);
  };
  const handleSelectProducer = (data) => {
    setSelectedProducer(data);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const clearForms = () => {
    setTitle("");
    setYear("");
    setPoster("");
    setPlot("");
    setSelectedActors([]);
    setSelectedProducer([]);
    setType("movie");
  };
  const handleAlert = (e) => {
    if (e === "success") {
      setAlert("success");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    } else if (e === "failed") {
      setAlert("failed");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    }
  };
  const handleSubmit = (event) => {
    console.log(selectedActors);
    event.preventDefault();
    const actorsArr = selectedActors.map((e) => e.value);
    console.log("ActorsArr", actorsArr);
    moviesService
      .postMovie(title, year, plot, poster, actorsArr, selectedProducer.value)
      .then((response) => {
        console.log("full response", response);
        console.log("response ka data", response.data);
        if (response.status === 201) {
          clearForms();
          handleAlert("success");
        }
      })
      .catch((error) => {
        handleAlert("failed");
        console.log("There was an error!", error);
      });
  };
  return (
    <div>
      <div className="container">
        {alert === "success" && (
          <div className="row">
            <div className="col" sm={{ span: 4, offset: 4 }}>
              <div
                className="alert alert-success"
                role="alert"
                onClose={() => setAlert("")}
                dismissible
              >
                Successfully Added the entry.
              </div>
            </div>
          </div>
        )}
        {alert === "failed" && (
          <div className="row">
            <div className="col" sm={{ span: 4, offset: 4 }}>
              <div
                className="alert alert-danger"
                role="alert"
                onClose={() => setAlert("")}
                dismissible
              >
                Oh snap! You got an error!
              </div>
            </div>
          </div>
        )}
        <div className="row bg-dark">
          <div className="col-12">
            <button
              className={
                type === "movie"
                  ? "btn btn-primary m-2"
                  : "btn btn-secondary m-2"
              }
              onClick={() => setType("movie")}
            >
              Add Movie
            </button>
            <button
              className={
                type === "actor"
                  ? "btn btn-primary m-2"
                  : "btn btn-secondary m-2"
              }
              onClick={() => setType("actor")}
            >
              Add Actor
            </button>
            <button
              className={
                type === "producer"
                  ? "btn btn-primary m-2"
                  : "btn btn-secondary m-2"
              }
              onClick={() => setType("producer")}
            >
              Add Producer
            </button>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-4 bg-danger" md={{ span: 6, offset: 2 }}>
            <form>
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
                <label>{"Poster"}</label>
                <input
                  className="col-xs-4"
                  type="text"
                  value={poster}
                  placeholder="Poster URL"
                  onChange={(e) => setPoster(e.target.value)}
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

              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
          {type === "actor" && <AddActor type="actor" />}
          {type === "producer" && <AddActor type="producer" />}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
