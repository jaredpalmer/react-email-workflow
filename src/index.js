import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();
const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  rootEl
);


if (module.hot) {
   module.hot.accept('./containers/Root', () => {
     // If you use Webpack 2 in ES modules mode, you can
     // use <Assignments /> here rather than require() a <NextAssignments />.
     const NextRoot = require('./containers/Root').default;
     ReactDOM.render(
       <AppContainer>
         <Root store={store}/>
       </AppContainer>,
       rootEl
     );
   });
}
