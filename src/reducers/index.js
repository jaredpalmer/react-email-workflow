import { combineReducers } from 'redux';
import elements from './elements';
import meta from './meta';
import premail from './premail';

export default combineReducers({
  meta,
  elements,
  premail
});
