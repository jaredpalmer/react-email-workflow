import React, { Component, PropTypes } from 'react';
import {Block, Row} from 'jsxstyle';
import Button from '../components/Button';
import Input from '../components/Input';
import { extract } from '../sources/api';
import Editable from '../components/Editable';

class Url extends Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    const ENTER = 13;
    if (e.keyCode == ENTER) {
      extract(this.props.url).then(res => this.props.edit(this.props.id, res));
    }
  }

  render() {
    const { id, title, content, author, url, edit } = this.props;
    return (
      <div>
        <Row>
          <Input
            style={{
              flex: 1,
              marginRight: '.25rem',
            }}
            onChange={(e) => edit(id, { url: e.target.value })}
            onKeyDown={this.handleKeyDown}
            placeholder="Paste your link here and press Enter..."
            value={url}
          />
        <Button onClick={()=> {
          // console.log(url);
          extract(url).then(res => edit(id, res));
        }}>Fetch</Button>
          </Row>
          { title ?

            <Block>
              <Row marginBottom=".5rem">
                <Input
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    color: '#141823',
                    lineHeight: '1.4',
                    fontSize: '20px',
                    textTransform: 'capitalize',
                  }}
                  rows={2}
                  onChange={(e) => edit(id, { title: e.target.value })}
                  value={title}
                />
        </Row>
        <Row>
          <Input
            style={{
              flex: 1,
              color: '#595f6c',
              fontSize: '16px',
              lineHeight: '24px',
            }}
            rows={5}
            onChange={(e) => edit(id, { content: e.target.value })}
            value={content}
          />
        </Row>
        <Row marginBottom=".25rem">
          <Input
            style={{
              flex: 1,
              color: '#595f6c',
              fontSize: '16px',
              lineHeight: '24px',
            }}
            onChange={(e) => edit(id, { author: e.target.value })}
            value={author}
          />
        </Row>
      </Block> : null }
      </div>
    );
  }
}

export default Url;
