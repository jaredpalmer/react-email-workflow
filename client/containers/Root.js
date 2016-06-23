import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './App'

/**
 * Root is exported for conditional usage index.js.
 * It's not 'real' a container, BUT it's special because it enables us to use
 * vanilla Webpack HMR.
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
