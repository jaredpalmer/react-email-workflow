import React, { PropTypes } from 'react'
import Editable from '../components/Editable';

const Heading = ({content, id, edit}) => {
  return (
    <div>
      <Editable
        html={content}
        tag="div"
        placeholder="Heading..."
        onChange={(e) => edit(id, {content: e.target.value})}
        style={{
          width: '100%',
          fontWeight: 'bold',
          fontSize: '20px',
          lineHeight: '1.4',
          color: '#141823',
          margin: 0
        }}
      />
  </div>
  );
}

export default Heading;
