/* global Parse */
import React from 'react'
import { Block } from 'jsxstyle'
import { withRouter } from 'react-router'
import Parse from 'parse'

Parse.initialize('react-email')
Parse.serverURL = 'http://0.0.0.0:5000/parse'

class Logout extends React.Component {
  constructor () {
    super()
  }

  componentWillMount () {
    Parse.User.logOut()
    this.props.router.replace('/login')
  }

  render () {
    return (
      <div>See Yah!</div>
    )
  }
}

export default withRouter(Logout)
