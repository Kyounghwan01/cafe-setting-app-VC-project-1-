import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers, { userReducer, initialState } from './reducers';
import * as dispatchFunction from './actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContainer from '../src/containers/MainContainer';
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';
import Mypage from '../src/components/MyPage';
import ChangeMenuContainer from '../src/containers/ChangeMenuContainer';
import ViewContainer from '../src/containers/ViewContainer';
import ChangeSeatsContainer from '../src/containers/ChangeSeatsContainer';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const [user, dispatch] = useReducer(userReducer, initialState);
  const store = createStore(reducers);

  const checkUser = async search => {
    if (!search) {
      return dispatch(dispatchFunction.checkUserOuth('unauthorized'));
    }
    const res = await axios.get(`http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/view/${search.substring(1)}`);
    return await dispatch(dispatchFunction.checkUserOuth(res.data.error));
  };

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" render={props => (
              <MainContainer {...props} />
            )}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/mypage" render={props => (
              <Mypage {...props} checkUser={checkUser} user={user} />
            )}
            />
          <Route
            exact
            path="/view"
            render={props => (
              <ViewContainer {...props} checkUser={checkUser} user={user} />
            )}
          />
          <Route
            exact
            path="/change/seats"
            render={props => (
              <ChangeSeatsContainer {...props} checkUser={checkUser} user={user} />
            )}
          />
          <Route exact path="/change/menu" render={props => (
              <ChangeMenuContainer {...props} checkUser={checkUser} user={user} />
            )}
          />
          <Route exact path="/error" render={props => (
              <ErrorPage {...props} checkUser={checkUser} user={user} />
            )}
          />
          <Route render={props => (
              <ErrorPage {...props} errorstatus='404' />
            )} />
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));