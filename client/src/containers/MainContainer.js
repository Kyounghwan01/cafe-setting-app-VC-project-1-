import React, { useEffect, useReducer, useState } from 'react';
import { Redirect } from 'react-router-dom';
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
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

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
      if (!props.location.search) {
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
      } else {
        const res = await axios.get(
          `/api/view/${props.location.search.substring(1)}`
        );
        //header에 Authorization키로 value : Bearer {TOKEN}
        if (res.data.error) {
          return setError(res.data.error);
        }
        setUserId(res.data.userData[0]._id);
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
      {error ? (
        <Redirect to={{
          pathname : "/error",
          state : 'unauthorized'
        }} />
      ) : (
        <>
          {arrangement ? (
            <Main
              headerElement={user.headerElement}
              tocken={props.location.search}
              seats={arrangement}
              leftSeat={leftSeat}
              userId={userId}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default withRouter(MainContainer);
