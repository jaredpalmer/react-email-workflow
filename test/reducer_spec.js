import expect from 'expect';
import * as actions from '../src/actions/EmailActions';
import * as types from '../src/constants/ActionTypes';
import uuid from 'node-uuid';
import update from 'react/lib/update';

const url = {
  kind: 'url',
  title: '',
  url: '',
  content: '',
  author: '',
};

// TODO: Figure out uuid vs. id in testing / spying

function reducer(state = [], action) {
  switch (action.type) {
    case types.ADD_ELEMENT:
      return [...state, {id: action.id, ...url}];
    case types.EDIT_ELEMENT:
      const index = state.findIndex((el) => el.id === action.id);
      return update(state, {[index]: { $merge: action.updates }});
    case types.DESTROY_ELEMENT:
      const i = state.findIndex((el) => el.id === action.id);
      return update(state, {$splice:[[i, 1]]});
    case types.MOVE_ELEMENT:
      return state;
    default:
      return state;
  }
}


describe('reducer', () => {

  it('should return default state if action is undefined', () => {
    const initialState = [];
    const nextState = reducer(initialState, 'BLAH');
    expect(nextState).toEqual(initialState);
  });

  it('should handle ADD_ELEMENT', () => {
    const initialState = []
    const nextState = reducer(initialState, actions.add());
    expect(nextState).toEqual([{
          id: 1,
          kind: 'url',
          title: '',
          url: '',
          content: '',
          author: ''
        }]);
  });

  it('should handle EDIT_ELEMENT', () => {
    const initialState = [{
        id: 1,
        kind: 'url',
        title: '',
        url: '',
        content: '',
        author: ''
      }];
    const nextState = reducer(initialState, actions.edit(1, {title: 'Hello!'}));
    expect(nextState).toEqual([{
        id: 1,
        kind: 'url',
        title: 'Hello!',
        url: '',
        content: '',
        author: ''
      }]);
  });

  it('should handle DESTROY_ELEMENT', () => {
    const initialState = [{
        id: 1,
        kind: 'url',
        title: '',
        url: '',
        content: '',
        author: ''
      }];
    const nextState = reducer(initialState, actions.destroy(1));
    expect(nextState).toEqual([]);
  });

});
