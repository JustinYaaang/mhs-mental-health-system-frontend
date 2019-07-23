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
import Manager from 'layouts/Manager.jsx'
import SurveyCreator from 'layouts/SurveyCreator.js'
import SurveyResult from 'layouts/SurveyResult.jsx'
import Authentication from 'layouts/Login/Authentication.jsx'

import 'assets/css/material-dashboard-react.css?v=1.7.0'
import history from 'history.js'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/login' component={Authentication} />
        <Route path='/manager' render={() => (isLoggedIn()
          ? (isManager() ? (<Manager />) : (<Redirect to='/questionnaire' />))
          : (<Redirect to='/login' />))} />
        <Route path='/admin' render={() => (isLoggedIn()
          ? (isAdmin() ? (<Admin />) : (<Redirect to='/questionnaire' />))
          : (<Redirect to='/login' />))} />
        <Route path='/questionnaire/:id?' render={() => (isLoggedIn() ? (<SurveyCreator />) : (<Redirect to='/login' />))} />
        <Route path='/patientanswers/:id?' render={() => (isLoggedIn() ? (<SurveyResult />) : (<Redirect to='/login' />))} />
        <Redirect from='/' to='/admin/dashboard' />

      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)

function isLoggedIn () {
  console.log('in the require auth function')
  return sessionStorage.jwt
}

function getRole () {
  console.log(sessionStorage.role)
  return sessionStorage.role
}

function isAdmin () {
  return getRole() === 'PATIENTS'
}

function isManager () {
  return getRole() === 'PATIENTS'
}

function isClinician () {
  return isClinician2() || isClinician3()
}

function isClinician2 () {
  return getRole() === 'CLINICIAN2'
}

function isClinician3 () {
  return getRole() === 'CLINICIAN3'
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
