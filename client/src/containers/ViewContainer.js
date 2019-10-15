import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
// import { userReducer, initialState } from '../reducers';
// import * as dispatchFunction from '../actions';
import View from '../components/View';
// import axios from 'axios';

const ViewContainer = props => {

  useEffect(() => {
    props.checkUser(props.location.search);
  }, [props]);

  return (
    <>
      {props.user.checkUser ?(
        <Redirect to="/" />
      ) : (
        <View
          headerElement={['MAIN', 'LOG-OUT', 'ABOUT']}
          tocken={props.location.search}
        />
      )}
    </>
  );
};
export default withRouter(ViewContainer);
