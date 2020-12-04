import React from "react";
import { Switch, Route } from "react-router-dom";

import ROUTES from "./utils/routes";

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HomeContainer from "./redux/containers/pages/HomeContainer";
import LoginContainer from "./redux/containers/pages/LoginContainer";
import Movie from "./pages/Movie/Movie";
import RegisterContainer from "./redux/containers/pages/RegisterContainer";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

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
        <ForgotPassword />
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
