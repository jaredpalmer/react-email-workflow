import React from 'react'
import Input from './Input'

const Heading = ({ content, id, edit }) => (
  <Input
    value={content}
    placeholder='Heading...'
    rows={1}
    onChange={(e) => edit(id, { content: e.target.value })}
    style={{
      width: '100%',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '1.4',
      color: '#141823',
      margin: 0}}
  />
)

export default Heading
