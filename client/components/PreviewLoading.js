import React from 'react'
import { Flex, Col } from 'jsxstyle'

const PreviewLoading = () => (
  <Flex
    background='#fff'
    alignItems='center'
    justifyContent='center'
    flexWrap='wrap'
    flex='1'>
    <Col alignItems='center'>
      <div className='spinner'>
        <div className='bounce1' />
        <div className='bounce2' />
        <div className='bounce3' />
      </div>
    </Col>
  </Flex>
)

export default PreviewLoading
