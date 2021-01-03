import React, { useState, useEffect, useCallback } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Footer from "../../components/Footer/Footer";

import "./Search.scss";

function Search({ isAuthenticated, currentUser }) {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [queryString, setQueryString] = useState("");
  const [noResults, setNoResults] = useState(false);

  const history = useHistory();

  const searchMovies = useCallback(async () => {
    if (currentUser.token && queryString) {
      setLoading(true);
      const res = await fetch(
        `/api/movie/search?query=${queryString}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentUser.token,
          },
        }
      ).catch((error) => {
        setLoadingError(error.message);
        setLoading(false);
      });

      const data = await res.json();
      if (data.data) {
        setMovies(data.data.results);
        setPages(data.data.totalPages);
        if (data.data.results.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      } else {
        setLoadingError(data.error);
      }
      setLoading(false);
    }
  }, [currentUser, queryString, page]);

  const handleEmptyInput = useCallback(() => {
    if (input === "") {
      setMovies([]);
      setPages(null);
      setPage(1);
      setQueryString("");
      setNoResults(false);
    }
  }, [input]);

  const getQueryParams = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    if (query) {
      setQueryString(query);
      setInput(query);
    }
  }, []);

  function handleClick() {
    if (input !== "" && input !== queryString) {
      const sanitizedInput = encodeURI(input.trim());
      setQueryString(sanitizedInput);
      history.push(`?query=${sanitizedInput}`);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (input !== "" && input !== queryString) {
        const sanitizedInput = encodeURI(input.trim());
        setQueryString(sanitizedInput);
        history.push(`?query=${sanitizedInput}`);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      let hiderContainers = document.querySelectorAll(".hider-cont");
      if (hiderContainers) {
        hiderContainers.forEach((container) => {
          container.classList.remove("invisible");
        });
      }
    }, 700);
  });

  useEffect(() => {
    searchMovies();
  }, [searchMovies, page]);

  useEffect(() => {
    handleEmptyInput();
  }, [handleEmptyInput, input]);

  useEffect(() => {
    getQueryParams();
  }, [getQueryParams]);

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className="Search">
      <HeaderContainer />

      {/* Search bar */}
      <div className="my-3 p-3 row mx-auto">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control input-search"
              placeholder="Type a movie title..."
              aria-label="Movie to search"
              aria-describedby="button-search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              autoFocus
              spellCheck="false"
              autoCorrect="off"
            />
            <button
              className="btn btn-search"
              type="button"
              id="button-search"
              onClick={handleClick}
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>

      {/* Results box */}
      <div className="my-3 px-3">
        {!loadingError && !loading && movies.length === 0 ? (
          <h5 className="section-title my-0">&nbsp;</h5>
        ) : (
          <h5 className="section-title my-0">Results</h5>
        )}
        <div className="movie-cont my-0 pt-2 pb-3">
          {loadingError && (
            <div className="d-flex justify-content-center align-items-center border rounded m-1 w-100 mx-auto error-cont">
              <div>
                <p className="my-2 text-center">
                  Whoops, something went wrong...
                </p>
                <p className="my-2 text-center">{loadingError}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto loading-cont">
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 16 16"
                className="bi bi-hourglass-split"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"
                />
              </svg>
            </div>
          )}

          {!loadingError &&
            !loading &&
            (movies.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto empty-cont">
                {noResults ? (
                  <p className="p-3 my-0 no-results">
                    Your search returned no results.
                  </p>
                ) : (
                  <p className="p-3 my-0 no-results">
                    The results of your search will appear here.
                  </p>
                )}
              </div>
            ) : (
              <div className="hider-cont invisible">
                <div className="next-prev-cont">
                  <button
                    className="btn-prev"
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 16 16"
                      className="bi bi-arrow-left-circle prev-sign mr-1"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                  </button>
                </div>

                {movies.length > 0 &&
                  movies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="movie-item mx-1"
                    >
                      <img src={movie.poster_path} alt="Movie poster" />
                    </Link>
                  ))}

                {pages > 1 && (
                  <div className="next-prev-cont">
                    <button
                      className="btn-next"
                      type="button"
                      onClick={() => setPage(page + 1)}
                      disabled={page === pages}
                    >
                      <svg
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 16 16"
                        className="bi bi-arrow-right-circle ml-1"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Search;
