import React, { PropTypes } from 'react'
import Input from '../Input';

const Heading = ({content, id, edit}) => {
  return (
    <Input
      value={content}
      onChange={(e) => edit(id, {content: e.target.value})}
      style={{
        width: '100%',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '1.4'
      }}
    />
  );
}

export default Heading;
