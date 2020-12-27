import React from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Footer from "../../components/Footer/Footer";

import "./Search.scss";

function Search({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className="Search">
      <HeaderContainer />

      <div className="my-3 p-3 row mx-auto">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control input-search"
              placeholder="Type a movie name..."
              aria-label="Movie to search"
              aria-describedby="button-search"
            />
            <button className="btn btn-search" type="button" id="button-search">
              Search
            </button>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>

      <Footer />
    </div>
  );
}

export default Search;
