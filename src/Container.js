import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import uuid from 'node-uuid';
import Button from './Button';
import * as EmailActions from './actions/EmailActions';

const style = {
  width: 522
};

const cardTarget = {
  drop() {
  }
};


class Container extends Component {
  constructor(props) {
    super(props);
    this.findCard = this.findCard.bind(this);
  }

  findCard(id) {
    const { elements } = this.props;
    const el = elements.filter(c => c.id === id)[0];

    return {
      el,
      index: elements.indexOf(el)
    };
  }

  render() {
    const { elements, actions, connectDropTarget, ...other } = this.props;
    return connectDropTarget(
      <div style={style}>
        {elements.map((card, i) => {
        return (
          <Card key={card.id}
            id={card.id}
            title={card.title}
            url={card.url}
            content={card.content}
            author={card.author}
            moveCard={actions.move}
            findCard={this.findCard}
            index={i}
            edit={actions.edit}
            destroy={actions.destroy}
            {...other}
          />
        );
        })}
        <Button onClick={() => actions.add() }><i className="icon ion-link" style={{marginRight: ".5rem"}}/> Add Link </Button>
      </div>
    );
  }
}

Container.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { elements: state.elements }
}

function mapDispatchToProps(dispatch) {
   return { actions: bindActionCreators(EmailActions, dispatch) }
}

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(Container);

const InnerComponent = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(ContainerComponent);
const ComposedComponent = DragDropContext(HTML5Backend)(InnerComponent);

export default ComposedComponent;
