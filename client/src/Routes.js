import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { userReducer, initialState } from "reducers";
import * as dispatchFunction from "actions";
import MainContainer from "containers/MainContainer";
import Login from "components/Login";
import SignUpCopy from "components/SignUpCopy";
import Mypage from "components/MyPage";
import ChangeMenuContainer from "containers/ChangeMenuContainer";
import ViewContainer from "containers/ViewContainer";
import ChangeSeatsContainer from "containers/ChangeSeatsContainer";
import ErrorPage from "components/ErrorPage";

export default function Routes() {
  const [user, dispatch] = useReducer(userReducer, initialState);

  const checkUser = async search => {
    if (!search) {
      return dispatch(dispatchFunction.checkUserOuth("unauthorized"));
    }
    const res = await axios.get(
      `http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/view/${search.substring(
        1
      )}`
    );
    return await dispatch(dispatchFunction.checkUserOuth(res.data.error));
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => <MainContainer {...props} />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUpCopy} />
        <Route
          exact
          path="/mypage"
          render={props => (
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
            <ChangeSeatsContainer
              {...props}
              checkUser={checkUser}
              user={user}
            />
          )}
        />
        <Route
          exact
          path="/change/menu"
          render={props => (
            <ChangeMenuContainer {...props} checkUser={checkUser} user={user} />
          )}
        />
        <Route
          exact
          path="/error"
          render={props => (
            <ErrorPage {...props} checkUser={checkUser} user={user} />
          )}
        />
        <Route render={props => <ErrorPage {...props} errorstatus="404" />} />
      </Switch>
    </Router>
  );
}
