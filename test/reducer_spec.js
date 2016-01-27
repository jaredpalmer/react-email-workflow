import expect from 'expect';
import * as actions from '../src/actions/EmailActions';
import * as types from '../src/constants/ActionTypes';
import uuid from 'node-uuid';
import update from 'react/lib/update';
import elements from '../src/reducers/elements';
import meta from '../src/reducers/meta';

describe('reducer', () => {

  it('should return default state if action is undefined', () => {
    const initialState = [];
    const nextState = elements(initialState, 'BLAH');
    expect(nextState).toEqual(initialState);
  });

  it('should handle ADD_ELEMENT', () => {
    const initialState = []
    const nextState = elements(initialState, actions.add());
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
    const nextState = elements(initialState, actions.edit(1, {title: 'Hello!'}));
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
    const nextState = elements(initialState, actions.destroy(1));
    expect(nextState).toEqual([]);
  });

  it('should handle MOVE_ELEMENT', () => {
    const initialState = [{
        id: 1,
        title: 'Google',
      },
      {
        id: 2,
        title: 'Apple',
      },
      {
        id: 3,
        title: 'FB',
      }
    ];
    const nextState = elements(initialState, actions.move(1, 1));
    expect(nextState).toEqual([{
        id: 2,
        title: 'Apple',
      },{
        id: 1,
        title: 'Google',
      },{
        id: 3,
        title: 'FB',
      }
    ]);
  });

  it('should handle EDIT_META', () => {
    const initialState = {
        subject: '',
        preheader: '',
        date: ''
      };
    const nextState = meta(initialState, actions.meta({subject: 'Hello'}));
    expect(nextState).toEqual({
        subject: 'Hello',
        preheader: '',
        date: ''
      });
  });


});
