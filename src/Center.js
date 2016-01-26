import React, { Component, PropTypes } from 'react';
import { Block, Flex } from 'jsxstyle';

const Center = ({ children, ...rest }) =>
  <Flex alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        {...rest}>
    {children}
  </Flex>;

export default Center;
