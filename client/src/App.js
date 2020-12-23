import React from "react";
import { Switch, Route } from "react-router-dom";

import ROUTES from "./utils/routes";

import RegisterContainer from "./redux/containers/pages/RegisterContainer";
import LoginContainer from "./redux/containers/pages/LoginContainer";
import ForgotPasswordContainer from "./redux/containers/pages/ForgotPasswordContainer";
import ResetPasswordContainer from "./redux/containers/pages/ResetPasswordContainer";

import HomeContainer from "./redux/containers/pages/HomeContainer";
import MovieContainer from "./redux/containers/pages/MovieContainer";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
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
      <Route path={ROUTES.HOME} exact>
        <HomeContainer />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
