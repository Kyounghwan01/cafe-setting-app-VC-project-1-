import React, { useEffect, useReducer } from 'react';
import Main from '../components/Main';
import { withRouter } from 'react-router-dom';
import { userReducer, initialState } from '../reducers';
import * as dispatchFunction from '../actions';
import axios from 'axios';

const MainContainer = (props) => {
  const [user, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      if (props.location.search) {
        try {
          const res = await axios.get(
            `/api/${props.location.search.substring(1)}`
          );
          if (res.data.admin) {
            return await dispatch(
              dispatchFunction.setHeaderElement([
                'CHANGE-SEATS',
                'CHANGE-MENU',
                'ADMIN',
                'LOG-OUT'
              ])
            );
          }
          return await dispatch(
            dispatchFunction.setHeaderElement([
              'ORDER',
              res.data.email,
              'LOG-OUT',
              'ABOUT'
            ])
          );
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, []);

  return(
    <Main
      headerElement={user.headerElement}
      tocken={props.location.search}
    />
  )
}



export default withRouter(MainContainer);