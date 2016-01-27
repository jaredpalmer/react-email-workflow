import React, { Component, PropTypes } from 'react';
import { Flex } from 'jsxstyle';

const Center = ({ children, ...other }) =>
  <Flex alignItems='center'
    justifyContent='center'
    flexWrap='wrap'
    {...other}>
    {children}
  </Flex>;

export default Center;
