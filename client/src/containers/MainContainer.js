import React, { useEffect, useReducer, useState } from 'react';
import Main from '../components/Main';
import { withRouter } from 'react-router-dom';
import { userReducer, initialState } from '../reducers';
import * as dispatchFunction from '../actions';
import axios from 'axios';

const MainContainer = props => {
  const [user, dispatch] = useReducer(userReducer, initialState);
  const [arrangement, setArr] = useState(null);
  const [leftSeat, setCount] = useState(null);

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
        setArr(res.data.cafeData[0].arrangemenet);
        let count = 0;
        for (let i = 0; i < res.data.cafeData[0].arrangemenet.length; i++) {
          if (
            res.data.cafeData[0].arrangemenet[i] &&
            res.data.cafeData[0].arrangemenet[i].order === 1
          ) {
            count++;
          }
        }
        setCount(count);
      }
    };
    fetchArr();
    fetchData();
    return(()=>{
      fetchArr();
      fetchData();
    })
  }, [props.location.search]);

  return (
    <>
      {arrangement && leftSeat? (
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
