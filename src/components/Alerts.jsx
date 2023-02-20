import React from "react";

const Alerts = (props) => {
  return (
    <div
      className="notification"
      style={
        props.message == "success"
          ? { backgroundColor: "green" }
          : { backgroundColor: "red" }
      }
    >
      {props.message}
    </div>
  );
};

export default Alerts;
