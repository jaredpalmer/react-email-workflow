import React, { PropTypes } from 'react';
import { Flex } from 'jsxstyle';

const PreviewLoading = ({ props }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      flex="1">
      <h2>Loading......</h2>
    </Flex>
  );
};

export default PreviewLoading;
