import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../redux/root-reducer";
import thunk from "redux-thunk";

/**
 * Helper function to provide initial state to
 * the store the component is rendered with.
 */
export function renderWithReduxAndRouter(
  component,
  route = "/",
  {
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = {}
) {
  window.history.pushState({}, "Test page", route);
  return {
    ...render(<Provider store={store}>{component}</Provider>, {
      wrapper: BrowserRouter,
    }),
    store,
  };
}
