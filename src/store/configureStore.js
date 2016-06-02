import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import throttle from 'lodash/throttle';
import thunkMiddleware from 'redux-thunk';
import { loadState, saveState } from './localStorage';

export default function configureStore() {
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').default /*.default if you use Babel 6+ */)
      );
    }
  }

  store.subscribe(throttle(() => {
    saveState({
      meta: store.getState().meta,
      premail: store.getState().premail,
      elements: store.getState().elements,
    });
  }, 1000));

  return store;
}
