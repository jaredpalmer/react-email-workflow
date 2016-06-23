/* global Parse */
import React from 'react'
import { Block } from 'jsxstyle'
import { withRouter } from 'react-router'
import Input from '../components/Input'
import Button from '../components/Button'
import Parse from 'parse'

Parse.initialize('react-email')
Parse.serverURL = 'http://0.0.0.0:5000/parse'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      user: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const username = this.refs.username.value
    const password = this.refs.pass.value

    Parse.User.logIn(username, password)
      .then(user => {
        // this.setState({ user, password: null })
        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      }).catch(e => {
        console.log(e)
      })
  }
  render () {
    return (
      <Block margin='200px auto 50px' width='300px'>
        <form onSubmit={this.handleSubmit}>
          <Block marginBottom='.5rem'>
            <input
              ref='username'
              type='text'
              placeholder='Username'
              style={{ width: '100%', margin: 0, flex: 1 }}
            />
          </Block>
          <Block marginBottom='.5rem'>
            <input
              ref='pass'
              type='text'
              placeholder='Password'
              style={{ width: '100%', margin: 0, flex: 1 }}
            />
          </Block>
          <button type="submit">Login</button>
        </form>
      </Block>
    )
  }
}

export default withRouter(Login)
