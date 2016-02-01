import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import {Block, Row} from 'jsxstyle';
import Button from './Button';
import Input from './Input';
import L from './LayoutConstants';
import Extract from './sources/Extract';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};


class Card extends Component {
  render() {
    const { id, title, content, author, url, isDragging, connectDragSource, connectDropTarget, edit , destroy} = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div>
        <Row>
          <div style={{
            flex: "1",
            borderRadius: '2px',
            padding: '1rem',
            marginBottom: '.5rem',
            backgroundColor: 'white',
            cursor: 'move',
            opacity: opacity
            }}>
            <Row marginBottom=".25rem">
              <Input
                style={{flex: 1, marginRight: '.25rem'}}
                onChange={(e) => edit(id, {url: e.target.value})}
                type="url" value={url}

              />
            <Button onClick={()=> {
                console.log(url);
                Extract(url).then(res => edit(id, res));
              }}>Fetch</Button>
            </Row>
            <Row marginBottom=".25rem">
              <Input
                onChange={(e) => edit(id, {title: e.target.value})}
                value={title}
                placeholder={'title'}
                rows="2"
                style={{
                  flex: 1,
                  fontWeight: 'bold',
                  color: '#141823',
                  lineHeight: '1.4',
                  fontSize: '20px',
                  textTransform: 'capitalize'
                }}
              />
            </Row>
            <Row marginBottom=".25rem">
              <Input
                style={{flex: 1}}
                onChange={(e) => edit(id, {content: e.target.value})}
                value={content}
                rows="5"
              />
            </Row>
            <Row marginBottom=".25rem">
              <Input
                style={{flex: 1}}
                onChange={(e) => edit(id, {author: e.target.value})}
                value={author}
                type="text"/>
            </Row>

          </div>
          <Block
            padding={"1.5rem"}
            fontSize={L.gridUnit * 2}>
            <i
              onClick={() => destroy(id)}
              className="ion ion-ios-trash"
              style={{
                fontSize: "1.5rem",
                opacity: opacity,
                cursor: 'pointer !important',
              }}
            />
          </Block>
      </Row>
    </div>
    ));
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired
};

const DragSourceComponent = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);

const DropTargetComponent = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSourceComponent)

export default DropTargetComponent;
