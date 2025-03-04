import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="card">
      <div className="loader">
        <p>loading</p>
        <div className="words">
          <span className="word">Processing</span>
          <span className="word">Happiness</span>
          <span className="word">Work</span>
          <span className="word">Task</span>
          <span className="word">Relief</span>
        </div>
      </div>
    </div>
    
  );
};

export default Spinner;
