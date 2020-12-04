import React from "react";
import { Switch, Route } from "react-router-dom";

import ROUTES from "./utils/routes";

import RegisterContainer from "./redux/containers/pages/RegisterContainer";
import LoginContainer from "./redux/containers/pages/LoginContainer";
import ForgotPasswordContainer from "./redux/containers/pages/ForgotPasswordContainer";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import HomeContainer from "./redux/containers/pages/HomeContainer";
import Movie from "./pages/Movie/Movie";

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
        <ResetPassword />
      </Route>
      <Route path={ROUTES.MOVIE}>
        <Movie />
      </Route>
      <Route path={ROUTES.HOME} exact>
        <HomeContainer />
      </Route>
    </Switch>
  );
}

export default App;
