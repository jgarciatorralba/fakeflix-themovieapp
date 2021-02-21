import React from "react";
import { Fragment } from "react";

import { Switch, Route } from "react-router-dom";

import ROUTES from "./utils/routes";
import ScrollToTop from "./utils/ScrollToTop";

import RegisterContainer from "./redux/containers/pages/RegisterContainer";
import LoginContainer from "./redux/containers/pages/LoginContainer";
import ForgotPasswordContainer from "./redux/containers/pages/ForgotPasswordContainer";
import ResetPasswordContainer from "./redux/containers/pages/ResetPasswordContainer";

import HomeContainer from "./redux/containers/pages/HomeContainer";
import MovieContainer from "./redux/containers/pages/MovieContainer";
import SearchContainer from "./redux/containers/pages/SearchContainer";
import ProfileContainer from "./redux/containers/pages/ProfileContainer";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Fragment>
      <ScrollToTop />
      <Switch>
        <Route path={ROUTES.LOGIN}>
          <LoginContainer />
        </Route>
        <Route path={ROUTES.REGISTER}>
          <RegisterContainer />
        </Route>
        <Route path={ROUTES.PASS_FORGOT}>
          <ForgotPasswordContainer />
        </Route>
        <Route path={ROUTES.PASS_RESET}>
          <ResetPasswordContainer />
        </Route>
        <Route path={ROUTES.MOVIE}>
          <MovieContainer />
        </Route>
        <Route path={ROUTES.SEARCH}>
          <SearchContainer />
        </Route>
        <Route path={ROUTES.PROFILE}>
          <ProfileContainer />
        </Route>
        <Route path={ROUTES.HOME} exact>
          <HomeContainer />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
