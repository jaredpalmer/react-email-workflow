import expect from 'expect';
import * as actions from '../src/actions/EmailActions';
import * as types from '../src/constants/ActionTypes';
import * as ElementSchema from '../src/constants/ElementSchema';

describe('actions', () => {
  it('should create an action to add an element', () => {
    const expectedAction = {
      type: types.ADD_ELEMENT,
      element: {
        id: 1,
        kind: 'url',
        title: '',
        url: '',
        content: '',
        author: ''
      }
    };
    expect(actions.add(ElementSchema.url)).toEqual(expectedAction);
  });

  it('should create an action to edit an element', () => {
    const updates = {
      url: 'http://google.com'
    };
    const expectedAction = {
      type: types.EDIT_ELEMENT,
      id: 0,
      updates: {
        url: 'http://google.com'
      }
    };
    expect(actions.edit(0, updates)).toEqual(expectedAction);
  });

  it('should create an action to destroy an element', () => {
    const expectedAction = {
      type: types.DESTROY_ELEMENT,
      id: 0
    };
    expect(actions.destroy(0)).toEqual(expectedAction);
  });

  it('should create an action to move an element', () => {
    const expectedAction = {
      type: types.MOVE_ELEMENT,
      id: 0,
      atIndex: 1
    };
    expect(actions.move(0,1)).toEqual(expectedAction);
  });

  it('should create an action to edit meta data', () => {
    const expectedAction = {
      type: types.EDIT_META,
      meta: {subject: 'Apple goes Bankrupt'}
    };
    expect(actions.meta({subject: 'Apple goes Bankrupt'})).toEqual(expectedAction);
  });
});
