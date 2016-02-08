import React, { PropTypes } from 'react';
import { Flex } from 'jsxstyle';

const PreviewLoading = ({ props }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      flex="1">
      <h3>Loading......</h3>
    </Flex>
  );
};

export default PreviewLoading;
