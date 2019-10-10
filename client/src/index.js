import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from '../src/components/Main'
import NotFound from '../src/components/NotFound';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';


const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path = '/' component={Main}/>
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

