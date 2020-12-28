import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Footer from "../../components/Footer/Footer";

import "./Search.scss";

function Search({ isAuthenticated, currentUser }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  console.log(movies);
  console.log(pages);

  async function handleSearch() {
    if (search !== "") {
      const query = encodeURI(search.toLowerCase());

      setLoading(true);
      const res = await fetch(`/api/movie/search?query=${query}&page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser.token,
        },
      }).catch((error) => {
        setLoadingError(error.message);
        setLoading(false);
      });

      const data = await res.json();
      setMovies(data.data.results);
      setPages(data.data.totalPages);
      setLoading(false);
    }
  }

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-search"
              type="button"
              id="button-search"
              onClick={handleSearch}
            >
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
