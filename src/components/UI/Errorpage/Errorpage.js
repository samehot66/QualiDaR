import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage = (props) => {
  return (
    <div>
      <section className="content-header"></section>
      <section className="content">
        <div className="error-page">
        <h2 className="headline text-red">500</h2>
          <div className="error-content">
            <br />
            <h3>
              <i className="fas fa-exclamation-triangle text-red" /> Oops!
              Something went wrong.
            </h3>
            <p>
              [Error] Invalid Session
              <br />
              Try to <NavLink to="/">Login</NavLink> again.
            </p>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Errorpage;
