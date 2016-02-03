import React, { Component, PropTypes } from 'react'
import {Block, Row} from 'jsxstyle';
import Button from '../components/Button';
import Input from '../components/Input';
import { extract } from '../sources/api';
import Editable from '../components/Editable';
// import SmartInput from '../components/SmartInput';
class Url extends Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    const ENTER = 13;
    if( e.keyCode == ENTER ) {
      Extract(this.props.url).then(res => this.props.edit(this.props.id, res));
    }
  }

  render() {
    const {id, title, content, author, url, edit} = this.props;
    return (
      <div>
        <Row>
          <Input
            style={{
              flex: 1,
              marginRight: '.25rem',
              outline: 'none !important',
              border: 'none !important',
              padding: '0',
              borderRadius:'2px',
              cursor: 'auto',
              WebkitAppearance: 'none',
              display: 'block',
            }}
            onChange={(e) => edit(id, {url: e.target.value})}
            onKeyDown={this.handleKeyDown}
            placeholder="Paste your link here and press Enter..."
            value={url}
          />
        <Button onClick={()=> {
            // console.log(url);
            extract(url).then(res => edit(id, res));
          }}>Fetch</Button>
      </Row>
      {title ?
        <Block>
        <Row marginBottom=".5rem">
          <Editable
            style={{
              flex: 1,
              fontWeight: 'bold',
              color: '#141823',
              lineHeight: '1.4',
              fontSize: '20px',
              textTransform: 'capitalize',
            }}
            onChange={(e) => edit(id, {title: e.target.value})}
            tagName="div"
            html={title}
          />
        </Row>
        <Row>
          <Editable
            style={{
              flex: 1,
              color: '#595f6c',
              fontSize: '16px',
              lineHeight: '24px',
            }}
            onChange={(e) => edit(id, {content: e.target.value})}
            tagName="p"
            html={content}
          />
        </Row>
        <Row marginBottom=".25rem">
          <Editable
            style={{
              flex: 1,
              color: '#595f6c',
              fontSize: '16px',
              lineHeight: '24px',
            }}
            onChange={(e) => edit(id, {author: e.target.value})}
            tagName="p"
            html={author}
          />
        </Row>
      </Block> : null }
      </div>
    );
  }
}

export default Url;
