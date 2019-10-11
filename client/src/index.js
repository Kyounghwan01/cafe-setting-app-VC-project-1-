import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from '../src/components/Main'
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';
import NotFound from '../src/components/NotFound';
import reducers from './reducers';


const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path = '/' component={Main}/>
        <Route exact path = '/login' component={Login}/>
        <Route exact path = '/signup' component={Signup}/>
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
, document.getElementById('root'));


