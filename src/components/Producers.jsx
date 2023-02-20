import React from "react";
import { useSelector } from "react-redux";

const Producers = () => {
  const { producers } = useSelector((state) => state.producers);
  return (
    <div>
      <div className="m-3">
        <h1>Producers</h1>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th>Photo</th>
            <th scope="col">Name</th>
            <th scope="col">DOB</th>
            <th scope="col">Gender</th>
            <th scope="col">Bio</th>
            <th scope="col">Movies</th>
          </tr>
        </thead>
        <tbody>
          {producers &&
            producers.map((actor, index) => (
              <tr key={actor._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={actor.profile_pic}
                    alt={actor.name + "photo"}
                    height={100}
                  />
                </td>
                <td>{actor.name}</td>
                <td>{actor.dob}</td>
                <td>{actor.gender}</td>
                <td>{actor.bio}</td>
                <td>
                  {actor.movies.map((movie) => (
                    <span key={movie._id}>{movie.name + ", "}</span>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Producers;
