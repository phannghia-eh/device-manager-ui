import React from 'react';
import {render} from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, createStore, compose} from "redux";
import {Provider} from "react-redux";
import {Route, Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers'

import Layout from "./HOC/layout";
import Dashboard from './components/dashboard'

import '../node_modules/react-table/react-table.css'
//IMPORT REAT-TOAST CSS
import 'react-toastify/dist/ReactToastify.css'

//import iconmoon
import './assets/css/icons/icomoon/styles.css'

// import './assets/css/bootstrap.css'
import './assets/css/bootstrap.min.css'
// import './assets/css/bootstrap-reboot.css'
// import './assets/css/bootstrap-grid.css'
import './assets/css/component.min.css'
import './assets/css/colors.min.css'
import './assets/css/layout.min.css'
import './assets/css/bootstrap_limitless.min.css'

const store = createStore(
  rootReducer,
  {

  },
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Layout(Dashboard)}></Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
