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

function reducer(state = {
  meta: {},
  elements: []
}, action) {
  switch (action.type) {
    case types.ADD_ELEMENT:
      return update(state, {elements: {$push: [{id: 1, ...url}]}});
    case types.EDIT_ELEMENT:
      return state;
    case types.DESTROY_ELEMENT:
      return state;
    case types.MOVE_ELEMENT:
      return state;
    case types.EDIT_META:
      return state;
    default:
      return state;
  }
}


describe('reducer', () => {

  it('should return default state if action is undefined', () => {
    const initialState = {
      meta: {},
      elements: []
    };
    const nextState = reducer(initialState, 'BLAH');
    expect(nextState).toEqual(initialState);
  });

  it('should handle ADD_ELEMENT', () => {
    const initialState = {
      elements: []
    };
    const nextState = reducer(initialState, actions.add());
    expect(nextState).toEqual({
      elements: [
        {
          id: 1,
          kind: 'url',
          title: '',
          url: '',
          content: '',
          author: ''
        }
      ]
    });
  });

});
