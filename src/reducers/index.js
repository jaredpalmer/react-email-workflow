import { combineReducers } from 'redux';
import elements from './elements';
import meta from './meta';

export default combineReducers({
  meta,
  elements
});
