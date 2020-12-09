import React from "react";

import Footer from "../../components/Footer/Footer";

import "./NotFound.scss";

function NotFound() {
  return (
    <div className="cont-not-found">
      <div className="text-center w-100">
        <main>
          <h1 className="h1">404</h1>
          <p className="p-0 my-2">Resource not available</p>
          <img
            src={process.env.PUBLIC_URL + "/not-found.png"}
            alt="Not found"
            className="img-fluid w-50"
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default NotFound;
