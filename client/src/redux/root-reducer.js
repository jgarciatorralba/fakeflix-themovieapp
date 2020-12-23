import { combineReducers } from "redux";

import UserReducer from "./user/user-reducer";
import MoviesReducer from "./movies/movies-reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  movies: MoviesReducer,
});

export default rootReducer;
