import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Editor from './containers/Editor'
import Login from './containers/Login'

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Editor} />
        <Route path='login' component={Login} />
      </Route>
    </Router>
  )
}
