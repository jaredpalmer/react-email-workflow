import * as types from '../constants/ActionTypes';
import update from 'react/lib/update';

export default function meta(
  state = {
    preset: 'shelly',
    subject: '',
    preheader: '',
    date: new Date(),
  },
  action
) {
  switch (action.type) {
    case types.EDIT_META:
      return update(state, { $merge: action.meta });
    default:
      return state;
  }
}
