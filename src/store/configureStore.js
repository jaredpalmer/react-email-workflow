import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        createLogger()
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default /*.default if you use Babel 6+ */)
    );
  }


  return store;
}
