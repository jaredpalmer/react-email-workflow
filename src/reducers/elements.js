import * as actions from '../actions/EmailActions';
import * as types from '../constants/ActionTypes';
import update from 'react/lib/update';

const initialState = [
  {
  id: 0,
  kind: 'url',
  title: '',
  url: '',
  content: '',
  author: '',
  },
];

export default function elements(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ELEMENT:
      return update(state, { $push: [action.element] });
    case types.EDIT_ELEMENT:
      const index = state.findIndex((el) => el.id === action.id);
      return update(state, { [index]: { $merge: action.updates } });
    case types.DESTROY_ELEMENT:
      const i = state.findIndex((el) => el.id === action.id);
      return update(state, { $splice:[[i, 1]] });
    case types.MOVE_ELEMENT:
      const el = state.filter(e => e.id === action.id)[0];
      const j = state.indexOf(el);
      return update(state, {
        $splice: [
          [j, 1],
          [action.atIndex, 0, el],
        ],
      });
    default:
      return state;
  }
}
