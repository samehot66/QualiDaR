import React from "react";

const Errorpage = (props) => {
  return (
    <div>
      <section className="content-header"></section>
      <section className="content">
        <div className="error-page">
          <h2 className="headline text-warning"> 404</h2>
          <div className="error-content">
            <br />
            <h3>
              <i className="fas fa-exclamation-triangle text-warning" /> Oops!
              Page not found.
            </h3>
            <p>
              We could not find the page you were looking for.
              <br />
              Try again later.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Errorpage;
