import React, { PropTypes } from 'react';
import L from './LayoutConstants';

const PreviewHTML = ({source}) => {
  return (
    <pre style={{
        backgroundColor: L.darkBlue,
        height: '100%',
        width: '100%',
        outline: 'none',
        border: 'none',
        fontSize: '.75rem',
        padding: '.5rem',
        color: '#fff'
      }}>
      <code>
        {source}
      </code>
    </pre>
  );
};

export default PreviewHTML;
