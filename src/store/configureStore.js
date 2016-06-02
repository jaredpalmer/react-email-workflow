import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import callAPIMiddleware from 'callAPIMiddleware';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

export default function configureStore() {
  const persistedState = loadState();
  const middlewares = [thunk, callAPIMiddleware];

  if (__DEV__) {
    middlewares.push(createLogger());
  }

  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(...middlewares),
      typeof window === 'object' &&
       typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() : f => f
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
