import React, { PropTypes } from 'react';
import Frame from './Frame';

const VisualPreview = ({ source }) => {
  return (
    <Frame style={{
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        outline: 'none',
        border: 'none',
        borderRadius: '6px',
      }}>
      <div dangerouslySetInnerHTML={{ __html: source }}/>
    </Frame>
  );
};

export default VisualPreview;
