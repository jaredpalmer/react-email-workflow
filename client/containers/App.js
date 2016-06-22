import React, { Component } from 'react'
import { Block, Row, Col } from 'jsxstyle'
import Preview from './Preview'
import Meta from './Meta'
import ElementList from './ElementList'
import L from '../LayoutConstants'
import { H4 } from '../components/Type'

export default class App extends Component {
  render () {
    return (
      <Col>
        <Row
          height={L.gridUnit * 6.25}
          alignItems='center'
          justifyContent='space-between'
          position='fixed'
          top='0'
          left='0'
          width='100%'
          padding='0 1rem'
          background={L.blue}
          zIndex='999999'
        >
          <H4 color='#ffffff'>React Email Workflow</H4>
          <Row alignItems='center'>
            <Block marginRight='1rem'>
              <a style={{
                fontSize: '1.5rem',
                color: '#ffffff'
              }}
                href='https://twitter.com/jaredpalmer'
                target='_blank'>
                <i className='ion ion-social-twitter' />
              </a>
            </Block>
            <Block>
              <a style={{
                fontSize: '1.5rem',
                color: '#ffffff'
              }}
                href='https://github.com/jaredpalmer/react-email-workflow'
                target='_blank'>
                <i className='ion ion-social-github' /></a>
            </Block>
          </Row>
        </Row>
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
