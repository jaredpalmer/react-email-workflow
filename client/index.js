import React from 'react'
import ReactDOM from 'react-dom'
import './global.css'
import configureStore from './store/configureStore'

const store = configureStore()
const rootEl = document.getElementById('root')

/**
 * Since we are using Redux, we don't have much component state. Thus, we do not
 * need react-hot-loader and can instead use @dan_abramov-approved approach:
 * "vanilla" Webpack Hot Module Replacement + conditional render function.
 */
let render = () => {
  const Root = require('./containers/Root').default
  ReactDOM.render(
    <Root store={store} />,
    rootEl
  )
}

if (module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    )
  }

  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('./containers/Root', () => {
    // this is magic, i have no idea why we need setTimeout here
    setTimeout(render)
  })
}

render()
