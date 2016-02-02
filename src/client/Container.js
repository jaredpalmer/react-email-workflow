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
import * as ElementSchema from './constants/ElementSchema';
import {Row} from 'jsxstyle';
const style = {
  width: 600
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
            card={card}
            id={card.id}
            moveCard={actions.move}
            findCard={this.findCard}
            index={i}
            edit={actions.edit}
            destroy={actions.destroy}
            {...other}
          />
        );
        })}
        <Row marginTop="1rem">
          <Button style={{flex: 1, marginRight: ".5rem"}} onClick={() => actions.add(ElementSchema.url) } primary><i className="ion ion-link" style={{marginRight: ".5rem"}}/> Add Link </Button>
          <Button style={{flex: 1, marginRight: ".5rem"}} onClick={() => actions.add(ElementSchema.heading) } primary><span style={{fontWeight: 'bold', fontFamily: 'Georgia', marginRight: '.5rem'}}>H1</span> Add Heading </Button>
          <Button style={{flex: 1, marginRight: ".5rem"}} onClick={() => actions.add(ElementSchema.html) } primary><i className="ion ion-code" style={{marginRight: ".5rem"}}/> Add HTML </Button>
        </Row>

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
