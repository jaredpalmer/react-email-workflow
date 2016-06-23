/* global __DEV__ */
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import axios from 'axios'
import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'

export default function configureStore () {
  const persistedState = loadState()
  const middlewares = [thunk.withExtraArgument({ axios })]

  const store = createStore(
    rootReducer,
    persistedState,
    compose(
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

  // Save state to localStorage every 1s
  store.subscribe(throttle(() => {
    saveState({
      meta: store.getState().meta,
      premail: store.getState().premail,
      elements: store.getState().elements
    })
  }, 1000))

  return store
}
