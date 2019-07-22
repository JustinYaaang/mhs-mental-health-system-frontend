import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

// core components
import Admin from 'layouts/Admin.jsx'
import RTL from 'layouts/RTL.jsx'
import SurveyCreator from 'layouts/SurveyCreator.js'
import SurveyResult from 'layouts/SurveyResult.jsx'
import Authentication from 'views/Login/Authentication.jsx'
import 'assets/css/material-dashboard-react.css?v=1.7.0'

const hist = createBrowserHistory()

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path='/admin' component={Admin} />
      <Route path='/auth' component={Authentication} />
      <Route path='/rtl' component={RTL} />
      <Route path='/creator' component={SurveyCreator} />
      <Route path='/questionnaire/:id?' component={SurveyCreator} />
      <Route path='/patientanswers/:id?' component={SurveyResult} />
      <Redirect from='/' to='/admin/dashboard' />

    </Switch>
  </Router>,
  document.getElementById('root')
)
