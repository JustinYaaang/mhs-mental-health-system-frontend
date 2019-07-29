import React from 'react'
import ReactDOM from 'react-dom'

import { createBrowserHistory } from 'history'

import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/RootReducer'

// core components
import Admin from 'layouts/Admin.jsx'
import Login from 'layouts/LoginPage.js'
import Service from 'layouts/Service.jsx'
import Clinician from 'layouts/Clinician.jsx'
import Trust from 'layouts/Trust.jsx'
import TrustDetails from 'layouts/Trusts/TrustDetails.jsx'
import SurveyCreator from 'layouts/SurveyCreator.js'
import SurveyResult from 'layouts/SurveyResult.jsx'
import QuestionnaireResult from 'layouts/QuestionnaireResult.jsx'
import Error401 from 'layouts/401.js'
import NotFound from 'layouts/404.js'
import Authentication from 'layouts/Login/Authentication.jsx'

import 'assets/css/material-dashboard-react.css?v=1.7.0'
import history from 'history.js'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/login' component={Authentication} />
        <Route path='/forbidden' component={Error401} />
        <Route path='/admin' render={(props) => (isLoggedIn()
          ? (isAdmin() ? (<Admin {...props} />) : (<Redirect to='/forbidden' />))
          : (<Redirect to='/login' />))} />
        <Route path='/service' render={(props) => (isLoggedIn()
          ? (isManager() ? (<Service {...props} />) : (<Redirect to='/forbidden' />))
          : (<Redirect to='/login' />))} />
        <Route path='/clinician' render={(props) => (isLoggedIn()
          ? (isClinician() ? (<Clinician {...props} />) : (<Redirect to='/forbidden' />))
          : (<Redirect to='/login' />))} />
        <Route path='/trust' render={(props) => (isLoggedIn()
          ? (isTrust() ? (<Trust {...props} />) : (<Redirect to='/forbidden' />))
          : (<Redirect to='/login' />))} />

        <Route path='/questionnaire/:id?' render={(props) => (isLoggedIn() ? (<SurveyCreator {...props} />) : (<Redirect to='/login' />))} />
        <Route path='/patientanswers/:id?' render={(props) => (isLoggedIn() ? (<SurveyResult {...props} />) : (<Redirect to='/login' />))} />
        <Route path='/questionnaireview/:id?' render={(props) => (isLoggedIn() ? (<QuestionnaireResult {...props} />) : (<Redirect to='/login' />))} />
        <Redirect from='/' exact to={getPath()} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)

function getPath () {
  return '/admin'

  // if (isLoggedIn()) {
  //   if (isAdmin()) {
  //     return '/admin'
  //   } else if (isManager()) {
  //     return '/manager'
  //   }
  // } else{
  //   return '/login'
  // }
}

function isLoggedIn () {
  console.log('in the require auth function')
  return sessionStorage.jwt
}

function getRole () {
  return sessionStorage.role
}

function isAdmin () {
  return getRole() === 'ADMIN'
}

function isManager () {
  return getRole() === 'ADMIN'
}

function isTrust () {
  return true// return isClinician2() || isClinician3()
}

function isClinician () {
  return true// return isClinician2() || isClinician3()
}

function isClinician2 () {
  return getRole() === 'PATIENT'
}

function isClinician3 () {
  return getRole() === 'PATIENT'
}

function requireAuth (nextState, replace) {
  console.log('in the require auth function')
  if (!sessionStorage.jwt) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
