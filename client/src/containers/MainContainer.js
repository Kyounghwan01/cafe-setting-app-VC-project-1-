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
  const [orderList, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [admin, checkAdmin] = useState(false);

  useEffect(() => {
    //header.js에 들어가는 header element 구성
    const fetchData = async () => {
      if (props.location.search) {
        try {
          const res = await axios.get(
            `/api/${props.location.search.substring(1)}`
          );
          if (res.data.admin) {
            checkAdmin(true);
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
        //토큰 없는 사람
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
        //토큰 있는 사람
        const res = await axios.get(
          `/api/view/${props.location.search.substring(1)}`
        );
        //header에 Authorization키로 value : Bearer {TOKEN}
        if (res.data.error) {
          //토큰은 있는데 잘못된 토큰일 경우
          return setError(res.data.error);
        }
        setOrder(res.data.cafeData.order);
        setUserId(res.data.userData[0]._id);
        setArr(res.data.cafeData.arrangemenet);
        //남은 테이블 수 계산
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
              checkAdmin={admin}
              orderList={orderList}
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
