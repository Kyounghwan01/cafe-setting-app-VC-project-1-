import React, { useEffect, useReducer, useState } from 'react';
import Main from '../components/Main';
import { withRouter } from 'react-router-dom';
import { userReducer, initialState } from '../reducers';
import * as dispatchFunction from '../actions';
import axios from 'axios';
import * as constants from '../constants/state';

const MainContainer = props => {
  const [user, dispatch] = useReducer(userReducer, initialState);
  const [arrangement, setArr] = useState(null);
  const [leftSeat, setCount] = useState(0);

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

    const fetchArr = async () => {
      const res = await axios.get('/api/view');
      if (res.data.cafeData) {
        setArr(res.data.cafeData.arrangemenet);
        let count = 0;
        for (let i = 0; i < res.data.cafeData.arrangemenet.length; i++) {
          if (
            res.data.cafeData.arrangemenet[i] &&
            res.data.cafeData.arrangemenet[i].type === constants.TYPE_TABLE
          ) {
            count++;
          }
        }
        setCount(count);
      }
    };
    fetchArr();
    fetchData();
    return () => {
      fetchArr();
      fetchData();
    };
  }, [props.location]);

  return (
    <>
      {arrangement ? (
        <Main
          headerElement={user.headerElement}
          tocken={props.location.search}
          seats={arrangement}
          leftSeat={leftSeat}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default withRouter(MainContainer);
