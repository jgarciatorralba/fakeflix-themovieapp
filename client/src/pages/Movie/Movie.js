import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import MovieTrailers from "../../components/MovieTrailers/MovieTrailers";
import Comments from "../../components/Comments/Comments";
import Footer from "../../components/Footer/Footer";

import "./Movie.scss";

function Movie({
  isAuthenticated,
  movieDetailsLoading,
  movieDetailsLoadingError,
  movieDetails,
  fetchMovieDetails,

  favouriteMovies,
  favouritesLoading,
  fetchFavourites,
  addFavourite,
  removeFavourite,
  favouriteUpdating,
  favouriteUpdatingError,
  favouriteAdded,
  favouriteRemoved,

  likes,
  likesLoading,
  fetchLikes,
  addLike,
  removeLike,
  likeUpdating,
  likeUpdatingError,
  likeAdded,
  likeRemoved,

  dislikes,
  dislikesLoading,
  fetchDislikes,
  addDislike,
  removeDislike,
  dislikeUpdating,
  dislikeUpdatingError,
  dislikeAdded,
  dislikeRemoved,

  movieTrailers,
  movieTrailersLoading,
  movieTrailersLoadingError,
  fetchMovieTrailers,

  comments,
  commentsLoading,
  commentsLoadingError,
  fetchComments,
  addComment,
  removeComment,
  commentUpdating,
  commentUpdatingError,
  commentAdded,
  commentRemoved,
  currentUser,
  defaultAvatar,
}) {
  let { movie_id } = useParams();

  useEffect(() => {
    fetchMovieDetails(movie_id);
    fetchFavourites();
    fetchLikes(movie_id);
    fetchDislikes(movie_id);
    fetchMovieTrailers(movie_id);
    fetchComments(movie_id);
  }, [
    fetchMovieDetails,
    fetchFavourites,
    fetchLikes,
    fetchDislikes,
    fetchMovieTrailers,
    fetchComments,
    movie_id,
  ]);

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className="Movie">
      <HeaderContainer />
      <MovieDetails
        details={movieDetails}
        loading={movieDetailsLoading}
        loadingError={movieDetailsLoadingError}
        favourites={favouriteMovies}
        favouritesLoading={favouritesLoading}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
        favouriteUpdating={favouriteUpdating}
        favouriteUpdatingError={favouriteUpdatingError}
        favouriteAdded={favouriteAdded}
        favouriteRemoved={favouriteRemoved}
        likes={likes}
        likesLoading={likesLoading}
        addLike={addLike}
        removeLike={removeLike}
        likeUpdating={likeUpdating}
        likeUpdatingError={likeUpdatingError}
        likeAdded={likeAdded}
        likeRemoved={likeRemoved}
        dislikes={dislikes}
        dislikesLoading={dislikesLoading}
        addDislike={addDislike}
        removeDislike={removeDislike}
        dislikeUpdating={dislikeUpdating}
        dislikeUpdatingError={dislikeUpdatingError}
        dislikeAdded={dislikeAdded}
        dislikeRemoved={dislikeRemoved}
      />
      <MovieTrailers
        movieTrailers={movieTrailers}
        movieTrailersLoading={movieTrailersLoading}
        movieTrailersLoadingError={movieTrailersLoadingError}
      />
      <Comments
        movieId={movie_id}
        movieComments={comments}
        commentsLoading={commentsLoading}
        commentsLoadingError={commentsLoadingError}
        addComment={addComment}
        removeComment={removeComment}
        commentUpdating={commentUpdating}
        commentUpdatingError={commentUpdatingError}
        commentAdded={commentAdded}
        commentRemoved={commentRemoved}
        currentUser={currentUser}
        defaultAvatar={defaultAvatar}
      />
      <Footer />
    </div>
  );
}

export default Movie;
