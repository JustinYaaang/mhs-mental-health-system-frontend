import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from "./reducers/RootReducer"

// core components
import Admin from "layouts/Admin.jsx";
import Login from "layouts/LoginPage.js";
import RTL from "layouts/RTL.jsx";
import SurveyCreator from "layouts/SurveyCreator.js";
import SurveyResult from "layouts/SurveyResult.jsx";

import "assets/css/material-dashboard-react.css?v=1.7.0";

const hist = createBrowserHistory();
const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/rtl" component={RTL} />
      <Route path="/creator" component={SurveyCreator} />
      <Route path="/questionnaire/:id?" component={SurveyCreator} />
      <Route path="/patientanswers/:id?" component={SurveyResult} />
      <Redirect from="/" to="/admin/dashboard" />

    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
