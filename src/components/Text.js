import React, { PropTypes } from 'react';
import Input from './Input';

const Text = ({ content, id, edit }) => {
  return (
      <Input
        value={content}
        placeholder="Text...(keep to one paragraph)"
        rows={2}
        onChange={(e) => edit(id, { content: e.target.value })}
        style={{
          width: '100%',
          lineHeight: '1.2',
          margin: 0,
        }}
        autoFocus
      />
  );
};

export default Text;
