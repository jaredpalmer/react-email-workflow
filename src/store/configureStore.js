import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const finalCreateStore = compose(

  // Middleware you want to use in production:
  // applyMiddleware(p1, p2, p3),
  // Other store enhancers if you use any
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
