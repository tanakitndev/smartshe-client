import React from "react";

const TextInfo = (props) => {
  return (
    <div className="row">
      <div className="col-md-6">{props.label}</div>
      <div className="col-md-6">{props.text}</div>
    </div>
  );
};

export default TextInfo;
