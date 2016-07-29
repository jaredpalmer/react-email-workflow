/* global __DEV__ */
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import axios from 'axios'
import { persistStore, autoRehydrate } from 'redux-persist'

export default function configureStore () {
  const middlewares = [thunk.withExtraArgument({ axios })]

  const store = createStore(
    rootReducer,
    undefined,
    compose(
      autoRehydrate(),
      applyMiddleware(...middlewares),
      __DEV__ &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
    )
  )

  // Enable HMR during development
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  persistStore(store)

  return store
}
