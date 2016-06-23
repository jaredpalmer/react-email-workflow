/* global Parse */
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Editor from './containers/Editor'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Parse from 'parse'

Parse.initialize('react-email')
Parse.serverURL = 'http://0.0.0.0:5000/parse'

function requireAuth(nextState, replace) {
  if (!Parse.User.current()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Editor} onEnter={requireAuth} />
        <Route path='login' component={Login} />
        <Route path='logout' component={Logout} />
      </Route>
    </Router>
  )
}
