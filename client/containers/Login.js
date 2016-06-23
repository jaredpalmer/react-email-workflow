import React from 'react'
import { Block } from 'jsxstyle'
// import { Link } from 'react-router'
import Input from '../components/Input'

class Login extends React.Component {
  render () {
    return (
      <Block
        margin='200px auto 50px'
        width='400px'
      >
        Heaasdfsa
        <Input
          id='text'
          type='text'
          value=''
          onChange={(e) => console.log(e.target.value)}
          style={{ width: '100%', margin: 0, flex: 1 }}
        />
        <Input
          id='text'
          type='text'
          value=''
          onChange={(e) => console.log(e.target.value)}
          style={{ width: '100%', margin: 0, flex: 1 }}
        />
      </Block>
    )
  }
}

export default Login
