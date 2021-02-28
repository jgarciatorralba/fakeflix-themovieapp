import { connect } from "react-redux";

import {
  fetchMovieDetails,
  fetchFavourites,
  addFavourite,
  removeFavourite,
  fetchLikes,
  addLike,
  removeLike,
  fetchDislikes,
  addDislike,
  removeDislike,
  fetchMovieTrailers,
  fetchComments,
  addComment,
  removeComment,
} from "../../movies/movies-actions";

import Movie from "../../../pages/Movie/Movie";

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  movieDetailsLoading: state.movies.movieDetailsLoading,
  movieDetailsLoadingError: state.movies.movieDetailsLoadingError,
  movieDetailsFetched: state.movies.movieDetailsFetched,
  movieDetails: state.movies.movieDetails,

  favouriteMovies: state.movies.favouriteMovies,
  favouritesLoading: state.movies.favouritesLoading,
  favouriteUpdating: state.movies.favouriteUpdating,
  favouriteUpdatingError: state.movies.favouriteUpdatingError,
  favouriteAdded: state.movies.favouriteAdded,
  favouriteRemoved: state.movies.favouriteRemoved,

  likes: state.movies.likes,
  likesLoading: state.movies.likesLoading,
  likesLoadingError: state.movies.likesLoadingError,
  likeUpdating: state.movies.likeUpdating,
  likeUpdatingError: state.movies.likeUpdatingError,
  likeAdded: state.movies.likeAdded,
  likeRemoved: state.movies.likeRemoved,

  dislikes: state.movies.dislikes,
  dislikesLoading: state.movies.dislikesLoading,
  dislikesLoadingError: state.movies.dislikesLoadingError,
  dislikeUpdating: state.movies.dislikeUpdating,
  dislikeUpdatingError: state.movies.dislikeUpdatingError,
  dislikeAdded: state.movies.dislikeAdded,
  dislikeRemoved: state.movies.dislikeRemoved,

  movieTrailersLoading: state.movies.movieTrailersLoading,
  movieTrailersLoadingError: state.movies.movieTrailersLoadingError,
  movieTrailersFetched: state.movies.movieTrailersFetched,
  movieTrailers: state.movies.movieTrailers,

  comments: state.movies.comments,
  commentsLoading: state.movies.commentsLoading,
  commentsLoadingError: state.movies.commentsLoadingError,
  commentUpdating: state.movies.commentUpdating,
  commentUpdatingError: state.movies.commentUpdatingError,
  commentAdded: state.movies.commentAdded,
  commentRemoved: state.movies.commentRemoved,
  currentUser: state.user.currentUser,
  defaultAvatar: state.user.defaultAvatar,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieDetails: (movie_id) => dispatch(fetchMovieDetails(movie_id)),

  fetchFavourites: (movie_id) => dispatch(fetchFavourites(movie_id)),
  addFavourite: (movie_id) => dispatch(addFavourite(movie_id)),
  removeFavourite: (movie_id) => dispatch(removeFavourite(movie_id)),

  fetchLikes: (movie_id) => dispatch(fetchLikes(movie_id)),
  addLike: (movie_id) => dispatch(addLike(movie_id)),
  removeLike: (movie_id) => dispatch(removeLike(movie_id)),

  fetchDislikes: (movie_id) => dispatch(fetchDislikes(movie_id)),
  addDislike: (movie_id) => dispatch(addDislike(movie_id)),
  removeDislike: (movie_id) => dispatch(removeDislike(movie_id)),

  fetchMovieTrailers: (movie_id) => dispatch(fetchMovieTrailers(movie_id)),

  fetchComments: (movie_id) => dispatch(fetchComments(movie_id)),
  addComment: (movie_id, content) => dispatch(addComment(movie_id, content)),
  removeComment: (comment_id) => dispatch(removeComment(comment_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
