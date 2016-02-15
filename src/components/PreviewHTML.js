import React, { PropTypes } from 'react';
import L from '../LayoutConstants';
import CodeMirror from './CodeMirror';
require('codemirror/mode/htmlmixed/htmlmixed');
const PreviewHTML = ({ source }) => {
  return (
    <div style={{
        backgroundColor: L.darkBlue,
        height: '100%',
        width: '100%',
        outline: 'none',
        border: 'none',
        color: '#fff',
      }}>
      <CodeMirror className="CodeMirrorFull" value={source} options={{
          mode: 'htmlmixed',
          theme: 'blackboard',
          readOnly: true,
          lineWrapping: true,
          lineNumbers: true,
        }}/>
    </div>
  );
};

export default PreviewHTML;
