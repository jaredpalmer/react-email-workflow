import React, { Component } from 'react'
import { Block, Col } from 'jsxstyle'
import Preview from './Preview'
import Meta from './Meta'
import ElementList from './ElementList'

export default class App extends Component {
  render () {
    return (
      <Col>
        <Block
          maxWidth='616px'
          marginTop='50px'
          height='calc(100vh - 50px)'
          padding='1rem 1rem 0'
        >
          <Meta />
          <ElementList />
        </Block>
        <Preview />
      </Col>
    )
  }
}
